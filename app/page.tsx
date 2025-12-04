'use client';

import { useState } from 'react';
import {
  TestTube2,
  FileText,
  Code,
  Play,
  BarChart3,
  Settings2,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Archive
} from 'lucide-react';
import APEXDemoWorkflow from '@/components/APEXDemoWorkflow';

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'idle' | 'running' | 'success' | 'error';
  capabilities: string[];
}

const agents: Agent[] = [
  {
    id: 'requirements',
    name: 'Requirements Agent',
    description: 'Parses requirements from JIRA, DOORS, and documents into testable assertions',
    icon: FileText,
    status: 'idle',
    capabilities: ['JIRA Integration', 'Document Parsing', 'Requirements Traceability', 'Ambiguity Detection']
  },
  {
    id: 'test-design',
    name: 'Test Design Agent',
    description: 'Generates comprehensive test scenarios and executable scripts',
    icon: Code,
    status: 'idle',
    capabilities: ['Test Case Generation', 'Script Creation', 'Coverage Analysis', 'DoD Standards']
  },
  {
    id: 'execution',
    name: 'Execution Agent',
    description: 'Orchestrates test execution across environments with parallel processing',
    icon: Play,
    status: 'idle',
    capabilities: ['Parallel Execution', 'CI/CD Integration', 'Log Capture', 'Real-time Results']
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    description: 'Identifies patterns and predicts defects with AI-powered insights',
    icon: BarChart3,
    status: 'idle',
    capabilities: ['Root Cause Analysis', 'Predictive Analytics', 'Impact Scoring', 'Trend Detection']
  },
  {
    id: 'maintenance',
    name: 'Maintenance Agent',
    description: 'Keeps test suites synchronized with code changes automatically',
    icon: Settings2,
    status: 'idle',
    capabilities: ['Git Monitoring', 'Auto-Update', 'Version Control', 'Change Impact']
  },
  {
    id: 'compliance',
    name: 'Compliance Agent',
    description: 'Ensures Section 508 and DoD compliance standards are met',
    icon: Shield,
    status: 'idle',
    capabilities: ['Section 508', 'DISA STIGs', 'RMF Documentation', 'Audit Trails']
  }
];

export default function CoreAPEXPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'demo' | 'metrics' | 'vault'>('overview');
  const [demoStatus, setDemoStatus] = useState<'idle' | 'running' | 'complete'>('idle');

  const runDemo = async () => {
    setDemoStatus('running');
    setActiveTab('demo');

    // Simulate demo workflow
    setTimeout(() => {
      setDemoStatus('complete');
    }, 3000);
  };

  const metrics = {
    testReduction: 90,
    defectDetection: 75,
    automationCoverage: 95,
    timeSaved: 240, // hours per sprint
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <TestTube2 className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Core APEX</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Automated Performance & Evaluation eXpert</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Navy-AIAT Phase 2 MVP</span>
              <button
                onClick={runDemo}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Run Demo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'agents', 'demo', 'metrics', 'vault'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Value Proposition */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Transform Navy Testing with AI-Powered Automation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Core APEX solves PEO MLB's critical testing bottleneck by automating the entire test lifecycle.
                Teams currently spend 60-70% of their time writing test scripts - we reduce that to minutes.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Reduction in test development time</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Predictive accuracy for defects</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$2M+</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Annual cost savings</div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Natural Language Requirements</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Import from JIRA, DOORS, Word docs, and generate tests automatically
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Autonomous Maintenance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tests adapt automatically when code changes via Git monitoring
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">FedRAMP Compliant</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Designed for FedRAMP Moderate with IL4 support for CUI systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Human-in-the-Loop</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All AI outputs require review and approval before execution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <agent.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.status === 'success' ? 'bg-green-100 text-green-700' :
                    agent.status === 'running' ? 'bg-blue-100 text-blue-700' :
                    agent.status === 'error' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {agent.status}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{agent.description}</p>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.slice(0, 2).map((cap) => (
                    <span key={cap} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {cap}
                    </span>
                  ))}
                  {agent.capabilities.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      +{agent.capabilities.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'demo' && (
          <div className="space-y-6">
            {/* Use the new comprehensive demo workflow component */}
            <APEXDemoWorkflow />
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* ROI Dashboard */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Performance Metrics & ROI
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Time Savings Chart */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Time Savings per Sprint</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Manual Testing</span>
                      <span className="text-sm font-semibold">400 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{width: '100%'}}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">With Core APEX</span>
                      <span className="text-sm font-semibold">40 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '10%'}}></div>
                    </div>

                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{metrics.timeSaved} hours saved</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Per 2-week sprint</div>
                    </div>
                  </div>
                </div>

                {/* Coverage Stats */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Test Coverage & Quality</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Automation Coverage</span>
                        <span className="text-sm font-semibold">{metrics.automationCoverage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{width: `${metrics.automationCoverage}%`}}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Defect Detection Rate</span>
                        <span className="text-sm font-semibold">{metrics.defectDetection}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{width: `${metrics.defectDetection}%`}}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Test Development Reduction</span>
                        <span className="text-sm font-semibold">{metrics.testReduction}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{width: `${metrics.testReduction}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                12-Month Implementation Roadmap
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24 text-sm text-gray-500">Months 1-3</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">Phase 1: Pilot Program</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deploy to AWS GovCloud, JIRA integration, 100+ automated tests
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24 text-sm text-gray-500">Months 4-6</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">Phase 2: Expansion</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Scale to 5 applications, DOORS integration, predictive analytics
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24 text-sm text-gray-500">Months 7-12</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">Phase 3: Enterprise</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      FedRAMP ATO, IL4 deployment, 20+ applications, $2M+ savings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vault Tab */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Archive className="h-6 w-6 text-blue-600 mr-2" />
                    Core Vault Integration
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Test reports are automatically saved to Core Vault for version control and collaboration
                  </p>
                </div>
                <a
                  href="/vault"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View All Reports
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Archive className="h-8 w-8 text-indigo-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Latest Test Report</h4>
                      <p className="text-sm text-gray-500">Saved 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Requirements Tested</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pass Rate</span>
                      <span className="font-semibold text-green-600">94%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Compliance Score</span>
                      <span className="font-semibold text-green-600">98%</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href="https://corevault.progrediai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View in Core Vault →
                    </a>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    How It Works
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <span>Core APEX generates comprehensive test reports after each run</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <span>Reports are automatically saved to Core Vault with version control</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <span>Teams can access, share, and collaborate on results</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <span>Historical data enables trend analysis and improvements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <selectedAgent.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedAgent.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAgent.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.capabilities.map((cap) => (
                    <span key={cap} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Integration Points</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>REST API endpoints for external systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Webhook support for real-time updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Human review interface for approvals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}