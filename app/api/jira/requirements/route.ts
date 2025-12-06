import { NextRequest, NextResponse } from 'next/server';
import { jiraClient } from '@/lib/jira';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectKey = searchParams.get('project') || process.env.JIRA_PROJECT_KEY || 'APEX';

    // Fetch all issues from the project
    const issues = await jiraClient.getProjectIssues(projectKey);

    // Convert to requirements format
    const requirements = jiraClient.convertToRequirements(issues);

    // Group by use case
    const grouped = requirements.reduce((acc, req) => {
      const uc = req.useCase || 'General';
      if (!acc[uc]) {
        acc[uc] = [];
      }
      acc[uc].push(req);
      return acc;
    }, {} as Record<string, typeof requirements>);

    return NextResponse.json({
      success: true,
      project: projectKey,
      total: requirements.length,
      useCases: Object.keys(grouped).length,
      requirements,
      grouped,
      summary: {
        critical: requirements.filter(r => r.priority === 'Critical').length,
        high: requirements.filter(r => r.priority === 'High').length,
        medium: requirements.filter(r => r.priority === 'Medium').length,
        low: requirements.filter(r => r.priority === 'Low').length
      }
    });
  } catch (error) {
    console.error('JIRA API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch JIRA requirements',
        // Return demo data as fallback
        fallback: true,
        requirements: getDemoRequirements()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, projectKey, issues } = body;

    if (action === 'populate') {
      // Populate JIRA with Amazon.com requirements
      const createdIssues = await jiraClient.createBulkIssues(
        issues.map((issue: any) => ({
          projectKey: projectKey || process.env.JIRA_PROJECT_KEY || 'APEX',
          ...issue
        }))
      );

      return NextResponse.json({
        success: true,
        created: createdIssues.length,
        issues: createdIssues
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('JIRA API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create JIRA issues'
      },
      { status: 500 }
    );
  }
}

// Demo requirements fallback
function getDemoRequirements() {
  return [
    // UC1: Add to Cart
    { key: 'UC1-FR1', summary: 'Product Selection: Allow user to select product for cart', priority: 'Critical', type: 'Story', useCase: 'Add to Cart' },
    { key: 'UC1-FR1.1', summary: 'Enable product selection from listing pages', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR1.2', summary: 'Enable product selection from detail pages', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR1.3', summary: 'Enable product selection from search results', priority: 'High', type: 'Sub-task', useCase: 'Add to Cart' },
    { key: 'UC1-FR2', summary: 'Quantity Specification with validation', priority: 'Critical', type: 'Story', useCase: 'Add to Cart' },
    // ... more demo requirements would be here
  ];
}
