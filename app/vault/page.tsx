'use client';

import { useState } from 'react';
import {
  Archive,
  FileText,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Shield,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import BrandingHeader from '@/components/BrandingHeader';
import BrandingFooter from '@/components/BrandingFooter';

interface TestReport {
  id: string;
  name: string;
  project: string;
  date: string;
  requirements: number;
  tests: number;
  passRate: number;
  compliance: number;
  status: 'completed' | 'in-progress' | 'failed';
  savedBy: string;
  vaultUrl?: string;
}

export default function VaultIntegration() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample reports saved to Core Vault - Including Amazon.com Phase 2 tests
  const reports: TestReport[] = [
    {
      id: 'RPT-2025-001',
      name: 'Amazon.com Add to Cart Test Suite',
      project: 'Phase 2 Demo',
      date: '2025-12-04T10:30:00Z',
      requirements: 5,
      tests: 32,
      passRate: 96,
      compliance: 98,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2025-001'
    },
    {
      id: 'RPT-2025-002',
      name: 'Amazon.com Login/Logout Security',
      project: 'Phase 2 Demo',
      date: '2025-12-04T09:15:00Z',
      requirements: 5,
      tests: 28,
      passRate: 100,
      compliance: 100,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2025-002'
    },
    {
      id: 'RPT-2025-003',
      name: 'Amazon.com Wishlist Management',
      project: 'Phase 2 Demo',
      date: '2025-12-03T14:45:00Z',
      requirements: 5,
      tests: 24,
      passRate: 92,
      compliance: 95,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2025-003'
    },
    {
      id: 'RPT-2025-004',
      name: 'Amazon.com Search Filters',
      project: 'Phase 2 Demo',
      date: '2025-12-03T11:20:00Z',
      requirements: 6,
      tests: 31,
      passRate: 88,
      compliance: 94,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2025-004'
    },
    {
      id: 'RPT-2025-005',
      name: 'Amazon.com Profile Management',
      project: 'Phase 2 Demo',
      date: '2025-12-02T16:00:00Z',
      requirements: 6,
      tests: 36,
      passRate: 94,
      compliance: 96,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2025-005'
    },
    {
      id: 'RPT-2025-006',
      name: 'Amazon.com Full Compliance Suite',
      project: 'Phase 2 Demo',
      date: '2025-12-01T13:00:00Z',
      requirements: 27,
      tests: 127,
      passRate: 94,
      compliance: 98,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2025-006'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-orange-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Progredi Branded Header */}
      <BrandingHeader darkMode={true} />

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-xl">
                <Archive className="h-12 w-12 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  Core Vault Integration
                  <span className="ml-3 text-sm px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full font-normal">
                    Powered by Core Vault
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Test reports automatically saved and versioned in Core Vault
                </p>
              </div>
            </div>
            <a
              href="https://corevault.progrediai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
            >
              <span>Open Core Vault</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => {
            const StatusIcon = getStatusIcon(report.status);
            const statusColor = getStatusColor(report.status);

            return (
              <div
                key={report.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="p-6">
                  {/* Report Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {report.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {report.id} • {report.project}
                      </p>
                    </div>
                    <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                  </div>

                  {/* Report Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <FileText className="h-4 w-4" />
                        <span>{report.requirements} Requirements</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{report.tests} Tests</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>{report.passRate}% Pass Rate</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <Shield className="h-4 w-4" />
                        <span>{report.compliance}% Compliant</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Footer */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                      <div className="flex space-x-2">
                        {report.vaultUrl && (
                          <a
                            href={report.vaultUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                          >
                            <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Download logic here
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                        >
                          <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <Archive className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                How Core Vault Integration Works
                <span className="ml-3 text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                  Seamless Integration
                </span>
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>After each test run, Core APEX automatically generates comprehensive reports</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Reports are saved to Core Vault with full version control and artifact management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Teams can access, share, and collaborate on test results through Core Vault</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Historical data enables trend analysis and continuous improvement</span>
                </li>
              </ul>
              <div className="mt-4 flex space-x-3">
                <a
                  href="https://corevault.progrediai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more about Core Vault →
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View API documentation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progredi Branded Footer */}
      <BrandingFooter />
    </div>
  );
}