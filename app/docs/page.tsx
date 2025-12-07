'use client';

import { useState } from 'react';
import {
  Shield,
  Lock,
  CheckCircle,
  Server,
  Database,
  GitBranch,
  Users,
  FileText,
  TestTube2,
  Zap,
  BarChart3,
  Settings2,
  Link2,
  Archive,
  Eye,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// Simple password protection - in production, use proper auth
const DOCS_PASSWORD = 'APEX-AIAT-2025';

export default function DocsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DOCS_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid access code');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-12 w-12 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Core APEX Technical Documentation
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Enter the access code provided by Progredi AI
          </p>

          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access Code"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 mb-4"
            />
            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Access Documentation
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-6">
            For Navy-AIAT Phase 2 Evaluation Only
          </p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', name: 'System Overview', icon: Eye },
    { id: 'architecture', name: 'Architecture', icon: Server },
    { id: 'agents', name: 'AI Agents', icon: Users },
    { id: 'integrations', name: 'Integrations', icon: Link2 },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'security', name: 'Security', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TestTube2 className="h-8 w-8 text-indigo-400" />
              <div>
                <h1 className="text-xl font-bold">Core APEX Technical Documentation</h1>
                <p className="text-sm text-gray-400">Navy-AIAT Phase 2 Submission</p>
              </div>
            </div>
            <span className="text-xs bg-indigo-600/30 text-indigo-300 px-3 py-1 rounded-full">
              Confidential
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1 sticky top-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">System Overview</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Core APEX (Automated Performance & Evaluation eXpert) is an AI-powered testing
                    automation platform designed specifically for Navy PEO MLB systems. It transforms
                    manual testing processes through six specialized AI agents that work together to
                    generate, execute, and maintain comprehensive test suites.
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Key Differentiators</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Working MVP</h4>
                        <p className="text-sm text-gray-400">Live system running on AWS with real integrations</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Live JIRA Integration</h4>
                        <p className="text-sm text-gray-400">Bi-directional sync with requirements management</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Human-in-the-Loop</h4>
                        <p className="text-sm text-gray-400">All AI outputs require human review and approval</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">DoD Compliance Focus</h4>
                        <p className="text-sm text-gray-400">Section 508, FIPS 140-2, DISA STIG verification</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Technology Stack</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-400 mb-2">AI Engine</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Claude Sonnet 4.0 (Anthropic)</li>
                        <li>Multi-agent orchestration</li>
                        <li>Context-aware processing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400 mb-2">Frontend</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Next.js 15 (App Router)</li>
                        <li>React 19</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400 mb-2">Infrastructure</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>AWS Amplify (current MVP)</li>
                        <li>Designed for AWS GovCloud</li>
                        <li>FedRAMP architecture patterns</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">Live Demo Available</h3>
                  <p className="text-gray-300 mb-4">
                    The Core APEX MVP is deployed and accessible. The demo showcases all six agents
                    processing 77 Amazon.com functional requirements across 5 use cases.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/"
                      className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                    >
                      <span>Launch Demo</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="https://corevault.progrediai.com/view/92003b2f-93e3-4acb-b8b3-5b0da49fc8c2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                    >
                      <Archive className="h-4 w-4" />
                      <span>View Stored Artifact</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'architecture' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Core APEX uses a modular, event-driven architecture designed for scalability
                    and security. Each AI agent operates independently while sharing context through
                    a central orchestration layer.
                  </p>
                </div>

                {/* Architecture Diagram - Conceptual */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">High-Level Architecture</h3>

                  <div className="space-y-6">
                    {/* External Systems */}
                    <div className="flex justify-center space-x-4">
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm font-semibold text-blue-400">JIRA</p>
                        <p className="text-xs text-gray-400">Requirements</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm font-semibold text-blue-400">DOORS</p>
                        <p className="text-xs text-gray-400">ReqIF Import</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm font-semibold text-blue-400">Git</p>
                        <p className="text-xs text-gray-400">Source Control</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm font-semibold text-blue-400">CI/CD</p>
                        <p className="text-xs text-gray-400">Pipelines</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="h-8 w-px bg-gray-600"></div>
                    </div>

                    {/* Integration Layer */}
                    <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                      <p className="text-sm font-semibold text-gray-300">Integration Layer</p>
                      <p className="text-xs text-gray-400">REST APIs | Webhooks | Event Bus</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="h-8 w-px bg-gray-600"></div>
                    </div>

                    {/* Agent Orchestration */}
                    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
                      <p className="text-center text-sm font-semibold text-indigo-400 mb-4">Agent Orchestration Engine</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['Requirements', 'Test Design', 'Execution', 'Analysis', 'Maintenance', 'Compliance'].map((agent) => (
                          <div key={agent} className="bg-gray-800 rounded-lg p-2 text-center">
                            <p className="text-xs font-medium">{agent}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="h-8 w-px bg-gray-600"></div>
                    </div>

                    {/* AI Engine */}
                    <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 text-center">
                      <p className="text-sm font-semibold text-purple-400">Claude Sonnet 4.0</p>
                      <p className="text-xs text-gray-400">Anthropic API | Context Management | Response Processing</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="h-8 w-px bg-gray-600"></div>
                    </div>

                    {/* Storage */}
                    <div className="flex justify-center space-x-4">
                      <div className="bg-green-900/30 border border-green-500/30 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm font-semibold text-green-400">Core Vault</p>
                        <p className="text-xs text-gray-400">Artifact Storage</p>
                      </div>
                      <div className="bg-green-900/30 border border-green-500/30 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm font-semibold text-green-400">PostgreSQL</p>
                        <p className="text-xs text-gray-400">Test Data</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Design Principles</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-indigo-400">Modular Agent Design</h4>
                      <p className="text-sm text-gray-300">Each agent is independently deployable and scalable, communicating through well-defined interfaces.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400">Human-in-the-Loop by Default</h4>
                      <p className="text-sm text-gray-300">All AI-generated outputs pass through human review checkpoints before execution or storage.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400">Audit Trail</h4>
                      <p className="text-sm text-gray-300">Every action is logged with timestamps, user attribution, and AI confidence scores for compliance.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400">GovCloud Ready</h4>
                      <p className="text-sm text-gray-300">Architecture follows AWS GovCloud and FedRAMP patterns for future deployment.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'agents' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">AI Agent System</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Core APEX employs six specialized AI agents, each focused on a specific aspect
                    of the testing lifecycle. Agents share context and can trigger workflows in
                    other agents as needed.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Requirements Agent */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600/20 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Requirements Agent</h3>
                          <p className="text-sm text-gray-400">Parses and structures requirements from multiple sources</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Inputs</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>JIRA Stories, Epics, Tasks</li>
                          <li>DOORS ReqIF exports</li>
                          <li>Natural language documents</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Outputs</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Structured requirement objects</li>
                          <li>Testability assessments</li>
                          <li>Traceability links</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Test Design Agent */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-600/20 p-3 rounded-lg">
                          <TestTube2 className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Test Design Agent</h3>
                          <p className="text-sm text-gray-400">Generates comprehensive test cases from requirements</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Capabilities</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Positive & negative test scenarios</li>
                          <li>Boundary value analysis</li>
                          <li>Equivalence partitioning</li>
                          <li>Edge case identification</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Human Review</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Test case approval workflow</li>
                          <li>Priority adjustment</li>
                          <li>Coverage verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Execution Agent */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-600/20 p-3 rounded-lg">
                          <Zap className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Execution Agent</h3>
                          <p className="text-sm text-gray-400">Orchestrates parallel test execution</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Features</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Parallel execution (configurable)</li>
                          <li>Environment management</li>
                          <li>Real-time progress tracking</li>
                          <li>Automatic retry on flaky tests</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Integrations</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>CI/CD pipeline triggers</li>
                          <li>Azure DevOps</li>
                          <li>Jenkins, GitLab CI</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Agent */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-600/20 p-3 rounded-lg">
                          <BarChart3 className="h-6 w-6 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Analysis Agent</h3>
                          <p className="text-sm text-gray-400">AI-powered defect prediction and pattern recognition</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Analysis Types</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Failure pattern clustering</li>
                          <li>High-risk area identification</li>
                          <li>Root cause suggestions</li>
                          <li>Trend analysis</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Outputs</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Defect predictions</li>
                          <li>Test prioritization</li>
                          <li>Coverage recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Agent */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-600/20 p-3 rounded-lg">
                          <Settings2 className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Maintenance Agent</h3>
                          <p className="text-sm text-gray-400">Automatically updates tests when code changes</p>
                        </div>
                      </div>
                      <span className="text-xs bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded-full">Phase 2</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Triggers</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Git commit webhooks</li>
                          <li>PR merge events</li>
                          <li>Manual refresh requests</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Actions</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>Test script updates</li>
                          <li>Selector regeneration</li>
                          <li>JIRA sync back</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Agent */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-3 rounded-lg">
                          <Shield className="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Compliance Agent</h3>
                          <p className="text-sm text-gray-400">Verifies DoD compliance standards</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Section 508 (6 checks)</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>Keyboard accessibility</li>
                          <li>Focus indicators</li>
                          <li>Screen reader support</li>
                          <li>Color contrast</li>
                          <li>Form labels</li>
                          <li>Alt text</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">FIPS 140-2 (5 checks)</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>TLS 1.2/1.3</li>
                          <li>AES-256 encryption</li>
                          <li>SHA-256 hashing</li>
                          <li>Key management</li>
                          <li>Session tokens</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">DISA STIGs (8 checks)</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>Input validation</li>
                          <li>SQL injection</li>
                          <li>XSS prevention</li>
                          <li>Session timeout</li>
                          <li>Auth lockout</li>
                          <li>Password complexity</li>
                          <li>Audit logging</li>
                          <li>Error handling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">System Integrations</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Core APEX integrates with industry-standard tools used across Navy programs.
                    All integrations are bi-directional where applicable.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* JIRA */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold flex items-center space-x-2">
                        <Link2 className="h-5 w-5 text-blue-400" />
                        <span>JIRA Cloud</span>
                      </h3>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Import requirements from Stories/Epics</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Create test case sub-tasks</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Sync test results as comments</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Update issue labels</span>
                      </li>
                    </ul>
                    <a
                      href="https://progrediai.atlassian.net/jira/software/projects/SCRUM/boards/1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <span>View Live Board</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Core Vault */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold flex items-center space-x-2">
                        <Archive className="h-5 w-5 text-indigo-400" />
                        <span>Core Vault</span>
                      </h3>
                      <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">Live</span>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Persistent artifact storage</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Test report versioning</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Cross-project visibility</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Audit trail</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href="https://corevault.progrediai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm text-indigo-400 hover:text-indigo-300"
                      >
                        <span>View Core Vault</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a
                        href="https://corevault.progrediai.com/view/92003b2f-93e3-4acb-b8b3-5b0da49fc8c2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm bg-indigo-600/30 text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-600/50"
                      >
                        <span>Live Demo Artifact</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  {/* DOORS */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold flex items-center space-x-2">
                        <Database className="h-5 w-5 text-purple-400" />
                        <span>IBM DOORS</span>
                      </h3>
                      <span className="text-xs bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded-full">Phase 2</span>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>ReqIF import support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>Requirement traceability</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>Baseline management</span>
                      </li>
                    </ul>
                  </div>

                  {/* CI/CD */}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold flex items-center space-x-2">
                        <GitBranch className="h-5 w-5 text-green-400" />
                        <span>CI/CD Pipelines</span>
                      </h3>
                      <span className="text-xs bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded-full">Phase 2</span>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>Azure DevOps</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>Jenkins</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>GitLab CI</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>GitHub Actions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'compliance' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Compliance Framework</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Core APEX includes a dedicated Compliance Agent that verifies adherence to
                    DoD standards. The agent performs 19 automated checks across three compliance frameworks.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Section 508</h3>
                      <span className="text-2xl font-bold text-green-400">6</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Accessibility compliance checks</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>1194.21(a) Keyboard Accessibility</li>
                      <li>1194.21(b) Focus Indicators</li>
                      <li>1194.21(c) Screen Reader Support</li>
                      <li>1194.21(d) Color Contrast</li>
                      <li>1194.21(l) Form Labels</li>
                      <li>1194.22(a) Alt Text</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">FIPS 140-2</h3>
                      <span className="text-2xl font-bold text-blue-400">5</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Cryptographic security checks</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>TLS 1.2/1.3 enforcement</li>
                      <li>AES-256 encryption at rest</li>
                      <li>SHA-256 password hashing</li>
                      <li>Secure key management</li>
                      <li>JWT token security</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">DISA STIGs</h3>
                      <span className="text-2xl font-bold text-purple-400">8</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Security technical implementation</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>V-222396 Input Validation</li>
                      <li>V-222400 SQL Injection</li>
                      <li>V-222401 XSS Prevention</li>
                      <li>V-222425 Session Timeout</li>
                      <li>V-222430 Auth Lockout</li>
                      <li>V-222432 Password Complexity</li>
                      <li>V-222544 Audit Logging</li>
                      <li>V-222550 Error Handling</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Demo Compliance Results</h3>
                  <p className="text-gray-300 mb-4">
                    The live demo demonstrates realistic compliance checking, including intentional
                    findings to show how the system reports issues:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Passing Checks</h4>
                      <p className="text-3xl font-bold text-green-400">17 / 19</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Findings (Intentional)</h4>
                      <ul className="text-sm text-orange-300">
                        <li>V-222430: Auth lockout threshold (CAT II)</li>
                        <li>V-222544: Audit timestamp format (CAT III)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Security Architecture</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Core APEX is designed with security as a foundational principle, following
                    zero-trust architecture patterns suitable for DoD environments.
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Security Controls</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-400 mb-3">Data Protection</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>TLS 1.3 for all communications</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>AES-256 encryption at rest</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>No sensitive data in logs</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>Secrets in environment variables</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400 mb-3">Access Control</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>Role-based access control (RBAC)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>Session management with timeouts</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>Audit logging for all actions</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                          <span>API key authentication</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">AI Security Considerations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-indigo-400">Prompt Injection Prevention</h4>
                      <p className="text-sm text-gray-300">Input sanitization and structured prompt templates prevent malicious prompt manipulation.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400">Output Validation</h4>
                      <p className="text-sm text-gray-300">All AI outputs are validated and sanitized before storage or display.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400">Human Review Gate</h4>
                      <p className="text-sm text-gray-300">Critical outputs require human approval before execution or deployment.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-400">API Security</h4>
                      <p className="text-sm text-gray-300">Anthropic API keys are stored securely and never exposed to clients.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">GovCloud Readiness</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    The current MVP runs on commercial AWS. The architecture is designed for
                    straightforward migration to AWS GovCloud:
                  </p>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>All services use GovCloud-available equivalents</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>No dependencies on commercial-only features</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>Infrastructure as Code for reproducible deployment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>FedRAMP High baseline alignment</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400 gap-2">
            <p>Progredi AI - Core APEX Technical Documentation</p>
            <p>Confidential - Navy-AIAT Phase 2 Evaluation</p>
          </div>
          <div className="text-center text-xs text-gray-500 mt-3 pt-3 border-t border-gray-700">
            <p>&copy; 2025 Progredi Systems, LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
