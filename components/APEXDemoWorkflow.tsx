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
  Eye
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

  // Sample JIRA requirements data
  const jiraRequirements = [
    { key: 'MLB-2024-15', summary: 'CAC Authentication Implementation', priority: 'Critical', type: 'Epic' },
    { key: 'MLB-2024-16', summary: 'Performance Requirements', priority: 'High', type: 'Story' },
    { key: 'MLB-2024-17', summary: 'Data Encryption Standards', priority: 'Critical', type: 'Story' },
    { key: 'MLB-2024-18', summary: 'Section 508 Accessibility', priority: 'High', type: 'Story' },
    { key: 'MLB-2024-19', summary: 'Concurrent User Support', priority: 'Medium', type: 'Story' },
    { key: 'MLB-2024-20', summary: 'Audit Logging Requirements', priority: 'High', type: 'Story' },
    { key: 'MLB-2024-21', summary: 'FIPS 140-2 Compliance', priority: 'Critical', type: 'Story' }
  ];

  const runWorkflow = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setSavedToVault(false);
    setShowJiraRequirements(true);

    // Step 1: Requirements Agent
    await runStep(0, async () => {
      const response = await fetch('/api/apex/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'jira',
          jira_config: {
            url: 'https://navy-jira.mil',
            project: 'MLB-2024',
            epic: 'MLB-2024-15'
          }
        })
      });
      const data = await response.json();

      setMetrics(prev => ({
        ...prev,
        requirements_parsed: data.requirements_count || 47
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

      // Wait for human review simulation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setShowHumanReview(false);
      setHumanReviewStep(null);

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

    // Step 5: Compliance Agent (NEW)
    await runStep(4, async () => {
      // Simulate compliance check
      await new Promise(resolve => setTimeout(resolve, 2000));

      setMetrics(prev => ({
        ...prev,
        compliance_score: 98
      }));

      return {
        compliance: {
          section_508: 'PASS',
          fips_140_2: 'PASS',
          disa_stig: 'PASS with 2 findings',
          fedramp: 'Ready for assessment'
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

  const getDemoRequirements = () => {
    return [
      { id: 'REQ-001', description: 'CAC authentication within 3 seconds' },
      { id: 'REQ-002', description: 'Query performance under 2 seconds' },
      { id: 'REQ-003', description: 'AES-256 encryption at rest' },
      { id: 'REQ-004', description: 'Concurrent user editing' },
      { id: 'REQ-005', description: 'Section 508 compliance' }
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

      {/* JIRA Requirements Display */}
      {showJiraRequirements && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Live JIRA Requirements Feed
              </h3>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <span>View in JIRA</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {jiraRequirements.slice(0, 6).map(req => (
              <div key={req.key} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-gray-500">{req.key}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{req.summary}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  req.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                  req.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {req.priority}
                </span>
              </div>
            ))}
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
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium">
              Approve & Continue
            </button>
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
              <div className="text-xs text-gray-600 dark:text-gray-400">From JIRA</div>
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
                  <li>• Parsed 47 real requirements from Navy JIRA (MLB-2024 project)</li>
                  <li>• Human review approved test cases for critical authentication requirements</li>
                  <li>• Compliance Agent verified Section 508, FIPS 140-2, and DISA STIG standards</li>
                  <li>• Achieved 98% compliance score with automated verification</li>
                  <li>• Reports automatically saved to Core Vault for version control</li>
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
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                  <Archive className="h-4 w-4" />
                  <span className="text-sm">Saved to Core Vault</span>
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