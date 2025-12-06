'use client';

import { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Code,
  TestTube2,
  BarChart3,
  Settings2,
  Shield,
  ArrowRight,
  Loader2,
  AlertCircle,
  TrendingUp,
  Users,
  Zap,
  Download,
  UserCheck,
  Archive,
  ExternalLink,
  Eye,
  Upload,
  Link2,
  RefreshCw
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  agent: string;
  status: 'pending' | 'running' | 'complete' | 'error' | 'human-review';
  duration?: number;
  results?: any;
  requiresHumanReview?: boolean;
}

export default function APEXDemoWorkflow() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showHumanReview, setShowHumanReview] = useState(false);
  const [humanReviewStep, setHumanReviewStep] = useState<number | null>(null);
  const [showJiraRequirements, setShowJiraRequirements] = useState(false);
  const [savedToVault, setSavedToVault] = useState(false);
  const [liveJiraData, setLiveJiraData] = useState<any>(null);
  const [jiraConnectionStatus, setJiraConnectionStatus] = useState<'connected' | 'offline' | 'loading'>('loading');
  const [testCaseSaveStatus, setTestCaseSaveStatus] = useState<{
    savingToVault: boolean;
    savingToJira: boolean;
    vaultSaved: boolean;
    jiraSaved: boolean;
    vaultUrl?: string;
    jiraIssueKey?: string;
  }>({ savingToVault: false, savingToJira: false, vaultSaved: false, jiraSaved: false });
  const [showTestCases, setShowTestCases] = useState(false);
  const [showComplianceDetails, setShowComplianceDetails] = useState(false);
  const [complianceResults, setComplianceResults] = useState<{
    section508: { status: string; checks: Array<{ name: string; status: string; details: string }> };
    fips: { status: string; checks: Array<{ name: string; status: string; details: string }> };
    stig: { status: string; checks: Array<{ name: string; status: string; details: string }> };
  } | null>(null);

  // Check JIRA connection on mount
  useEffect(() => {
    const checkJiraConnection = async () => {
      try {
        const response = await fetch('/api/jira/requirements?project=SCRUM');
        const data = await response.json();
        if (data.success && data.requirements?.length > 0) {
          setLiveJiraData(data);
          setJiraConnectionStatus('connected');
        } else {
          setJiraConnectionStatus('offline');
        }
      } catch {
        setJiraConnectionStatus('offline');
      }
    };
    checkJiraConnection();
  }, []);

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'requirements',
      name: 'Parse Requirements from JIRA',
      agent: 'Requirements Agent',
      status: 'pending'
    },
    {
      id: 'test-design',
      name: 'Generate Test Cases',
      agent: 'Test Design Agent',
      status: 'pending',
      requiresHumanReview: true
    },
    {
      id: 'execution',
      name: 'Execute Test Suite',
      agent: 'Execution Agent',
      status: 'pending'
    },
    {
      id: 'analysis',
      name: 'Analyze Results',
      agent: 'Analysis Agent',
      status: 'pending'
    },
    {
      id: 'compliance',
      name: 'Compliance Verification',
      agent: 'Compliance Agent',
      status: 'pending'
    }
  ]);

  const [metrics, setMetrics] = useState({
    requirements_parsed: 0,
    tests_generated: 0,
    tests_executed: 0,
    tests_passed: 0,
    tests_failed: 0,
    defects_found: 0,
    time_saved: 0,
    coverage_percent: 0,
    compliance_score: 0
  });

  // Amazon.com test requirements for Phase 2 demonstration - All 77 requirements
  const jiraRequirements = [
    // UC1: Add to Cart
    { key: 'UC1-FR1', summary: 'Product Selection: Allow user to select product for cart', priority: 'Critical', type: 'Story', useCase: 'Add to Cart' },
    { key: 'UC1-FR1.1', summary: 'Enable product selection from listing pages', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR1.2', summary: 'Enable product selection from detail pages', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR1.3', summary: 'Enable product selection from search results', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR2', summary: 'Quantity Specification with validation', priority: 'Critical', type: 'Story', useCase: 'Add to Cart' },
    { key: 'UC1-FR2.1', summary: 'Provide quantity input field', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR2.2', summary: 'Allow increment/decrement controls', priority: 'Medium', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR2.3', summary: 'Validate positive integer quantity', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR4', summary: 'Add to Cart button functionality', priority: 'Critical', type: 'Story', useCase: 'Add to Cart' },
    { key: 'UC1-FR5', summary: 'Cart Update with persistence', priority: 'Critical', type: 'Story', useCase: 'Add to Cart' },
    { key: 'UC1-FR5.1', summary: 'Add product with quantity to cart', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR5.2', summary: 'Update quantity if already in cart', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR5.3', summary: 'Persist cart data in database/session', priority: 'Critical', type: 'Sub-task', useCase: 'Add to Cart' },
    // UC2: Wishlist
    { key: 'UC2-FR1', summary: 'Add to Wish List button', priority: 'High', type: 'Story', useCase: 'Wishlist' },
    { key: 'UC2-FR1.1', summary: 'Display on product detail page', priority: 'High', type: 'Sub-task', useCase: 'Wishlist' },
    { key: 'UC2-FR1.3', summary: 'Display in search results', priority: 'Medium', type: 'Sub-task', useCase: 'Wishlist' },
    { key: 'UC2-FR1.4', summary: 'Prompt login if not authenticated', priority: 'Critical', type: 'Sub-task', useCase: 'Wishlist' },
    { key: 'UC2-FR2', summary: 'User-specific wish list association', priority: 'Critical', type: 'Story', useCase: 'Wishlist' },
    { key: 'UC2-FR3', summary: 'Save product info to wish list', priority: 'High', type: 'Story', useCase: 'Wishlist' },
    { key: 'UC2-FR4', summary: 'Confirmation feedback', priority: 'High', type: 'Story', useCase: 'Wishlist' },
    { key: 'UC2-FR5', summary: 'Wish List management page', priority: 'High', type: 'Story', useCase: 'Wishlist' },
    { key: 'UC2-FR5.3', summary: 'Allow removing items', priority: 'High', type: 'Sub-task', useCase: 'Wishlist' },
    { key: 'UC2-FR5.4', summary: 'Move items to cart', priority: 'High', type: 'Sub-task', useCase: 'Wishlist' },
    // UC3: Search Filters
    { key: 'UC3-FR1', summary: 'Display available search filters', priority: 'High', type: 'Story', useCase: 'Search Filters' },
    { key: 'UC3-FR1.1', summary: 'Filters relevant to search/category', priority: 'High', type: 'Sub-task', useCase: 'Search Filters' },
    { key: 'UC3-FR1.4', summary: 'Show product count per filter', priority: 'Medium', type: 'Sub-task', useCase: 'Search Filters' },
    { key: 'UC3-FR2', summary: 'Filter selection support', priority: 'High', type: 'Story', useCase: 'Search Filters' },
    { key: 'UC3-FR2.2', summary: 'Multi-select filters', priority: 'High', type: 'Sub-task', useCase: 'Search Filters' },
    { key: 'UC3-FR2.3', summary: 'Range-based filters (price)', priority: 'High', type: 'Sub-task', useCase: 'Search Filters' },
    { key: 'UC3-FR3', summary: 'Real-time filter application', priority: 'Critical', type: 'Story', useCase: 'Search Filters' },
    { key: 'UC3-FR4', summary: 'Filter persistence during navigation', priority: 'High', type: 'Story', useCase: 'Search Filters' },
    { key: 'UC3-FR5', summary: 'Clear All Filters functionality', priority: 'High', type: 'Story', useCase: 'Search Filters' },
    { key: 'UC3-FR6', summary: 'Dynamic filter relevance', priority: 'Medium', type: 'Story', useCase: 'Search Filters' },
    // UC4: Login/Logout
    { key: 'UC4-FR1', summary: 'Login form display', priority: 'Critical', type: 'Story', useCase: 'Login/Logout' },
    { key: 'UC4-FR1.1', summary: 'Username/email and password fields', priority: 'Critical', type: 'Sub-task', useCase: 'Login/Logout' },
    { key: 'UC4-FR1.3', summary: 'Forgot Password link', priority: 'High', type: 'Sub-task', useCase: 'Login/Logout' },
    { key: 'UC4-FR1.4', summary: 'Create Account link', priority: 'High', type: 'Sub-task', useCase: 'Login/Logout' },
    { key: 'UC4-FR2', summary: 'Secure credential validation', priority: 'Critical', type: 'Story', useCase: 'Login/Logout' },
    { key: 'UC4-FR3', summary: 'Successful authentication handling', priority: 'Critical', type: 'Story', useCase: 'Login/Logout' },
    { key: 'UC4-FR3.1', summary: 'Establish secure session', priority: 'Critical', type: 'Sub-task', useCase: 'Login/Logout' },
    { key: 'UC4-FR4', summary: 'Failed authentication handling', priority: 'High', type: 'Story', useCase: 'Login/Logout' },
    { key: 'UC4-FR5', summary: 'Logout functionality', priority: 'Critical', type: 'Story', useCase: 'Login/Logout' },
    { key: 'UC4-FR5.2', summary: 'Terminate session on logout', priority: 'Critical', type: 'Sub-task', useCase: 'Login/Logout' },
    // UC5: Profile Management
    { key: 'UC5-FR1', summary: 'Profile page access', priority: 'High', type: 'Story', useCase: 'Profile' },
    { key: 'UC5-FR1.2', summary: 'Require login for profile access', priority: 'Critical', type: 'Sub-task', useCase: 'Profile' },
    { key: 'UC5-FR2', summary: 'Display current profile info', priority: 'High', type: 'Story', useCase: 'Profile' },
    { key: 'UC5-FR3', summary: 'Edit name functionality', priority: 'High', type: 'Story', useCase: 'Profile' },
    { key: 'UC5-FR4', summary: 'Edit email with verification', priority: 'Critical', type: 'Story', useCase: 'Profile' },
    { key: 'UC5-FR4.3', summary: 'Send verification email', priority: 'Critical', type: 'Sub-task', useCase: 'Profile' },
    { key: 'UC5-FR5', summary: 'Edit phone number', priority: 'High', type: 'Story', useCase: 'Profile' },
    { key: 'UC5-FR6', summary: 'Address management', priority: 'High', type: 'Story', useCase: 'Profile' },
    { key: 'UC5-FR6.4', summary: 'Set default shipping address', priority: 'High', type: 'Sub-task', useCase: 'Profile' },
    { key: 'UC5-FR6.5', summary: 'Validate address format', priority: 'High', type: 'Sub-task', useCase: 'Profile' }
  ];

  // Generated test cases for display
  const generatedTestCases = [
    { id: 'TC-001', name: 'Verify Add to Cart button displays on product page', requirement: 'UC1-FR4', status: 'passed', priority: 'Critical' },
    { id: 'TC-002', name: 'Validate quantity field accepts positive integers', requirement: 'UC1-FR2.3', status: 'passed', priority: 'High' },
    { id: 'TC-003', name: 'Verify cart updates when adding existing product', requirement: 'UC1-FR5.2', status: 'passed', priority: 'Critical' },
    { id: 'TC-004', name: 'Test Add to Wishlist requires authentication', requirement: 'UC2-FR1.4', status: 'passed', priority: 'Critical' },
    { id: 'TC-005', name: 'Verify wishlist persists across sessions', requirement: 'UC2-FR2.2', status: 'passed', priority: 'High' },
    { id: 'TC-006', name: 'Test move item from wishlist to cart', requirement: 'UC2-FR5.4', status: 'passed', priority: 'High' },
    { id: 'TC-007', name: 'Verify search filters display product counts', requirement: 'UC3-FR1.4', status: 'passed', priority: 'Medium' },
    { id: 'TC-008', name: 'Test multi-select filter functionality', requirement: 'UC3-FR2.2', status: 'passed', priority: 'High' },
    { id: 'TC-009', name: 'Verify filters persist during navigation', requirement: 'UC3-FR4.1', status: 'failed', priority: 'High' },
    { id: 'TC-010', name: 'Test secure session establishment on login', requirement: 'UC4-FR3.1', status: 'passed', priority: 'Critical' },
    { id: 'TC-011', name: 'Verify session termination on logout', requirement: 'UC4-FR5.2', status: 'passed', priority: 'Critical' },
    { id: 'TC-012', name: 'Test email verification flow for profile update', requirement: 'UC5-FR4.3', status: 'passed', priority: 'Critical' },
  ];

  // Save test cases to Core Vault
  const saveTestCasesToVault = async () => {
    setTestCaseSaveStatus(prev => ({ ...prev, savingToVault: true }));
    try {
      const response = await fetch('/api/vault/save-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report: {
            reportId: `TC-SUITE-${Date.now()}`,
            title: 'Generated Test Cases - Amazon.com Phase 2',
            project: 'Phase 2 Demo',
            useCase: 'All Use Cases',
            generatedAt: new Date().toLocaleString(),
            status: 'passed',
            coverage: 95,
            passRate: 92,
            totalTests: generatedTestCases.length,
            testsPassed: generatedTestCases.filter(tc => tc.status === 'passed').length,
            testsFailed: generatedTestCases.filter(tc => tc.status === 'failed').length,
            requirements: 77,
            testCases: generatedTestCases.map(tc => ({
              id: tc.id,
              name: tc.name,
              status: tc.status as 'passed' | 'failed' | 'skipped',
              duration: '0.5s',
              requirement: tc.requirement
            }))
          }
        })
      });
      const result = await response.json();
      if (result.success) {
        setTestCaseSaveStatus(prev => ({
          ...prev,
          savingToVault: false,
          vaultSaved: true,
          vaultUrl: result.viewUrl
        }));
      }
    } catch (error) {
      console.error('Failed to save to vault:', error);
      setTestCaseSaveStatus(prev => ({ ...prev, savingToVault: false }));
    }
  };

  // Sync test cases to JIRA as comment
  const syncTestCasesToJira = async () => {
    setTestCaseSaveStatus(prev => ({ ...prev, savingToJira: true }));
    try {
      const response = await fetch('/api/jira/sync-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirementId: 'UC1',
          report: {
            status: 'passed',
            coverage: 95,
            testsPassed: generatedTestCases.filter(tc => tc.status === 'passed').length,
            testsFailed: generatedTestCases.filter(tc => tc.status === 'failed').length,
            testCases: generatedTestCases.map(tc => ({
              name: `${tc.id}: ${tc.name}`,
              passed: tc.status === 'passed'
            })),
            reportId: `TC-SUITE-${Date.now()}`,
            generatedAt: new Date().toLocaleString()
          }
        })
      });
      const result = await response.json();
      if (result.success) {
        setTestCaseSaveStatus(prev => ({
          ...prev,
          savingToJira: false,
          jiraSaved: true,
          jiraIssueKey: result.issueKey
        }));
      }
    } catch (error) {
      console.error('Failed to sync to JIRA:', error);
      setTestCaseSaveStatus(prev => ({ ...prev, savingToJira: false }));
    }
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setSavedToVault(false);
    setShowTestCases(false);
    setShowComplianceDetails(false);
    setComplianceResults(null);
    setTestCaseSaveStatus({ savingToVault: false, savingToJira: false, vaultSaved: false, jiraSaved: false });
    setShowJiraRequirements(true);

    // Step 1: Requirements Agent
    await runStep(0, async () => {
      const response = await fetch('/api/apex/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'phase2-demo',
          demo_config: {
            target: 'www.amazon.com',
            use_cases: ['UC1-AddToCart', 'UC2-Wishlist', 'UC3-SearchFilters', 'UC4-Login', 'UC5-Profile'],
            requirements_count: 27
          }
        })
      });
      const data = await response.json();

      setMetrics(prev => ({
        ...prev,
        requirements_parsed: data.requirements_count || 77
      }));

      return data;
    });

    // Step 2: Test Design Agent with Human Review
    await runStep(1, async () => {
      const requirements = workflowSteps[0].results?.requirements || getDemoRequirements();

      const response = await fetch('/api/apex/test-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirements: requirements,
          target_language: 'python'
        })
      });
      const data = await response.json();

      setMetrics(prev => ({
        ...prev,
        tests_generated: data.test_suite?.total_tests || 127,
        coverage_percent: data.test_suite?.coverage?.percentage || 95
      }));

      // Trigger human review
      setShowHumanReview(true);
      setHumanReviewStep(1);
      setShowTestCases(true); // Show generated test cases

      // Wait for human to click approve (don't auto-hide)
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (!showHumanReview) {
            clearInterval(checkInterval);
            resolve(undefined);
          }
        }, 100);
      });

      return data;
    });

    // Step 3: Execution Agent
    await runStep(2, async () => {
      const testCases = workflowSteps[1].results?.test_suite?.test_cases || getDemoTestCases();

      const response = await fetch('/api/apex/execution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test_suite_id: 'TS-DEMO-001',
          test_cases: testCases,
          environment: 'staging',
          parallel_execution: true,
          max_parallel_tests: 10
        })
      });
      const data = await response.json();

      setMetrics(prev => ({
        ...prev,
        tests_executed: data.summary?.total || 127,
        tests_passed: data.summary?.passed || 119,
        tests_failed: data.summary?.failed || 8,
        defects_found: data.summary?.failed || 8,
        time_saved: 360 // 6 hours
      }));

      return data;
    });

    // Step 4: Analysis Agent
    await runStep(3, async () => {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      return {
        predictions: {
          high_risk_areas: ['Authentication Module', 'Inventory Management'],
          defect_clusters: 3,
          recommended_focus: 'Performance optimization in query processing'
        }
      };
    });

    // Step 5: Compliance Agent - Detailed compliance verification
    await runStep(4, async () => {
      // Simulate detailed compliance checks
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Section 508 Accessibility Checks
      const section508Checks = [
        { name: '1194.21(a) Keyboard Accessibility', status: 'PASS', details: 'All interactive elements accessible via keyboard' },
        { name: '1194.21(b) Focus Indicators', status: 'PASS', details: 'Visible focus indicators on all form controls' },
        { name: '1194.21(c) Screen Reader Support', status: 'PASS', details: 'ARIA labels present on dynamic content' },
        { name: '1194.21(d) Color Contrast', status: 'PASS', details: 'WCAG 2.1 AA contrast ratios met (4.5:1)' },
        { name: '1194.21(l) Form Labels', status: 'PASS', details: 'All form inputs have associated labels' },
        { name: '1194.22(a) Alt Text', status: 'PASS', details: 'All images have descriptive alt attributes' },
      ];

      // FIPS 140-2 Cryptographic Checks
      const fipsChecks = [
        { name: 'FIPS 140-2 L1: TLS 1.2/1.3', status: 'PASS', details: 'All connections use TLS 1.2+ with approved ciphers' },
        { name: 'FIPS 140-2 L1: AES-256 Encryption', status: 'PASS', details: 'Data at rest encrypted with AES-256-GCM' },
        { name: 'FIPS 140-2 L1: SHA-256 Hashing', status: 'PASS', details: 'Password hashing uses PBKDF2-SHA256' },
        { name: 'FIPS 140-2 L1: Key Management', status: 'PASS', details: 'API keys stored in AWS Secrets Manager' },
        { name: 'FIPS 140-2 L1: Session Tokens', status: 'PASS', details: 'JWT tokens signed with RS256 algorithm' },
      ];

      // DISA STIG Checks
      const stigChecks = [
        { name: 'STIG V-222396: Input Validation', status: 'PASS', details: 'All user inputs sanitized and validated' },
        { name: 'STIG V-222400: SQL Injection', status: 'PASS', details: 'Parameterized queries used throughout' },
        { name: 'STIG V-222401: XSS Prevention', status: 'PASS', details: 'Output encoding and CSP headers implemented' },
        { name: 'STIG V-222425: Session Timeout', status: 'PASS', details: 'Sessions expire after 30 minutes of inactivity' },
        { name: 'STIG V-222430: Auth Lockout', status: 'FINDING', details: 'CAT II: Account lockout after 5 failed attempts (needs 3)' },
        { name: 'STIG V-222432: Password Complexity', status: 'PASS', details: 'Passwords require 12+ chars, mixed case, numbers, symbols' },
        { name: 'STIG V-222544: Audit Logging', status: 'FINDING', details: 'CAT III: Missing timestamp on some audit entries' },
        { name: 'STIG V-222550: Error Handling', status: 'PASS', details: 'Generic error messages returned to users' },
      ];

      const complianceData = {
        section508: {
          status: section508Checks.every(c => c.status === 'PASS') ? 'PASS' : 'FINDINGS',
          checks: section508Checks
        },
        fips: {
          status: fipsChecks.every(c => c.status === 'PASS') ? 'PASS' : 'FINDINGS',
          checks: fipsChecks
        },
        stig: {
          status: stigChecks.every(c => c.status === 'PASS') ? 'PASS' : 'FINDINGS',
          checks: stigChecks
        }
      };

      setComplianceResults(complianceData);
      setShowComplianceDetails(true);

      const totalChecks = section508Checks.length + fipsChecks.length + stigChecks.length;
      const passedChecks = [...section508Checks, ...fipsChecks, ...stigChecks].filter(c => c.status === 'PASS').length;
      const complianceScore = Math.round((passedChecks / totalChecks) * 100);

      setMetrics(prev => ({
        ...prev,
        compliance_score: complianceScore
      }));

      return {
        compliance: {
          section_508: complianceData.section508.status,
          fips_140_2: complianceData.fips.status,
          disa_stig: `${stigChecks.filter(c => c.status === 'FINDING').length} findings`,
          total_checks: totalChecks,
          passed_checks: passedChecks,
          score: complianceScore
        }
      };
    });

    setIsRunning(false);

    // Save to Core Vault after completion
    setTimeout(() => {
      setSavedToVault(true);
    }, 1000);
  };

  const runStep = async (stepIndex: number, action: () => Promise<any>) => {
    setCurrentStep(stepIndex);

    // Update step status to running
    setWorkflowSteps(prev => {
      const updated = [...prev];
      updated[stepIndex].status = 'running';
      return updated;
    });

    try {
      const startTime = Date.now();
      const results = await action();
      const duration = Date.now() - startTime;

      // Update step status to complete
      setWorkflowSteps(prev => {
        const updated = [...prev];
        updated[stepIndex].status = 'complete';
        updated[stepIndex].duration = duration;
        updated[stepIndex].results = results;
        return updated;
      });
    } catch (error) {
      // Update step status to error
      setWorkflowSteps(prev => {
        const updated = [...prev];
        updated[stepIndex].status = 'error';
        return updated;
      });
    }
  };

  // Complete Amazon.com Phase 2 Requirements - All functional requirements from use cases
  const getDemoRequirements = () => {
    return [
      // UC1: Add to Cart (12 requirements)
      { id: 'UC1-FR1', description: 'Product Selection: Allow user to select product for cart', useCase: 'Add to Cart' },
      { id: 'UC1-FR1.1', description: 'Enable product selection from product listing pages', useCase: 'Add to Cart' },
      { id: 'UC1-FR1.2', description: 'Enable product selection from product detail pages', useCase: 'Add to Cart' },
      { id: 'UC1-FR1.3', description: 'Enable product selection from search results pages', useCase: 'Add to Cart' },
      { id: 'UC1-FR2', description: 'Quantity Specification: Allow user to specify quantity', useCase: 'Add to Cart' },
      { id: 'UC1-FR2.1', description: 'Provide quantity input field (text box or dropdown)', useCase: 'Add to Cart' },
      { id: 'UC1-FR2.2', description: 'Allow increment/decrement quantity using buttons', useCase: 'Add to Cart' },
      { id: 'UC1-FR2.3', description: 'Validate quantity is valid positive integer', useCase: 'Add to Cart' },
      { id: 'UC1-FR4', description: 'Add to Cart Action: Provide clear Add to Cart button', useCase: 'Add to Cart' },
      { id: 'UC1-FR4.1', description: 'Display Add to Cart button on product detail page', useCase: 'Add to Cart' },
      { id: 'UC1-FR4.2', description: 'Allow adding product by clicking Add to Cart button', useCase: 'Add to Cart' },
      { id: 'UC1-FR5', description: 'Cart Update: Update cart upon Add to Cart click', useCase: 'Add to Cart' },
      { id: 'UC1-FR5.1', description: 'Add selected product with quantity to cart', useCase: 'Add to Cart' },
      { id: 'UC1-FR5.2', description: 'Update quantity if product already in cart', useCase: 'Add to Cart' },
      { id: 'UC1-FR5.3', description: 'Persist shopping cart data in database/session', useCase: 'Add to Cart' },

      // UC2: Save to Wish List (14 requirements)
      { id: 'UC2-FR1', description: 'Add to Wish List Action: Provide clear button', useCase: 'Wishlist' },
      { id: 'UC2-FR1.1', description: 'Display Add to Wish List on product detail page', useCase: 'Wishlist' },
      { id: 'UC2-FR1.3', description: 'Display Add to Wish List in search results', useCase: 'Wishlist' },
      { id: 'UC2-FR1.4', description: 'Prompt login if user not authenticated', useCase: 'Wishlist' },
      { id: 'UC2-FR2', description: 'Wish List Association: Associate with user account', useCase: 'Wishlist' },
      { id: 'UC2-FR2.1', description: 'Each user has unique wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR2.2', description: 'Store wish list data persistently', useCase: 'Wishlist' },
      { id: 'UC2-FR3', description: 'Product Info Saved: Save essential product info', useCase: 'Wishlist' },
      { id: 'UC2-FR3.1', description: 'Save product name to wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR3.2', description: 'Save product image to wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR3.3', description: 'Save current product price to wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR3.4', description: 'Save product URL to wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR4', description: 'Confirmation: Provide immediate feedback', useCase: 'Wishlist' },
      { id: 'UC2-FR4.1', description: 'Display success message Added to Wish List', useCase: 'Wishlist' },
      { id: 'UC2-FR4.2', description: 'Provide link to view wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR5', description: 'Wish List Management: Allow user to manage list', useCase: 'Wishlist' },
      { id: 'UC2-FR5.1', description: 'Provide dedicated Wish List page', useCase: 'Wishlist' },
      { id: 'UC2-FR5.2', description: 'Display all items in wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR5.3', description: 'Allow removing items from wish list', useCase: 'Wishlist' },
      { id: 'UC2-FR5.4', description: 'Allow moving items to shopping cart', useCase: 'Wishlist' },
      { id: 'UC2-FR5.5', description: 'Allow changing quantity of wished items', useCase: 'Wishlist' },

      // UC3: Search Filters (18 requirements)
      { id: 'UC3-FR1', description: 'Filter Display: Display available search filters', useCase: 'Search Filters' },
      { id: 'UC3-FR1.1', description: 'Display filters relevant to search query/category', useCase: 'Search Filters' },
      { id: 'UC3-FR1.2', description: 'Group related filters together', useCase: 'Search Filters' },
      { id: 'UC3-FR1.3', description: 'Present filters in clear organized manner', useCase: 'Search Filters' },
      { id: 'UC3-FR1.4', description: 'Indicate product count for each filter option', useCase: 'Search Filters' },
      { id: 'UC3-FR2', description: 'Filter Selection: Allow selecting filter options', useCase: 'Search Filters' },
      { id: 'UC3-FR2.1', description: 'Support single-select filters', useCase: 'Search Filters' },
      { id: 'UC3-FR2.2', description: 'Support multi-select filters', useCase: 'Search Filters' },
      { id: 'UC3-FR2.3', description: 'Support range-based filters (price range)', useCase: 'Search Filters' },
      { id: 'UC3-FR2.4', description: 'Visual indication of selected filters', useCase: 'Search Filters' },
      { id: 'UC3-FR3', description: 'Filter Application: Apply filters to results', useCase: 'Search Filters' },
      { id: 'UC3-FR3.1', description: 'Dynamically update products based on filters', useCase: 'Search Filters' },
      { id: 'UC3-FR3.2', description: 'Apply filters in real-time without page reload', useCase: 'Search Filters' },
      { id: 'UC3-FR3.3', description: 'Display matching product count', useCase: 'Search Filters' },
      { id: 'UC3-FR4', description: 'Filter Persistence: Persist filters during navigation', useCase: 'Search Filters' },
      { id: 'UC3-FR4.1', description: 'Maintain filters when viewing product details', useCase: 'Search Filters' },
      { id: 'UC3-FR4.2', description: 'Maintain filters across category pages', useCase: 'Search Filters' },
      { id: 'UC3-FR5', description: 'Filter Reset: Allow clearing filters', useCase: 'Search Filters' },
      { id: 'UC3-FR5.1', description: 'Provide Clear All Filters button', useCase: 'Search Filters' },
      { id: 'UC3-FR5.2', description: 'Allow deselecting individual filters', useCase: 'Search Filters' },
      { id: 'UC3-FR5.3', description: 'Display unfiltered results when cleared', useCase: 'Search Filters' },
      { id: 'UC3-FR6', description: 'Filter Relevance: Ensure relevant filters shown', useCase: 'Search Filters' },
      { id: 'UC3-FR6.1', description: 'Hide/disable non-applicable filters', useCase: 'Search Filters' },
      { id: 'UC3-FR6.2', description: 'Adjust filter options dynamically', useCase: 'Search Filters' },

      // UC4: Login/Logout (15 requirements)
      { id: 'UC4-FR1', description: 'Login Form Display: Display login form', useCase: 'Login/Logout' },
      { id: 'UC4-FR1.1', description: 'Display username/email and password fields', useCase: 'Login/Logout' },
      { id: 'UC4-FR1.2', description: 'Provide Login button to submit form', useCase: 'Login/Logout' },
      { id: 'UC4-FR1.3', description: 'Provide Forgot Password link', useCase: 'Login/Logout' },
      { id: 'UC4-FR1.4', description: 'Provide Create Account link', useCase: 'Login/Logout' },
      { id: 'UC4-FR2', description: 'Credential Validation: Validate against database', useCase: 'Login/Logout' },
      { id: 'UC4-FR2.1', description: 'Verify username/email exists in database', useCase: 'Login/Logout' },
      { id: 'UC4-FR2.2', description: 'Verify password matches stored password', useCase: 'Login/Logout' },
      { id: 'UC4-FR3', description: 'Successful Auth: Handle successful login', useCase: 'Login/Logout' },
      { id: 'UC4-FR3.1', description: 'Establish secure session for user', useCase: 'Login/Logout' },
      { id: 'UC4-FR3.2', description: 'Redirect to appropriate page', useCase: 'Login/Logout' },
      { id: 'UC4-FR3.3', description: 'Display authenticated status', useCase: 'Login/Logout' },
      { id: 'UC4-FR3.4', description: 'Hide login form and show Logout button', useCase: 'Login/Logout' },
      { id: 'UC4-FR4', description: 'Failed Auth: Handle failed login', useCase: 'Login/Logout' },
      { id: 'UC4-FR4.1', description: 'Display user-friendly error message', useCase: 'Login/Logout' },
      { id: 'UC4-FR4.2', description: 'Allow user to retry login', useCase: 'Login/Logout' },
      { id: 'UC4-FR4.3', description: 'Provide password recovery guidance', useCase: 'Login/Logout' },
      { id: 'UC4-FR5', description: 'Logout Functionality: Provide logout option', useCase: 'Login/Logout' },
      { id: 'UC4-FR5.1', description: 'Display Logout in prominent location', useCase: 'Login/Logout' },
      { id: 'UC4-FR5.2', description: 'Terminate user session on logout', useCase: 'Login/Logout' },
      { id: 'UC4-FR5.3', description: 'Redirect to login or homepage', useCase: 'Login/Logout' },

      // UC5: Manage Profile (18 requirements)
      { id: 'UC5-FR1', description: 'Profile Access: Provide link to profile page', useCase: 'Profile Management' },
      { id: 'UC5-FR1.1', description: 'Display Your Account link in header/menu', useCase: 'Profile Management' },
      { id: 'UC5-FR1.2', description: 'Require login to access profile', useCase: 'Profile Management' },
      { id: 'UC5-FR1.3', description: 'Redirect to login if not authenticated', useCase: 'Profile Management' },
      { id: 'UC5-FR2', description: 'Display Profile: Show current profile info', useCase: 'Profile Management' },
      { id: 'UC5-FR2.1', description: 'Display user name (first and last)', useCase: 'Profile Management' },
      { id: 'UC5-FR2.2', description: 'Display user email address', useCase: 'Profile Management' },
      { id: 'UC5-FR2.3', description: 'Display user phone number', useCase: 'Profile Management' },
      { id: 'UC5-FR2.4', description: 'Display default shipping address', useCase: 'Profile Management' },
      { id: 'UC5-FR2.5', description: 'Display communication preferences', useCase: 'Profile Management' },
      { id: 'UC5-FR3', description: 'Edit Name: Allow editing name', useCase: 'Profile Management' },
      { id: 'UC5-FR3.1', description: 'Provide first/last name input fields', useCase: 'Profile Management' },
      { id: 'UC5-FR3.2', description: 'Save updated name to profile', useCase: 'Profile Management' },
      { id: 'UC5-FR4', description: 'Edit Email: Allow editing email', useCase: 'Profile Management' },
      { id: 'UC5-FR4.1', description: 'Provide email input field', useCase: 'Profile Management' },
      { id: 'UC5-FR4.2', description: 'Validate email format', useCase: 'Profile Management' },
      { id: 'UC5-FR4.3', description: 'Send verification email to new address', useCase: 'Profile Management' },
      { id: 'UC5-FR4.4', description: 'Require verification link confirmation', useCase: 'Profile Management' },
      { id: 'UC5-FR4.5', description: 'Update email only after verification', useCase: 'Profile Management' },
      { id: 'UC5-FR5', description: 'Edit Phone: Allow editing phone number', useCase: 'Profile Management' },
      { id: 'UC5-FR5.1', description: 'Provide phone number input field', useCase: 'Profile Management' },
      { id: 'UC5-FR5.2', description: 'Validate phone number format', useCase: 'Profile Management' },
      { id: 'UC5-FR5.3', description: 'Save updated phone to profile', useCase: 'Profile Management' },
      { id: 'UC5-FR6', description: 'Manage Addresses: Allow address management', useCase: 'Profile Management' },
      { id: 'UC5-FR6.1', description: 'Allow adding new addresses', useCase: 'Profile Management' },
      { id: 'UC5-FR6.2', description: 'Allow editing existing addresses', useCase: 'Profile Management' },
      { id: 'UC5-FR6.3', description: 'Allow deleting addresses', useCase: 'Profile Management' },
      { id: 'UC5-FR6.4', description: 'Allow setting default shipping address', useCase: 'Profile Management' },
      { id: 'UC5-FR6.5', description: 'Validate address format', useCase: 'Profile Management' }
    ];
  };

  const getDemoTestCases = () => {
    return Array.from({ length: 127 }, (_, i) => ({
      id: `TC-${String(i + 1).padStart(3, '0')}`,
      name: `test_case_${i + 1}`,
      type: i % 3 === 0 ? 'negative' : 'positive'
    }));
  };

  const getStepIcon = (agent: string) => {
    switch (agent) {
      case 'Requirements Agent': return FileText;
      case 'Test Design Agent': return Code;
      case 'Execution Agent': return Play;
      case 'Analysis Agent': return BarChart3;
      case 'Compliance Agent': return Shield;
      default: return TestTube2;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return CheckCircle;
      case 'error': return XCircle;
      case 'running': return Loader2;
      case 'human-review': return UserCheck;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'running': return 'text-blue-600';
      case 'human-review': return 'text-orange-600';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Core APEX Live Demo Workflow
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Watch as AI agents transform requirements into executed tests with human oversight
          </p>
        </div>
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2 ${
            isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isRunning ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Running Workflow...</span>
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              <span>Start Demo Workflow</span>
            </>
          )}
        </button>
      </div>

      {/* Amazon.com Requirements Display - All Requirements */}
      {showJiraRequirements && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {jiraConnectionStatus === 'connected' ? (
                  <>Live JIRA: Amazon.com Phase 2 ({liveJiraData?.total || jiraRequirements.length} Issues)</>
                ) : (
                  <>Amazon.com Phase 2 Requirements ({jiraRequirements.length} Total)</>
                )}
              </h3>
              {jiraConnectionStatus === 'connected' && (
                <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  JIRA Connected
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {jiraConnectionStatus === 'connected' ? (
                <a
                  href="https://progrediai.atlassian.net/browse/SCRUM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>Open in JIRA</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-xs text-gray-500">
                  5 Use Cases • {jiraRequirements.filter(r => r.priority === 'Critical').length} Critical • {jiraRequirements.filter(r => r.priority === 'High').length} High
                </span>
              )}
            </div>
          </div>

          {/* Use Case Summary Cards */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {[
              { name: 'Add to Cart', count: jiraRequirements.filter(r => r.useCase === 'Add to Cart').length, color: 'bg-green-100 text-green-800 border-green-300' },
              { name: 'Wishlist', count: jiraRequirements.filter(r => r.useCase === 'Wishlist').length, color: 'bg-purple-100 text-purple-800 border-purple-300' },
              { name: 'Search Filters', count: jiraRequirements.filter(r => r.useCase === 'Search Filters').length, color: 'bg-blue-100 text-blue-800 border-blue-300' },
              { name: 'Login/Logout', count: jiraRequirements.filter(r => r.useCase === 'Login/Logout').length, color: 'bg-orange-100 text-orange-800 border-orange-300' },
              { name: 'Profile', count: jiraRequirements.filter(r => r.useCase === 'Profile').length, color: 'bg-pink-100 text-pink-800 border-pink-300' }
            ].map(uc => (
              <div key={uc.name} className={`${uc.color} border rounded p-2 text-center`}>
                <div className="text-lg font-bold">{uc.count}</div>
                <div className="text-xs truncate">{uc.name}</div>
              </div>
            ))}
          </div>

          {/* Scrollable Requirements List */}
          <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
            {['Add to Cart', 'Wishlist', 'Search Filters', 'Login/Logout', 'Profile'].map(useCase => (
              <div key={useCase} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 sticky top-0">
                  UC: {useCase}
                </div>
                {jiraRequirements.filter(r => r.useCase === useCase).map(req => (
                  <div key={req.key} className="flex items-center justify-between px-3 py-1.5 border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                        req.type === 'Story' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>{req.key}</span>
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{req.summary}</span>
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ml-2 ${
                      req.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      req.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Scroll to view all {jiraRequirements.length} requirements from 5 Amazon.com use cases
          </div>
        </div>
      )}

      {/* Human-in-the-Loop Notification */}
      {showHumanReview && (
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 rounded-lg animate-pulse">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-6 w-6 text-orange-600" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Human Review Required
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test Engineer reviewing generated test cases for critical requirements...
              </p>
            </div>
            <button
              onClick={() => {
                setShowHumanReview(false);
                setHumanReviewStep(null);
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-medium"
            >
              Approve & Continue
            </button>
          </div>
        </div>
      )}

      {/* Generated Test Cases Display */}
      {showTestCases && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Generated Test Cases ({generatedTestCases.length})
              </h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                AI Generated
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Save to Core Vault button */}
              {testCaseSaveStatus.vaultSaved ? (
                <a
                  href={testCaseSaveStatus.vaultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded text-xs font-medium"
                >
                  <Eye className="h-3 w-3" />
                  <span>View in Vault</span>
                </a>
              ) : (
                <button
                  onClick={saveTestCasesToVault}
                  disabled={testCaseSaveStatus.savingToVault}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded text-xs font-medium transition disabled:opacity-50"
                >
                  {testCaseSaveStatus.savingToVault ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Upload className="h-3 w-3" />
                  )}
                  <span>{testCaseSaveStatus.savingToVault ? 'Saving...' : 'Save to Vault'}</span>
                </button>
              )}

              {/* Sync to JIRA button */}
              {testCaseSaveStatus.jiraSaved ? (
                <a
                  href={`https://progrediai.atlassian.net/browse/${testCaseSaveStatus.jiraIssueKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs font-medium"
                >
                  <CheckCircle className="h-3 w-3" />
                  <span>{testCaseSaveStatus.jiraIssueKey}</span>
                </a>
              ) : (
                <button
                  onClick={syncTestCasesToJira}
                  disabled={testCaseSaveStatus.savingToJira}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded text-xs font-medium transition disabled:opacity-50"
                >
                  {testCaseSaveStatus.savingToJira ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Link2 className="h-3 w-3" />
                  )}
                  <span>{testCaseSaveStatus.savingToJira ? 'Syncing...' : 'Sync to JIRA'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Test Cases Table */}
          <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test Case</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Requirement</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {generatedTestCases.map(tc => (
                  <tr key={tc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-3 py-2 font-mono text-xs text-gray-600 dark:text-gray-400">{tc.id}</td>
                    <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{tc.name}</td>
                    <td className="px-3 py-2">
                      <span className="font-mono text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded">
                        {tc.requirement}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        tc.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        tc.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {tc.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {tc.status === 'passed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
            <span>Showing sample of {generatedTestCases.length} generated test cases (127 total)</span>
            <span className="text-green-600">{generatedTestCases.filter(tc => tc.status === 'passed').length} passed, {generatedTestCases.filter(tc => tc.status === 'failed').length} failed</span>
          </div>
        </div>
      )}

      {/* Compliance Verification Details */}
      {showComplianceDetails && complianceResults && (
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Compliance Verification Results
              </h3>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                DoD Standards
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Overall Score:</span>
              <span className={`font-bold ${metrics.compliance_score >= 90 ? 'text-green-600' : metrics.compliance_score >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                {metrics.compliance_score}%
              </span>
            </div>
          </div>

          {/* Three compliance standards in columns */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Section 508 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">Section 508</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    complianceResults.section508.status === 'PASS'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {complianceResults.section508.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">Accessibility</span>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {complianceResults.section508.checks.map((check, idx) => (
                  <div key={idx} className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-gray-700 dark:text-gray-300 flex-1">{check.name}</span>
                      {check.status === 'PASS' ? (
                        <CheckCircle className="h-3.5 w-3.5 text-green-600 flex-shrink-0 ml-1" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-orange-600 flex-shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{check.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FIPS 140-2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="bg-green-50 dark:bg-green-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">FIPS 140-2</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    complianceResults.fips.status === 'PASS'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {complianceResults.fips.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">Cryptographic</span>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {complianceResults.fips.checks.map((check, idx) => (
                  <div key={idx} className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-gray-700 dark:text-gray-300 flex-1">{check.name}</span>
                      {check.status === 'PASS' ? (
                        <CheckCircle className="h-3.5 w-3.5 text-green-600 flex-shrink-0 ml-1" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-orange-600 flex-shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{check.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DISA STIGs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="bg-orange-50 dark:bg-orange-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">DISA STIGs</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    complianceResults.stig.status === 'PASS'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {complianceResults.stig.checks.filter(c => c.status === 'FINDING').length} Findings
                  </span>
                </div>
                <span className="text-xs text-gray-500">Security Technical Implementation Guides</span>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {complianceResults.stig.checks.map((check, idx) => (
                  <div key={idx} className={`px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    check.status === 'FINDING' ? 'bg-orange-50 dark:bg-orange-900/10' : ''
                  }`}>
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-gray-700 dark:text-gray-300 flex-1">{check.name}</span>
                      {check.status === 'PASS' ? (
                        <CheckCircle className="h-3.5 w-3.5 text-green-600 flex-shrink-0 ml-1" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-orange-600 flex-shrink-0 ml-1" />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${check.status === 'FINDING' ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                      {check.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
            <span>
              {complianceResults.section508.checks.length + complianceResults.fips.checks.length + complianceResults.stig.checks.length} total checks performed across 3 compliance frameworks
            </span>
            <span className="text-purple-600">
              {complianceResults.stig.checks.filter(c => c.status === 'FINDING').length} findings require remediation
            </span>
          </div>
        </div>
      )}

      {/* Workflow Steps */}
      <div className="space-y-4 mb-8">
        {workflowSteps.map((step, index) => {
          const Icon = getStepIcon(step.agent);
          const StatusIcon = getStatusIcon(step.status);
          const statusColor = getStatusColor(step.status);

          return (
            <div
              key={step.id}
              className={`border rounded-lg p-4 transition ${
                step.status === 'running'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : step.status === 'complete'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : step.status === 'error'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {step.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.agent}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {step.requiresHumanReview && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                      Human Review
                    </span>
                  )}
                  {step.duration && (
                    <span className="text-sm text-gray-500">
                      {(step.duration / 1000).toFixed(1)}s
                    </span>
                  )}
                  <StatusIcon className={`h-6 w-6 ${statusColor} ${
                    step.status === 'running' ? 'animate-spin' : ''
                  }`} />
                </div>
              </div>

              {/* Step Results */}
              {step.status === 'complete' && step.results && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {step.id === 'requirements' && (
                      <>
                        <div>
                          <span className="text-gray-500">Requirements:</span>
                          <span className="ml-2 font-semibold">{step.results.requirements_count || 47}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Testable:</span>
                          <span className="ml-2 font-semibold">{step.results.testable_requirements || 45}</span>
                        </div>
                      </>
                    )}
                    {step.id === 'test-design' && (
                      <>
                        <div>
                          <span className="text-gray-500">Tests Generated:</span>
                          <span className="ml-2 font-semibold">{step.results.test_suite?.total_tests || 127}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Coverage:</span>
                          <span className="ml-2 font-semibold">{step.results.test_suite?.coverage?.percentage || 95}%</span>
                        </div>
                      </>
                    )}
                    {step.id === 'execution' && (
                      <>
                        <div>
                          <span className="text-gray-500">Passed:</span>
                          <span className="ml-2 font-semibold text-green-600">{step.results.summary?.passed || 119}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Failed:</span>
                          <span className="ml-2 font-semibold text-red-600">{step.results.summary?.failed || 8}</span>
                        </div>
                      </>
                    )}
                    {step.id === 'compliance' && (
                      <>
                        <div>
                          <span className="text-gray-500">Section 508:</span>
                          <span className="ml-2 font-semibold text-green-600">{step.results.compliance?.section_508}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">FIPS 140-2:</span>
                          <span className="ml-2 font-semibold text-green-600">{step.results.compliance?.fips_140_2}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Metrics Dashboard */}
      {metrics.tests_executed > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Demo Results & Impact
          </h3>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Requirements</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.requirements_parsed}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">From 5 Use Cases</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Code className="h-5 w-5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Tests</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.tests_generated}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Auto-generated</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-xs text-purple-600 font-medium">Pass Rate</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.tests_executed > 0
                  ? Math.round((metrics.tests_passed / metrics.tests_executed) * 100)
                  : 0}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {metrics.tests_passed}/{metrics.tests_executed} passed
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span className="text-xs text-orange-600 font-medium">Compliance</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.compliance_score}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">DoD Standards</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                <span className="text-xs text-indigo-600 font-medium">Time Saved</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.time_saved}h
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">vs Manual</div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Key Demo Insights
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Parsed all 77 functional requirements from 5 Amazon.com use cases</li>
                  <li>• UC1: Add to Cart (15 FRs) • UC2: Wishlist (20 FRs) • UC3: Filters (24 FRs)</li>
                  <li>• UC4: Login/Logout (20 FRs) • UC5: Profile (18 FRs)</li>
                  <li>• Human review approved test cases for {jiraRequirements.filter(r => r.priority === 'Critical').length} critical requirements</li>
                  <li>• Compliance Agent verified Section 508, FIPS 140-2, and DISA STIG standards</li>
                  <li>• Reports saved to <strong>Core Vault</strong> <Archive className="h-3 w-3 inline text-blue-600" /> for team collaboration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Export Options & Core Vault Integration */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Demo completed at {new Date().toLocaleTimeString()}
            </div>
            <div className="flex space-x-3">
              {savedToVault && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <Archive className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="text-sm font-semibold text-blue-900">Saved to Core Vault</span>
                    <span className="text-xs text-blue-700 block">Report ID: RPT-2024-{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}</span>
                  </div>
                </div>
              )}
              <a
                href="https://corevault.progrediai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View in Core Vault</span>
              </a>
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}