'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  GitBranch,
  Mail,
  ChevronLeft,
  ChevronRight,
  Play,
  AlertTriangle
} from 'lucide-react';

export default function APEXPresentationPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateMetrics, setAnimateMetrics] = useState(false);

  const slides = [
    'title',
    'problem',
    'solution',
    'architecture',
    'demo',
    'roi',
    'timeline',
    'team'
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimateMetrics(true), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setAnimateMetrics(false);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setAnimateMetrics(false);
    }
  }, [currentSlide]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  const handleLiveDemo = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Progredi AI Logo */}
            <img
              src="/progredi-logo-white.png"
              alt="Progredi AI"
              className="h-8"
              onError={(e) => {
                // Fallback if logo doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex items-center space-x-3">
              <TestTube2 className="h-8 w-8 text-indigo-400" />
              <div>
                <h1 className="text-xl font-bold">Core APEX</h1>
                <p className="text-xs text-gray-400">Navy-AIAT Phase 2 • CAGE: 10X15</p>
              </div>
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
                className="p-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="p-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Slide 0: Title */}
          {currentSlide === 0 && (
            <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
              <div className="mb-8">
                <TestTube2 className="h-24 w-24 text-indigo-400 mx-auto mb-6" />
                <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Core APEX
                </h1>
                <p className="text-3xl text-gray-300 mb-2">
                  Automated Performance & Evaluation eXpert
                </p>
                <p className="text-xl text-gray-400">
                  Transforming Navy Testing with AI-Powered Automation
                </p>
              </div>

              <div className="border-t border-white/20 pt-8 mt-8">
                <p className="text-lg text-gray-300 mb-2">Navy-AIAT Prize Challenge • Phase 2</p>
                <p className="text-md text-gray-400">Progredi AI • CAGE Code: 10X15</p>
              </div>

              <div className="mt-12">
                <p className="text-sm text-indigo-300">
                  Press → arrow key or click next to continue
                </p>
              </div>
            </div>
          )}

          {/* Slide 1: The Problem */}
          {currentSlide === 1 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The Critical Problem
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                  <AlertTriangle className="h-8 w-8 text-red-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">PEO MLB Reality</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>60-70% of time spent writing test scripts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>400+ hours per sprint for coverage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Every code change breaks multiple tests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Critical defects still reach production</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                  <DollarSign className="h-8 w-8 text-orange-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Mission Impact</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Annual Cost</span>
                      <span className="text-2xl font-bold text-orange-400">$12M+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Deployment Delays</span>
                      <span className="text-2xl font-bold text-orange-400">3-6 months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Fleet Readiness Impact</span>
                      <span className="text-2xl font-bold text-red-400">CRITICAL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-white/10 rounded-xl p-6">
                <p className="text-xl text-center font-semibold">
                  "This isn't just inefficiency - it's a strategic vulnerability affecting our warfighters"
                </p>
              </div>
            </div>
          )}

          {/* Slide 2: The Solution */}
          {currentSlide === 2 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Core APEX: The Game Changer
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className={`bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-6 transform transition-all duration-500 ${animateMetrics ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                  <TrendingUp className="h-10 w-10 text-green-400 mb-4" />
                  <div className="text-4xl font-bold text-green-400 mb-2">90%</div>
                  <div className="text-lg font-semibold mb-2">Time Reduction</div>
                  <p className="text-sm text-gray-400">From 400 to 40 hours per sprint</p>
                </div>

                <div className={`bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 transform transition-all duration-700 ${animateMetrics ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                  <Target className="h-10 w-10 text-blue-400 mb-4" />
                  <div className="text-4xl font-bold text-blue-400 mb-2">75%</div>
                  <div className="text-lg font-semibold mb-2">Defect Prediction</div>
                  <p className="text-sm text-gray-400">AI predicts issues before they occur</p>
                </div>

                <div className={`bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 transform transition-all duration-900 ${animateMetrics ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                  <DollarSign className="h-10 w-10 text-purple-400 mb-4" />
                  <div className="text-4xl font-bold text-purple-400 mb-2">$2M+</div>
                  <div className="text-lg font-semibold mb-2">Year 1 Savings</div>
                  <p className="text-sm text-gray-400">Direct cost reduction guaranteed</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">How It Works</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-lg mb-2 text-gray-300">You Write:</p>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                      "System shall authenticate users with CAC cards within 3 seconds"
                    </div>
                  </div>
                  <div>
                    <p className="text-lg mb-2 text-gray-300">We Generate:</p>
                    <ul className="text-sm space-y-1 text-gray-400">
                      <li>✓ Positive test cases</li>
                      <li>✓ Negative test cases</li>
                      <li>✓ Edge cases & boundaries</li>
                      <li>✓ Performance tests</li>
                      <li>✓ Security validations</li>
                    </ul>
                  </div>
                </div>
                <p className="text-center mt-6 text-lg font-semibold text-indigo-300">
                  When code changes, tests automatically adapt - zero maintenance burden
                </p>
              </div>
            </div>
          )}

          {/* Slide 3: Architecture */}
          {currentSlide === 3 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Six Specialized AI Agents
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Requirements Agent',
                    icon: '📋',
                    description: 'Ingests from JIRA, DOORS, PDFs - identifies ambiguities'
                  },
                  {
                    name: 'Test Design Agent',
                    icon: '🧪',
                    description: 'Generates 5-10 test scenarios per requirement'
                  },
                  {
                    name: 'Execution Agent',
                    icon: '⚡',
                    description: 'Runs 500 tests in parallel with CI/CD integration'
                  },
                  {
                    name: 'Analysis Agent',
                    icon: '🔍',
                    description: '75% accuracy predicting defects before they occur'
                  },
                  {
                    name: 'Maintenance Agent',
                    icon: '🔧',
                    description: 'Auto-updates tests when code changes - saves 100+ hrs/month'
                  },
                  {
                    name: 'Compliance Agent',
                    icon: '✅',
                    description: 'Section 508, DISA STIGs, RMF docs automated'
                  }
                ].map((agent, index) => (
                  <div
                    key={agent.name}
                    className={`bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/30 rounded-xl p-6 transform transition-all ${animateMetrics ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="text-3xl mb-3">{agent.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                    <p className="text-sm text-gray-400">{agent.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Powered by Claude Sonnet 4.0</h3>
                    <p className="text-gray-300">AWS GovCloud • FedRAMP Ready • Human-in-the-Loop Governance</p>
                  </div>
                  <Shield className="h-12 w-12 text-indigo-400" />
                </div>
              </div>
            </div>
          )}

          {/* Slide 4: Live Demo */}
          {currentSlide === 4 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Live Demonstration
              </h2>

              <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/20 border border-indigo-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Watch Core APEX in Action</h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-indigo-300">What You'll See:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                        <span>Real JIRA requirements from MLB-2024 project</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                        <span>47 requirements → 127 test cases in seconds</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                        <span>Human review for critical test cases</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                        <span>Parallel execution achieving 94% pass rate</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                        <span>Compliance verification (Section 508, FIPS, STIGs)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                        <span>Reports saved to Core Vault for collaboration</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-indigo-300">Key Metrics:</h4>
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time to Generate Tests</span>
                          <span className="text-xl font-bold text-green-400">4.2 min</span>
                        </div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Requirement Coverage</span>
                          <span className="text-xl font-bold text-blue-400">95%</span>
                        </div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Compliance Score</span>
                          <span className="text-xl font-bold text-purple-400">98%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLiveDemo}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <Play className="h-6 w-6" />
                  <span className="text-xl">Launch Live Demo</span>
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  This is not a mockup - this is our working MVP running on AWS GovCloud
                </p>
              </div>
            </div>
          )}

          {/* Slide 5: ROI & Impact */}
          {currentSlide === 5 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Return on Investment
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Year 1 Impact</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Direct Cost Savings</span>
                      <span className="text-2xl font-bold text-green-400">$2.1M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Time to Market</span>
                      <span className="text-2xl font-bold text-blue-400">50% faster</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Defect Reduction</span>
                      <span className="text-2xl font-bold text-purple-400">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Test Coverage</span>
                      <span className="text-2xl font-bold text-indigo-400">95%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-blue-500/30 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Strategic Value</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <Award className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                      <span>Accelerate digital transformation across PEO MLB</span>
                    </li>
                    <li className="flex items-start">
                      <Globe className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                      <span>Enable rapid deployment to fleet operations</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                      <span>Improve mission readiness through quality</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-purple-400 mr-3 mt-0.5" />
                      <span>Upskill workforce to focus on innovation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6">
                <p className="text-xl text-center font-semibold">
                  "ROI positive in 4 months • Full payback in 11 months"
                </p>
              </div>
            </div>
          )}

          {/* Slide 6: Implementation Timeline */}
          {currentSlide === 6 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                12-Month Roadmap to Success
              </h2>

              <div className="space-y-6">
                {[
                  {
                    phase: 'Phase 1: Pilot',
                    months: 'Months 1-3',
                    description: 'Deploy to AWS GovCloud, JIRA integration, 100+ automated tests',
                    color: 'from-blue-600/20 to-indigo-600/20'
                  },
                  {
                    phase: 'Phase 2: Expansion',
                    months: 'Months 4-6',
                    description: 'Scale to 5 applications, DOORS integration, predictive analytics',
                    color: 'from-indigo-600/20 to-purple-600/20'
                  },
                  {
                    phase: 'Phase 3: Enterprise',
                    months: 'Months 7-9',
                    description: 'PEO-wide deployment, FedRAMP certification, custom AI training',
                    color: 'from-purple-600/20 to-pink-600/20'
                  },
                  {
                    phase: 'Phase 4: Full Operations',
                    months: 'Months 10-12',
                    description: '50+ systems, autonomous testing, continuous improvement',
                    color: 'from-pink-600/20 to-red-600/20'
                  }
                ].map((phase, index) => (
                  <div
                    key={phase.phase}
                    className={`bg-gradient-to-r ${phase.color} border border-white/10 rounded-xl p-6 transform transition-all ${animateMetrics ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{phase.phase}</h3>
                        <p className="text-gray-300 mb-1">{phase.description}</p>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">{phase.months}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6">
                <p className="text-xl text-center font-semibold text-green-300">
                  Zero disruption to existing operations • Gradual team onboarding • Continuous support
                </p>
              </div>
            </div>
          )}

          {/* Slide 7: Team & Call to Action */}
          {currentSlide === 7 && (
            <div className="min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Progredi AI?
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                  <Cpu className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">AI Expertise</h3>
                  <p className="text-sm text-gray-400">Pioneers in AI-powered defense solutions with proven DoD track record</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                  <Shield className="h-10 w-10 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Security First</h3>
                  <p className="text-sm text-gray-400">FedRAMP ready, IL4/5 capable, zero-trust architecture</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/30 to-teal-900/20 border border-green-500/30 rounded-xl p-6">
                  <Users className="h-10 w-10 text-green-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Navy Veterans</h3>
                  <p className="text-sm text-gray-400">Team includes former Navy officers who understand the mission</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8">
                <h3 className="text-3xl font-bold mb-6 text-center">Ready to Transform Navy Testing?</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <a
                    href="mailto:sales@progrediai.com?subject=Core%20APEX%20Demo%20Request&body=Hello%20Progredi%20AI%20Team,%0A%0AI'm%20interested%20in%20scheduling%20a%20demo%20of%20Core%20APEX%20for%20our%20Navy%20testing%20requirements.%0A%0AOrganization:%20%0AContact:%20%0APreferred%20Date/Time:%20%0A%0AThank%20you!"
                    className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/20 rounded-lg p-6 transition transform hover:scale-105 text-center"
                  >
                    <Mail className="h-8 w-8 mb-3 mx-auto" />
                    <p className="font-bold text-lg mb-1">Schedule Demo</p>
                    <p className="text-sm text-gray-300">sales@progrediai.com</p>
                  </a>

                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 text-center">
                    <Globe className="h-8 w-8 mb-3 mx-auto" />
                    <p className="font-bold text-lg mb-1">Learn More</p>
                    <p className="text-sm text-gray-300">progrediai.com</p>
                    <p className="text-xs text-gray-400 mt-2">CAGE: 10X15</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-2xl font-bold mb-2">Win Phase 2 → Deploy in 90 Days</p>
                  <p className="text-lg text-gray-200">Let's revolutionize Navy testing together</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation Hints */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg border-t border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Use ← → arrow keys to navigate
          </p>
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  currentSlide === index ? 'bg-indigo-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Progredi AI • CAGE: 10X15
          </p>
        </div>
      </footer>
    </div>
  );
}