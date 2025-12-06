/**
 * Core Vault API Client for Core APEX
 * Saves test reports as real artifacts in Core Vault
 */

const COREVAULT_API_URL = process.env.COREVAULT_API_URL || 'https://z2kapkfa1l.execute-api.us-east-1.amazonaws.com/dev';
const COREVAULT_WEB_URL = process.env.COREVAULT_WEB_URL || 'https://corevault.progrediai.com';

// Use a consistent owner ID for Core APEX artifacts
const CORE_APEX_OWNER = process.env.COREVAULT_OWNER_ID || 'core-apex-system';

export interface CoreVaultArtifact {
  id: string;
  title: string;
  type: 'HTML' | 'REACT' | 'MARKDOWN' | 'SVG' | 'TYPESCRIPT' | 'TEXT' | 'CODE';
  content: string;
  metadata?: {
    source?: string;
    claudeVersion?: string;
    originalUrl?: string;
    extractedAt?: string;
    dependencies?: string[];
    size?: number;
  };
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  owner?: string;
  viewCount?: number;
  tags?: string[];
}

export interface TestReportData {
  reportId: string;
  title: string;
  project: string;
  useCase: string;
  generatedAt: string;
  status: 'passed' | 'failed' | 'partial';
  coverage: number;
  passRate: number;
  totalTests: number;
  testsPassed: number;
  testsFailed: number;
  requirements: number;
  testCases: Array<{
    id: string;
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: string;
    requirement: string;
  }>;
  jiraIssueKey?: string;
}

/**
 * Generate HTML content for a test report artifact
 */
function generateReportHtml(report: TestReportData): string {
  const statusColor = report.status === 'passed' ? '#10b981' : report.status === 'failed' ? '#ef4444' : '#f59e0b';
  const statusBg = report.status === 'passed' ? '#d1fae5' : report.status === 'failed' ? '#fee2e2' : '#fef3c7';
  const statusEmoji = report.status === 'passed' ? '✓' : report.status === 'failed' ? '✗' : '⚠';

  const testCasesHtml = report.testCases.map(tc => {
    const tcColor = tc.status === 'passed' ? '#10b981' : tc.status === 'failed' ? '#ef4444' : '#6b7280';
    const tcIcon = tc.status === 'passed' ? '✓' : tc.status === 'failed' ? '✗' : '○';
    return `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; font-family: monospace; font-size: 13px;">${tc.id}</td>
        <td style="padding: 12px; font-size: 14px;">${tc.name}</td>
        <td style="padding: 12px; font-family: monospace; color: #6366f1; font-size: 13px;">${tc.requirement}</td>
        <td style="padding: 12px; color: #6b7280; font-size: 13px;">${tc.duration}</td>
        <td style="padding: 12px; text-align: center;">
          <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${tc.status === 'passed' ? '#d1fae5' : tc.status === 'failed' ? '#fee2e2' : '#f3f4f6'}; color: ${tcColor};">
            ${tcIcon} ${tc.status}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.title} | Core APEX Test Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; color: #1f2937; line-height: 1.5; }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; padding: 32px; }
    .header h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .header p { opacity: 0.8; font-size: 14px; }
    .content { max-width: 1000px; margin: 0 auto; padding: 24px; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .card-label { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
    .card-value { font-size: 28px; font-weight: 700; }
    .info-row { display: flex; flex-wrap: wrap; gap: 24px; padding: 16px; background: white; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 14px; }
    .info-item span:first-child { color: #6b7280; }
    .info-item span:last-child { margin-left: 8px; font-weight: 500; }
    .table-container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .table-header { padding: 16px 20px; border-bottom: 1px solid #e5e7eb; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 12px 20px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; background: #f9fafb; }
    .footer { margin-top: 32px; padding: 24px; background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%); border-radius: 12px; text-align: center; }
    .footer-brand { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 12px; }
    .footer-brand span { font-size: 18px; font-weight: 600; color: #1e1b4b; }
    .footer p { color: #4b5563; font-size: 14px; margin-bottom: 16px; }
    .footer-links { display: flex; justify-content: center; gap: 16px; }
    .footer-links a { color: #6366f1; font-size: 14px; text-decoration: none; }
    @media (max-width: 640px) { .cards { grid-template-columns: 1fr 1fr; } }
  </style>
</head>
<body>
  <div class="header">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 14px;">
      <span>Core APEX</span>
      <span style="opacity: 0.5;">|</span>
      <span style="opacity: 0.8;">Test Report</span>
    </div>
    <h1>${report.title}</h1>
    <p>${report.project} • ${report.useCase}</p>
  </div>

  <div class="content">
    <div class="cards">
      <div class="card">
        <div class="card-label">Status</div>
        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: ${statusBg}; color: ${statusColor}; border-radius: 20px; font-weight: 600; font-size: 14px;">
          ${statusEmoji} ${report.status.toUpperCase()}
        </div>
      </div>
      <div class="card">
        <div class="card-label">Pass Rate</div>
        <div class="card-value" style="color: ${report.passRate >= 90 ? '#10b981' : report.passRate >= 70 ? '#f59e0b' : '#ef4444'};">${report.passRate}%</div>
      </div>
      <div class="card">
        <div class="card-label">Coverage</div>
        <div class="card-value" style="color: #6366f1;">${report.coverage}%</div>
      </div>
      <div class="card">
        <div class="card-label">Tests</div>
        <div class="card-value">
          <span style="color: #10b981;">${report.testsPassed}</span>
          <span style="color: #9ca3af;"> / </span>
          <span>${report.totalTests}</span>
        </div>
        <div style="font-size: 12px; color: #ef4444; margin-top: 4px;">${report.testsFailed} failed</div>
      </div>
    </div>

    <div class="info-row">
      <div class="info-item"><span>Report ID:</span><span>${report.reportId}</span></div>
      <div class="info-item"><span>Generated:</span><span>${report.generatedAt}</span></div>
      <div class="info-item"><span>Requirements:</span><span>${report.requirements}</span></div>
      ${report.jiraIssueKey ? `<div class="info-item"><span>JIRA:</span><span><a href="https://progrediai.atlassian.net/browse/${report.jiraIssueKey}" style="color: #6366f1;">${report.jiraIssueKey}</a></span></div>` : ''}
    </div>

    <div class="table-container">
      <div class="table-header">Test Cases (${report.testCases.length})</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Test Case</th>
            <th>Requirement</th>
            <th>Duration</th>
            <th style="text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${testCasesHtml}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div class="footer-brand">
        <span>Core APEX</span>
      </div>
      <p>AI-Powered Test Generation & Requirements Traceability</p>
      <div class="footer-links">
        <a href="https://coreapex.progrediai.com">Visit Core APEX</a>
        <span style="color: #d1d5db;">|</span>
        <a href="https://progrediai.com">Progredi AI</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Save a test report to Core Vault as an HTML artifact
 */
export async function saveReportToVault(report: TestReportData): Promise<{
  success: boolean;
  artifactId?: string;
  viewUrl?: string;
  error?: string;
}> {
  try {
    const htmlContent = generateReportHtml(report);

    const response = await fetch(`${COREVAULT_API_URL}/create-artifact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `${report.title} - ${report.reportId}`,
        type: 'HTML',
        content: htmlContent,
        isPublic: true,
        owner: CORE_APEX_OWNER,
        tags: ['core-apex', 'test-report', report.useCase.toLowerCase().replace(/[^a-z0-9]/g, '-'), report.status],
        metadata: {
          source: 'Core APEX',
          extractedAt: new Date().toISOString(),
          size: htmlContent.length,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create artifact: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const artifactId = data.artifact?.id || data.id;

    if (!artifactId) {
      throw new Error('No artifact ID returned from API');
    }

    return {
      success: true,
      artifactId,
      viewUrl: `${COREVAULT_WEB_URL}/view/${artifactId}`
    };
  } catch (error) {
    console.error('Error saving report to Core Vault:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save report to Core Vault'
    };
  }
}

/**
 * Get the view URL for an artifact
 */
export function getArtifactViewUrl(artifactId: string): string {
  return `${COREVAULT_WEB_URL}/view/${artifactId}`;
}
