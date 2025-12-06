/**
 * JIRA Cloud API Integration for Core APEX
 * Connects to Atlassian JIRA to fetch requirements for test generation
 */

export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  issueType: string;
  priority: string;
  status: string;
  labels: string[];
  parent?: string;
  created: string;
  updated: string;
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  description?: string;
}

export interface JiraRequirement {
  id: string;
  key: string;
  summary: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  type: 'Epic' | 'Story' | 'Task' | 'Sub-task';
  useCase: string;
  status: string;
  children?: JiraRequirement[];
}

class JiraClient {
  private baseUrl: string;
  private email: string;
  private apiToken: string;
  private headers: HeadersInit;

  constructor() {
    // JIRA Cloud uses: https://your-domain.atlassian.net
    this.baseUrl = process.env.JIRA_BASE_URL || '';
    this.email = process.env.JIRA_EMAIL || '';
    this.apiToken = process.env.JIRA_API_TOKEN || '';

    // Basic auth for JIRA Cloud API
    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');

    this.headers = {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  private async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}/rest/api/3${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`JIRA API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Get all projects
   */
  async getProjects(): Promise<JiraProject[]> {
    const data = await this.fetch('/project');
    return data.map((p: any) => ({
      id: p.id,
      key: p.key,
      name: p.name,
      description: p.description
    }));
  }

  /**
   * Get a specific project by key
   */
  async getProject(projectKey: string): Promise<JiraProject> {
    const data = await this.fetch(`/project/${projectKey}`);
    return {
      id: data.id,
      key: data.key,
      name: data.name,
      description: data.description
    };
  }

  /**
   * Search for issues using JQL
   * Updated to use /search/jql endpoint (old /search is deprecated)
   */
  async searchIssues(jql: string, maxResults: number = 100): Promise<JiraIssue[]> {
    const data = await this.fetch('/search/jql', {
      method: 'POST',
      body: JSON.stringify({
        jql,
        maxResults,
        fields: [
          'summary',
          'description',
          'issuetype',
          'priority',
          'status',
          'labels',
          'parent',
          'created',
          'updated'
        ]
      })
    });

    return data.issues.map((issue: any) => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      description: issue.fields.description?.content?.[0]?.content?.[0]?.text || '',
      issueType: issue.fields.issuetype?.name || 'Task',
      priority: issue.fields.priority?.name || 'Medium',
      status: issue.fields.status?.name || 'To Do',
      labels: issue.fields.labels || [],
      parent: issue.fields.parent?.key,
      created: issue.fields.created,
      updated: issue.fields.updated
    }));
  }

  /**
   * Get all issues for a project
   */
  async getProjectIssues(projectKey: string): Promise<JiraIssue[]> {
    return this.searchIssues(`project = ${projectKey} ORDER BY created DESC`);
  }

  /**
   * Get issues by epic
   */
  async getEpicIssues(epicKey: string): Promise<JiraIssue[]> {
    return this.searchIssues(`"Epic Link" = ${epicKey} OR parent = ${epicKey} ORDER BY created ASC`);
  }

  /**
   * Create a new issue
   */
  async createIssue(projectKey: string, issueType: string, summary: string, description?: string, parentKey?: string, labels?: string[]): Promise<JiraIssue> {
    const fields: any = {
      project: { key: projectKey },
      issuetype: { name: issueType },
      summary,
      description: description ? {
        type: 'doc',
        version: 1,
        content: [{
          type: 'paragraph',
          content: [{ type: 'text', text: description }]
        }]
      } : undefined,
      labels: labels || []
    };

    if (parentKey && issueType === 'Sub-task') {
      fields.parent = { key: parentKey };
    }

    const data = await this.fetch('/issue', {
      method: 'POST',
      body: JSON.stringify({ fields })
    });

    return {
      id: data.id,
      key: data.key,
      summary,
      description: description || '',
      issueType,
      priority: 'Medium',
      status: 'To Do',
      labels: labels || [],
      parent: parentKey,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
  }

  /**
   * Create multiple issues in bulk
   */
  async createBulkIssues(issues: Array<{
    projectKey: string;
    issueType: string;
    summary: string;
    description?: string;
    parentKey?: string;
    labels?: string[];
    priority?: string;
  }>): Promise<JiraIssue[]> {
    const issueUpdates = issues.map(issue => ({
      fields: {
        project: { key: issue.projectKey },
        issuetype: { name: issue.issueType },
        summary: issue.summary,
        description: issue.description ? {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: issue.description }]
          }]
        } : undefined,
        labels: issue.labels || [],
        priority: issue.priority ? { name: issue.priority } : undefined,
        ...(issue.parentKey && issue.issueType === 'Sub-task' ? { parent: { key: issue.parentKey } } : {})
      }
    }));

    const data = await this.fetch('/issue/bulk', {
      method: 'POST',
      body: JSON.stringify({ issueUpdates })
    });

    return data.issues?.map((issue: any, index: number) => ({
      id: issue.id,
      key: issue.key,
      summary: issues[index].summary,
      description: issues[index].description || '',
      issueType: issues[index].issueType,
      priority: issues[index].priority || 'Medium',
      status: 'To Do',
      labels: issues[index].labels || [],
      parent: issues[index].parentKey,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    })) || [];
  }

  /**
   * Convert JIRA issues to Core APEX requirements format
   */
  convertToRequirements(issues: JiraIssue[]): JiraRequirement[] {
    const priorityMap: Record<string, 'Critical' | 'High' | 'Medium' | 'Low'> = {
      'Highest': 'Critical',
      'High': 'High',
      'Medium': 'Medium',
      'Low': 'Low',
      'Lowest': 'Low'
    };

    const typeMap: Record<string, 'Epic' | 'Story' | 'Task' | 'Sub-task'> = {
      'Epic': 'Epic',
      'Story': 'Story',
      'Task': 'Task',
      'Sub-task': 'Sub-task',
      'Subtask': 'Sub-task'
    };

    return issues.map(issue => {
      // Extract use case from labels or key prefix
      const ucLabel = issue.labels.find(l => l.startsWith('UC'));
      const useCase = ucLabel || this.extractUseCase(issue.key, issue.summary);

      return {
        id: issue.id,
        key: issue.key,
        summary: issue.summary,
        description: issue.description,
        priority: priorityMap[issue.priority] || 'Medium',
        type: typeMap[issue.issueType] || 'Task',
        useCase,
        status: issue.status
      };
    });
  }

  private extractUseCase(key: string, summary: string): string {
    // Try to extract from summary
    if (summary.toLowerCase().includes('cart')) return 'Add to Cart';
    if (summary.toLowerCase().includes('wish')) return 'Wishlist';
    if (summary.toLowerCase().includes('filter') || summary.toLowerCase().includes('search')) return 'Search Filters';
    if (summary.toLowerCase().includes('login') || summary.toLowerCase().includes('logout') || summary.toLowerCase().includes('auth')) return 'Login/Logout';
    if (summary.toLowerCase().includes('profile') || summary.toLowerCase().includes('address') || summary.toLowerCase().includes('email') || summary.toLowerCase().includes('phone')) return 'Profile';
    return 'General';
  }

  /**
   * Add a comment to a JIRA issue
   */
  async addComment(issueKey: string, comment: string): Promise<void> {
    await this.fetch(`/issue/${issueKey}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        body: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: comment }]
          }]
        }
      })
    });
  }

  /**
   * Add a formatted test report comment to a JIRA issue
   */
  async addTestReportComment(issueKey: string, report: {
    status: 'passed' | 'failed' | 'partial';
    coverage: number;
    testsPassed: number;
    testsFailed: number;
    testCases: Array<{ name: string; passed: boolean }>;
    reportId: string;
    generatedAt: string;
  }): Promise<void> {
    const statusEmoji = report.status === 'passed' ? '✅' : report.status === 'failed' ? '❌' : '⚠️';
    const statusText = report.status.toUpperCase();

    // Build test cases list (max 10 shown)
    const testCasesList = report.testCases
      .slice(0, 10)
      .map(tc => `• ${tc.name} ${tc.passed ? '✓' : '✗'}`)
      .join('\n');

    const moreTests = report.testCases.length > 10
      ? `\n... and ${report.testCases.length - 10} more tests`
      : '';

    const comment = `════════════════════════════════════
🧪 Core APEX Test Report
════════════════════════════════════
Status: ${statusEmoji} ${statusText}
Coverage: ${report.coverage}%
Tests: ${report.testsPassed} passed, ${report.testsFailed} failed
Generated: ${report.generatedAt}

Test Cases:
${testCasesList}${moreTests}

📋 Full Report: https://corevault.progrediai.com/report/${report.reportId}
════════════════════════════════════`;

    await this.addComment(issueKey, comment);
  }

  /**
   * Update labels on an issue (add test status label)
   */
  async updateLabels(issueKey: string, labelsToAdd: string[], labelsToRemove: string[] = []): Promise<void> {
    const update: any = {};

    if (labelsToAdd.length > 0) {
      update.labels = labelsToAdd.map(label => ({ add: label }));
    }

    if (labelsToRemove.length > 0) {
      update.labels = [
        ...(update.labels || []),
        ...labelsToRemove.map(label => ({ remove: label }))
      ];
    }

    await this.fetch(`/issue/${issueKey}`, {
      method: 'PUT',
      body: JSON.stringify({ update })
    });
  }

  /**
   * Sync a test report to JIRA - adds comment and updates labels
   */
  async syncTestReport(issueKey: string, report: {
    status: 'passed' | 'failed' | 'partial';
    coverage: number;
    testsPassed: number;
    testsFailed: number;
    testCases: Array<{ name: string; passed: boolean }>;
    reportId: string;
    generatedAt: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      // Add the test report comment
      await this.addTestReportComment(issueKey, report);

      // Update labels based on test status
      const statusLabel = `test-${report.status}`;
      const labelsToRemove = ['test-passed', 'test-failed', 'test-partial'].filter(l => l !== statusLabel);

      await this.updateLabels(issueKey, [statusLabel, 'apex-tested'], labelsToRemove);

      return {
        success: true,
        message: `Test report synced to ${issueKey}`
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to sync test report'
      };
    }
  }

  /**
   * Find JIRA issue by requirement ID (e.g., UC1-FR1)
   */
  async findIssueByRequirementId(requirementId: string, projectKey: string = 'SCRUM'): Promise<JiraIssue | null> {
    const issues = await this.searchIssues(
      `project = ${projectKey} AND summary ~ "${requirementId}" ORDER BY created DESC`,
      1
    );
    return issues.length > 0 ? issues[0] : null;
  }

  /**
   * Create test case issues as sub-tasks under a parent Epic/Story
   * This creates visible issues on the JIRA board for each generated test
   */
  async createTestCaseIssues(projectKey: string, parentKey: string, testCases: Array<{
    id: string;
    name: string;
    requirement: string;
    priority: string;
    status: 'passed' | 'failed' | 'pending';
  }>): Promise<{ created: JiraIssue[]; errors: string[] }> {
    const created: JiraIssue[] = [];
    const errors: string[] = [];

    // Create test case issues one by one (JIRA bulk API has limitations)
    for (const tc of testCases) {
      try {
        const statusEmoji = tc.status === 'passed' ? '✅' : tc.status === 'failed' ? '❌' : '⏳';
        const priorityLabel = tc.priority === 'Critical' ? '🔴' : tc.priority === 'High' ? '🟠' : '🟢';

        const summary = `${statusEmoji} ${tc.id}: ${tc.name}`;
        const description = `**Test Case ID:** ${tc.id}
**Linked Requirement:** ${tc.requirement}
**Priority:** ${priorityLabel} ${tc.priority}
**Status:** ${tc.status.toUpperCase()}

---
*Generated by Core APEX Test Design Agent*
*Powered by Claude AI*`;

        const labels = [
          'core-apex',
          'generated-test',
          `test-${tc.status}`,
          tc.priority.toLowerCase()
        ];

        const issue = await this.createIssue(
          projectKey,
          'Sub-task',
          summary,
          description,
          parentKey,
          labels
        );
        created.push(issue);
      } catch (error) {
        errors.push(`Failed to create ${tc.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return { created, errors };
  }

  /**
   * Create a Test Suite Epic to hold all test cases
   */
  async createTestSuiteEpic(projectKey: string, suiteName: string, useCase: string, totalTests: number, coverage: number): Promise<JiraIssue> {
    const summary = `🧪 Core APEX Test Suite: ${suiteName}`;
    const description = `**Use Case:** ${useCase}
**Total Tests:** ${totalTests}
**Coverage:** ${coverage}%

---
This Epic contains all test cases generated by Core APEX for the ${useCase} use case.

*Generated by Core APEX Test Design Agent*
*Powered by Claude AI*`;

    return this.createIssue(
      projectKey,
      'Epic',
      summary,
      description,
      undefined,
      ['core-apex', 'test-suite', useCase.toLowerCase().replace(/[^a-z0-9]/g, '-')]
    );
  }

  /**
   * Create a parent Story for test cases when Epic is not available
   */
  async createTestSuiteStory(projectKey: string, suiteName: string, useCase: string, totalTests: number, passRate: number): Promise<JiraIssue> {
    const statusEmoji = passRate >= 90 ? '✅' : passRate >= 70 ? '⚠️' : '❌';
    const summary = `${statusEmoji} Core APEX Tests: ${suiteName} (${passRate}% pass rate)`;
    const description = `**Use Case:** ${useCase}
**Total Tests:** ${totalTests}
**Pass Rate:** ${passRate}%
**Generated:** ${new Date().toLocaleString()}

---
This Story contains all test cases generated by Core APEX.
Sub-tasks below show individual test case results.

*Generated by Core APEX Test Design Agent*
*Powered by Claude AI*`;

    return this.createIssue(
      projectKey,
      'Story',
      summary,
      description,
      undefined,
      ['core-apex', 'test-suite', 'generated']
    );
  }

  /**
   * Full workflow: Create a test suite with all test cases as sub-tasks
   */
  async createFullTestSuite(projectKey: string, suite: {
    name: string;
    useCase: string;
    passRate: number;
    testCases: Array<{
      id: string;
      name: string;
      requirement: string;
      priority: string;
      status: 'passed' | 'failed' | 'pending';
    }>;
  }): Promise<{
    success: boolean;
    parentIssue?: JiraIssue;
    testCaseIssues?: JiraIssue[];
    errors?: string[];
  }> {
    try {
      // Create parent Story for the test suite
      const parentIssue = await this.createTestSuiteStory(
        projectKey,
        suite.name,
        suite.useCase,
        suite.testCases.length,
        suite.passRate
      );

      // Create test case sub-tasks
      const { created, errors } = await this.createTestCaseIssues(
        projectKey,
        parentIssue.key,
        suite.testCases
      );

      return {
        success: true,
        parentIssue,
        testCaseIssues: created,
        errors: errors.length > 0 ? errors : undefined
      };
    } catch (error) {
      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Failed to create test suite']
      };
    }
  }
}

// Export singleton instance
export const jiraClient = new JiraClient();

// Export class for testing
export { JiraClient };
