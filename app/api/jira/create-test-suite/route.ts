import { NextRequest, NextResponse } from 'next/server';
import { jiraClient } from '@/lib/jira';

/**
 * POST /api/jira/create-test-suite
 * Creates a test suite Story with individual test cases as sub-tasks in JIRA
 * This makes test cases visible on the JIRA board for demo purposes
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectKey = 'SCRUM', suite } = body;

    if (!suite || !suite.testCases || suite.testCases.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Suite with test cases is required' },
        { status: 400 }
      );
    }

    // Create the full test suite with parent Story and sub-task test cases
    const result = await jiraClient.createFullTestSuite(projectKey, {
      name: suite.name || 'Amazon.com Phase 2 Test Suite',
      useCase: suite.useCase || 'All Use Cases',
      passRate: suite.passRate || 92,
      testCases: suite.testCases.map((tc: any) => ({
        id: tc.id,
        name: tc.name,
        requirement: tc.requirement,
        priority: tc.priority || 'Medium',
        status: tc.status || 'passed'
      }))
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Created test suite with ${result.testCaseIssues?.length || 0} test cases`,
        parentIssue: {
          key: result.parentIssue?.key,
          summary: result.parentIssue?.summary,
          url: `https://progrediai.atlassian.net/browse/${result.parentIssue?.key}`
        },
        testCasesCreated: result.testCaseIssues?.length || 0,
        boardUrl: `https://progrediai.atlassian.net/jira/software/projects/${projectKey}/boards/1`,
        errors: result.errors
      });
    } else {
      return NextResponse.json(
        { success: false, errors: result.errors },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('JIRA Create Test Suite Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create test suite in JIRA'
      },
      { status: 500 }
    );
  }
}
