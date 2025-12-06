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
   */
  async searchIssues(jql: string, maxResults: number = 100): Promise<JiraIssue[]> {
    const data = await this.fetch('/search', {
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
}

// Export singleton instance
export const jiraClient = new JiraClient();

// Export class for testing
export { JiraClient };
