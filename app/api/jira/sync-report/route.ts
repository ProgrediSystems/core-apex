import { NextRequest, NextResponse } from 'next/server';
import { jiraClient } from '@/lib/jira';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { issueKey, requirementId, report } = body;

    // Either use the provided issueKey or find it by requirementId
    let targetIssueKey = issueKey;

    if (!targetIssueKey && requirementId) {
      const issue = await jiraClient.findIssueByRequirementId(requirementId);
      if (!issue) {
        return NextResponse.json(
          { success: false, error: `No JIRA issue found for requirement: ${requirementId}` },
          { status: 404 }
        );
      }
      targetIssueKey = issue.key;
    }

    if (!targetIssueKey) {
      return NextResponse.json(
        { success: false, error: 'Either issueKey or requirementId is required' },
        { status: 400 }
      );
    }

    if (!report) {
      return NextResponse.json(
        { success: false, error: 'Report data is required' },
        { status: 400 }
      );
    }

    // Sync the report to JIRA
    const result = await jiraClient.syncTestReport(targetIssueKey, {
      status: report.status || 'passed',
      coverage: report.coverage || 0,
      testsPassed: report.testsPassed || 0,
      testsFailed: report.testsFailed || 0,
      testCases: report.testCases || [],
      reportId: report.reportId || report.id || 'unknown',
      generatedAt: report.generatedAt || new Date().toLocaleString()
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        issueKey: targetIssueKey,
        jiraUrl: `https://progrediai.atlassian.net/browse/${targetIssueKey}`
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('JIRA Sync Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sync report to JIRA'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status / find matching issue
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requirementId = searchParams.get('requirementId');

    if (!requirementId) {
      return NextResponse.json(
        { success: false, error: 'requirementId is required' },
        { status: 400 }
      );
    }

    const issue = await jiraClient.findIssueByRequirementId(requirementId);

    if (issue) {
      return NextResponse.json({
        success: true,
        found: true,
        issue: {
          key: issue.key,
          summary: issue.summary,
          status: issue.status,
          jiraUrl: `https://progrediai.atlassian.net/browse/${issue.key}`
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        found: false,
        message: `No JIRA issue found for requirement: ${requirementId}`
      });
    }
  } catch (error) {
    console.error('JIRA Lookup Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to lookup JIRA issue'
      },
      { status: 500 }
    );
  }
}
