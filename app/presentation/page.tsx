'use client';

import { useState, useEffect } from 'react';
import {
  TestTube2,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Award,
  BarChart3,
  Globe,
  Cpu,
  GitBranch
} from 'lucide-react';

export default function APEXPresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateMetrics, setAnimateMetrics] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateMetrics(true), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slides = [
    'problem',
    'solution',
    'architecture',
    'demo',
    'roi',
    'timeline',
    'team'
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setAnimateMetrics(false);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setAnimateMetrics(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TestTube2 className="h-8 w-8 text-indigo-400" />
            <div>
              <h1 className="text-xl font-bold">Core APEX</h1>
              <p className="text-xs text-gray-400">Navy-AIAT Phase 2 Presentation</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 disabled:opacity-50"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Slide 1: The Problem */}
          {currentSlide === 0 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The Critical Problem
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="text-7xl font-bold text-red-400 mb-4">60-70%</div>
                  <p className="text-2xl text-gray-300 mb-6">
                    of testing time spent writing and maintaining scripts
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">Manual Script Creation</h4>
                        <p className="text-gray-400">400+ hours per sprint for comprehensive test coverage</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">Constant Maintenance</h4>
                        <p className="text-gray-400">Tests break with every code change</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">Late Defect Discovery</h4>
                        <p className="text-gray-400">Critical bugs found in production</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20"></div>
                    <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
                      <h3 className="text-2xl font-bold mb-4">PEO MLB Impact</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Annual Testing Cost</span>
                          <span className="font-bold text-red-400">$12M+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deployment Delays</span>
                          <span className="font-bold text-orange-400">3-6 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Mission Readiness Risk</span>
                          <span className="font-bold text-red-500">HIGH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-xl text-center">
                  "Testing bottlenecks are directly impacting Navy operational readiness and modernization efforts"
                </p>
              </div>
            </div>
          )}

          {/* Slide 2: The Solution */}
          {currentSlide === 1 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Core APEX: The Solution
              </h2>

              <div className="text-center mb-12">
                <p className="text-3xl text-gray-300">
                  AI-Powered Automated Testing that transforms requirements into executed tests in minutes
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className={`bg-gradient-to-br from-green-500/20 to-green-600/10 p-8 rounded-2xl border border-green-500/30 transform transition-all duration-700 ${
                  animateMetrics ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="text-5xl font-bold text-green-400 mb-4">90%</div>
                  <h3 className="text-xl font-semibold mb-2">Test Development Reduction</h3>
                  <p className="text-gray-400">From 400 hours to 40 hours per sprint</p>
                </div>

                <div className={`bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-8 rounded-2xl border border-blue-500/30 transform transition-all duration-700 delay-100 ${
                  animateMetrics ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="text-5xl font-bold text-blue-400 mb-4">75%</div>
                  <h3 className="text-xl font-semibold mb-2">Defect Prediction Accuracy</h3>
                  <p className="text-gray-400">AI identifies issues before production</p>
                </div>

                <div className={`bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-8 rounded-2xl border border-purple-500/30 transform transition-all duration-700 delay-200 ${
                  animateMetrics ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="text-5xl font-bold text-purple-400 mb-4">$2M+</div>
                  <h3 className="text-xl font-semibold mb-2">Annual Savings</h3>
                  <p className="text-gray-400">Direct cost reduction in Year 1</p>
                </div>
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Natural Language to Tests</h4>
                    <p className="text-gray-400">Import requirements from JIRA, DOORS, or documents and automatically generate comprehensive test suites</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Self-Maintaining Tests</h4>
                    <p className="text-gray-400">Monitors Git for code changes and automatically updates affected test scripts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: Architecture */}
          {currentSlide === 2 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Six Specialized AI Agents
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Globe,
                    name: 'Requirements Agent',
                    color: 'blue',
                    tasks: ['Parse JIRA/DOORS', 'Extract from documents', 'Create traceability matrix']
                  },
                  {
                    icon: Cpu,
                    name: 'Test Design Agent',
                    color: 'green',
                    tasks: ['Generate test cases', 'Create scripts (Python/C#/JS)', 'Coverage analysis']
                  },
                  {
                    icon: Zap,
                    name: 'Execution Agent',
                    color: 'orange',
                    tasks: ['Parallel execution', 'CI/CD integration', 'Real-time results']
                  },
                  {
                    icon: BarChart3,
                    name: 'Analysis Agent',
                    color: 'purple',
                    tasks: ['Predictive analytics', 'Root cause analysis', 'Defect clustering']
                  },
                  {
                    icon: GitBranch,
                    name: 'Maintenance Agent',
                    color: 'yellow',
                    tasks: ['Git monitoring', 'Auto-update tests', 'Impact analysis']
                  },
                  {
                    icon: Shield,
                    name: 'Compliance Agent',
                    color: 'red',
                    tasks: ['Section 508', 'DISA STIGs', 'RMF documentation']
                  }
                ].map((agent, index) => (
                  <div
                    key={agent.name}
                    className={`bg-black/30 backdrop-blur-xl rounded-xl p-6 border transform transition-all duration-700 ${
                      animateMetrics ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{
                      borderColor: `rgb(${agent.color === 'blue' ? '59, 130, 246' :
                                         agent.color === 'green' ? '34, 197, 94' :
                                         agent.color === 'orange' ? '251, 146, 60' :
                                         agent.color === 'purple' ? '168, 85, 247' :
                                         agent.color === 'yellow' ? '250, 204, 21' : '239, 68, 68'} / 0.5)`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <agent.icon className={`h-8 w-8 text-${agent.color}-400`} />
                      <h3 className="text-lg font-semibold">{agent.name}</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      {agent.tasks.map(task => (
                        <li key={task} className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 bg-${agent.color}-400 rounded-full mt-1.5`}></div>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400">Claude Sonnet 4.0</div>
                    <p className="text-gray-400">Powered by Anthropic AI</p>
                  </div>
                  <div className="text-2xl">+</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400">AWS GovCloud</div>
                    <p className="text-gray-400">FedRAMP Compliant</p>
                  </div>
                  <div className="text-2xl">+</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400">Human-in-the-Loop</div>
                    <p className="text-gray-400">All outputs reviewed</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 4: Live Demo */}
          {currentSlide === 3 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Live Demo: See It In Action
              </h2>

              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/30">
                <div className="text-center mb-8">
                  <p className="text-2xl text-gray-300 mb-4">
                    Watch Core APEX transform 47 requirements into 127 executed tests in under 5 minutes
                  </p>
                  <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition transform hover:scale-105 flex items-center space-x-3 mx-auto">
                    <Zap className="h-6 w-6" />
                    <span>Launch Live Demo</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: '1', title: 'Import Requirements', time: '15 sec', detail: 'From JIRA epic MLB-2024-15' },
                    { step: '2', title: 'Generate Tests', time: '45 sec', detail: '127 comprehensive test cases' },
                    { step: '3', title: 'Execute Suite', time: '3 min', detail: 'Parallel execution in containers' },
                    { step: '4', title: 'Analyze Results', time: '30 sec', detail: 'Defect prediction & insights' }
                  ].map((item, index) => (
                    <div
                      key={item.step}
                      className={`text-center transform transition-all duration-700 ${
                        animateMetrics ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                        {item.step}
                      </div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-yellow-400 mb-1">{item.time}</p>
                      <p className="text-xs text-gray-400">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">94%</div>
                    <p className="text-sm text-gray-400">Tests Passed</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-400">8</div>
                    <p className="text-sm text-gray-400">Defects Found</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">360h</div>
                    <p className="text-sm text-gray-400">Time Saved</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 5: ROI */}
          {currentSlide === 4 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Return on Investment
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Year 1 Savings</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                      <span className="text-gray-400">Labor Cost Reduction</span>
                      <span className="text-2xl font-bold text-green-400">$1.8M</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                      <span className="text-gray-400">Defect Prevention Savings</span>
                      <span className="text-2xl font-bold text-green-400">$450K</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                      <span className="text-gray-400">Deployment Acceleration</span>
                      <span className="text-2xl font-bold text-green-400">$350K</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                      <span className="text-xl font-semibold">Total Year 1 Savings</span>
                      <span className="text-3xl font-bold text-green-400">$2.6M</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Implementation Cost</span>
                      <span className="text-xl text-blue-400">$650K</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-500/30">
                      <span className="font-semibold">Net Savings Year 1</span>
                      <span className="text-2xl font-bold text-green-400">$1.95M</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6">Operational Impact</h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Test Coverage</span>
                        <span className="text-green-400">95%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Defect Detection Rate</span>
                        <span className="text-blue-400">75%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Deployment Speed</span>
                        <span className="text-purple-400">3x Faster</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                    <h4 className="text-xl font-semibold mb-3">5-Year Projection</h4>
                    <div className="text-4xl font-bold text-green-400 mb-2">$15M+</div>
                    <p className="text-gray-400">Cumulative savings with enterprise-wide adoption</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6: Implementation Timeline */}
          {currentSlide === 5 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                12-Month Implementation Roadmap
              </h2>

              <div className="space-y-6">
                {[
                  {
                    phase: 'Phase 1: Pilot Program',
                    months: 'Months 1-3',
                    color: 'blue',
                    deliverables: [
                      'Deploy to AWS GovCloud',
                      'JIRA & Azure DevOps integration',
                      '100+ automated tests for pilot application',
                      'Requirements & Test Design agents operational'
                    ],
                    milestone: '70% reduction in test development time'
                  },
                  {
                    phase: 'Phase 2: Expansion',
                    months: 'Months 4-6',
                    color: 'purple',
                    deliverables: [
                      'Scale to 5 applications',
                      'DOORS & CAMEO integration',
                      'Analysis & Maintenance agents deployed',
                      'Power BI dashboards'
                    ],
                    milestone: '1000+ tests under automation'
                  },
                  {
                    phase: 'Phase 3: Enterprise',
                    months: 'Months 7-12',
                    color: 'green',
                    deliverables: [
                      'FedRAMP Moderate ATO',
                      'IL4 deployment for CUI',
                      '20+ applications',
                      '24/7 production support'
                    ],
                    milestone: '$2M+ verified annual savings'
                  }
                ].map((phase, index) => (
                  <div
                    key={phase.phase}
                    className={`bg-black/30 backdrop-blur-xl rounded-xl p-6 border transform transition-all duration-700 ${
                      animateMetrics ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}
                    style={{
                      borderColor: phase.color === 'blue' ? 'rgb(59, 130, 246, 0.5)' :
                                   phase.color === 'purple' ? 'rgb(168, 85, 247, 0.5)' :
                                   'rgb(34, 197, 94, 0.5)',
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{phase.phase}</h3>
                        <p className={`text-${phase.color}-400`}>{phase.months}</p>
                      </div>
                      <Target className={`h-8 w-8 text-${phase.color}-400`} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {phase.deliverables.map(item => (
                        <div key={item} className="flex items-start space-x-2">
                          <CheckCircle className={`h-4 w-4 text-${phase.color}-400 flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className={`p-3 bg-${phase.color}-500/10 border border-${phase.color}-500/30 rounded-lg`}>
                      <div className="flex items-center space-x-2">
                        <Award className={`h-5 w-5 text-${phase.color}-400`} />
                        <span className="text-sm font-semibold">{phase.milestone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-xl text-gray-300">
                  Parallel operation with existing processes ensures zero disruption to ongoing missions
                </p>
              </div>
            </div>
          )}

          {/* Slide 7: Team & Call to Action */}
          {currentSlide === 6 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Progredi AI?
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
                  <Users className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">AI-First company with Expert Team</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Former DoD software engineers</li>
                    <li>• AI/ML specialists from top tech</li>
                    <li>• Navy acquisition experts</li>
                    <li>• FedRAMP compliance specialists</li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
                  <Shield className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Mission-First Design</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Built for DoD from day one</li>
                    <li>• FedRAMP Moderate ready</li>
                    <li>• IL4 architecture</li>
                    <li>• Human-in-the-loop governance</li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
                  <Award className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Proven Success</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Phase 1 winner</li>
                    <li>• Enterprise Core Platform</li>
                    <li>• Government partnerships</li>
                    <li>• Clear ROI demonstration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Navy Testing?</h3>
                <p className="text-xl mb-8 text-gray-200">
                  Let's partner to accelerate PEO MLB's mission and drive efficiency in the process
                </p>

                <div className="flex items-center justify-center space-x-6">
                  <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105">
                    Schedule Follow-Up
                  </button>
                  <button className="px-8 py-4 bg-black/30 backdrop-blur-xl rounded-xl font-bold border border-white/30 hover:bg-black/40 transition">
                    View Technical Docs
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-8 text-sm">
                  <div>
                    <span className="text-gray-300">Contact:</span>
                    <span className="ml-2 font-semibold">info@progrediai.com</span>
                  </div>
                  <div>
                    <span className="text-gray-300">CAGE Code:</span>
                    <span className="ml-2 font-semibold"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Slide Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="fixed bottom-6 right-6 text-sm text-gray-500">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
}