import { NextRequest, NextResponse } from 'next/server';

interface JiraIssue {
  key: string;
  summary: string;
  description: string;
  acceptance_criteria?: string;
}

interface ParsedRequirement {
  id: string;
  source: string;
  type: 'functional' | 'non-functional' | 'performance' | 'security';
  description: string;
  testable: boolean;
  ambiguity_score: number;
  test_scenarios: string[];
  traceability_id: string;
}

/**
 * Requirements Agent API
 * Parses requirements from various sources (JIRA, documents) and converts them to testable assertions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, content, jira_config } = body;

    // Simulate requirement parsing based on source type
    let parsedRequirements: ParsedRequirement[] = [];

    if (source === 'jira') {
      // Simulate JIRA integration
      parsedRequirements = await parseJiraRequirements(jira_config);
    } else if (source === 'document') {
      // Parse document content
      parsedRequirements = await parseDocumentRequirements(content);
    }

    // Generate requirements traceability matrix
    const rtm = generateRTM(parsedRequirements);

    return NextResponse.json({
      success: true,
      requirements_count: parsedRequirements.length,
      requirements: parsedRequirements,
      rtm: rtm,
      ambiguous_requirements: parsedRequirements.filter(r => r.ambiguity_score > 0.5).length,
      testable_requirements: parsedRequirements.filter(r => r.testable).length,
    });

  } catch (error) {
    console.error('Requirements Agent Error:', error);
    return NextResponse.json(
      { error: 'Failed to parse requirements' },
      { status: 500 }
    );
  }
}

/**
 * Simulate JIRA requirements parsing
 */
async function parseJiraRequirements(jira_config: any): Promise<ParsedRequirement[]> {
  // In production, this would connect to actual JIRA API
  // For demo, return simulated Navy logistics system requirements

  const demoRequirements: ParsedRequirement[] = [
    {
      id: 'REQ-001',
      source: 'JIRA-MLB-2024-15',
      type: 'functional',
      description: 'System shall authenticate users with CAC/PIV cards within 3 seconds',
      testable: true,
      ambiguity_score: 0.1,
      test_scenarios: [
        'Valid CAC authentication',
        'Invalid CAC rejection',
        'Timeout handling',
        'Concurrent authentication'
      ],
      traceability_id: 'MLB-2024-15-AUTH-001'
    },
    {
      id: 'REQ-002',
      source: 'JIRA-MLB-2024-15',
      type: 'performance',
      description: 'Inventory queries shall return results within 2 seconds for datasets up to 1M records',
      testable: true,
      ambiguity_score: 0.2,
      test_scenarios: [
        'Query with 1000 records',
        'Query with 100K records',
        'Query with 1M records',
        'Concurrent query stress test'
      ],
      traceability_id: 'MLB-2024-15-PERF-001'
    },
    {
      id: 'REQ-003',
      source: 'JIRA-MLB-2024-15',
      type: 'security',
      description: 'System shall encrypt all data at rest using AES-256 and in transit using TLS 1.3',
      testable: true,
      ambiguity_score: 0.0,
      test_scenarios: [
        'Verify AES-256 encryption at rest',
        'Verify TLS 1.3 in transit',
        'Test downgrade attack prevention',
        'Validate certificate pinning'
      ],
      traceability_id: 'MLB-2024-15-SEC-001'
    },
    {
      id: 'REQ-004',
      source: 'JIRA-MLB-2024-15',
      type: 'functional',
      description: 'System shall support concurrent editing by multiple users with conflict resolution',
      testable: true,
      ambiguity_score: 0.4,
      test_scenarios: [
        'Simultaneous edit detection',
        'Conflict resolution workflow',
        'Version control tracking',
        'Rollback capability'
      ],
      traceability_id: 'MLB-2024-15-FUNC-002'
    },
    {
      id: 'REQ-005',
      source: 'JIRA-MLB-2024-15',
      type: 'non-functional',
      description: 'System shall be Section 508 compliant for accessibility',
      testable: true,
      ambiguity_score: 0.3,
      test_scenarios: [
        'Screen reader compatibility',
        'Keyboard navigation',
        'Color contrast validation',
        'WCAG 2.1 AA compliance'
      ],
      traceability_id: 'MLB-2024-15-ACC-001'
    }
  ];

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return demoRequirements;
}

/**
 * Parse requirements from document content
 */
async function parseDocumentRequirements(content: string): Promise<ParsedRequirement[]> {
  // Simulate document parsing with AI
  // In production, this would use Claude or GPT to extract requirements

  const requirements: ParsedRequirement[] = [];
  const lines = content.split('\n').filter(line => line.trim());

  lines.forEach((line, index) => {
    if (line.toLowerCase().includes('shall') || line.toLowerCase().includes('must')) {
      requirements.push({
        id: `DOC-REQ-${String(index + 1).padStart(3, '0')}`,
        source: 'document-upload',
        type: determineRequirementType(line),
        description: line.trim(),
        testable: !line.includes('user-friendly') && !line.includes('intuitive'),
        ambiguity_score: calculateAmbiguity(line),
        test_scenarios: generateTestScenarios(line),
        traceability_id: `DOC-TRACE-${String(index + 1).padStart(3, '0')}`
      });
    }
  });

  return requirements;
}

/**
 * Determine requirement type from text
 */
function determineRequirementType(text: string): 'functional' | 'non-functional' | 'performance' | 'security' {
  if (text.toLowerCase().includes('encrypt') || text.toLowerCase().includes('secure') || text.toLowerCase().includes('auth')) {
    return 'security';
  }
  if (text.toLowerCase().includes('second') || text.toLowerCase().includes('performance') || text.toLowerCase().includes('fast')) {
    return 'performance';
  }
  if (text.toLowerCase().includes('compliant') || text.toLowerCase().includes('standard')) {
    return 'non-functional';
  }
  return 'functional';
}

/**
 * Calculate ambiguity score (0-1, higher = more ambiguous)
 */
function calculateAmbiguity(text: string): number {
  const ambiguousTerms = ['appropriate', 'adequate', 'as needed', 'user-friendly', 'intuitive', 'fast', 'efficient', 'robust'];
  let score = 0;

  ambiguousTerms.forEach(term => {
    if (text.toLowerCase().includes(term)) {
      score += 0.2;
    }
  });

  return Math.min(score, 1);
}

/**
 * Generate test scenarios from requirement text
 */
function generateTestScenarios(text: string): string[] {
  const scenarios: string[] = [];

  // Basic positive test
  scenarios.push('Verify requirement under normal conditions');

  // Negative test
  scenarios.push('Verify system behavior when requirement is violated');

  // Edge cases
  if (text.includes('number') || text.includes('count')) {
    scenarios.push('Test with minimum values');
    scenarios.push('Test with maximum values');
  }

  // Performance
  if (text.includes('second') || text.includes('time')) {
    scenarios.push('Test under load conditions');
  }

  return scenarios;
}

/**
 * Generate Requirements Traceability Matrix
 */
function generateRTM(requirements: ParsedRequirement[]) {
  return {
    total_requirements: requirements.length,
    coverage_percentage: 100,
    requirements_to_tests: requirements.map(req => ({
      requirement_id: req.id,
      test_count: req.test_scenarios.length,
      coverage_status: 'planned'
    })),
    uncovered_requirements: [],
    high_risk_requirements: requirements.filter(r => r.type === 'security' || r.type === 'performance').map(r => r.id)
  };
}

// GET endpoint to retrieve parsed requirements
export async function GET(request: NextRequest) {
  return NextResponse.json({
    agent: 'Requirements Agent',
    version: '1.0.0',
    capabilities: [
      'JIRA integration',
      'Document parsing (Word, PDF, CSV)',
      'DOORS integration via ReqIF',
      'CAMEO SysML parsing',
      'Ambiguity detection',
      'Requirements traceability matrix',
      'Test scenario generation'
    ],
    status: 'ready'
  });
}