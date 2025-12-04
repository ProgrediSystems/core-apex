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

  // Sample reports saved to Core Vault
  const reports: TestReport[] = [
    {
      id: 'RPT-2024-001',
      name: 'MLB-2024 Authentication Suite',
      project: 'PEO MLB',
      date: '2024-12-03T10:30:00Z',
      requirements: 47,
      tests: 127,
      passRate: 94,
      compliance: 98,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2024-001'
    },
    {
      id: 'RPT-2024-002',
      name: 'Performance Testing Suite',
      project: 'PEO MLB',
      date: '2024-12-02T14:15:00Z',
      requirements: 23,
      tests: 89,
      passRate: 88,
      compliance: 95,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2024-002'
    },
    {
      id: 'RPT-2024-003',
      name: 'Section 508 Compliance Tests',
      project: 'PEO MLB',
      date: '2024-12-01T09:45:00Z',
      requirements: 15,
      tests: 42,
      passRate: 100,
      compliance: 100,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2024-003'
    },
    {
      id: 'RPT-2024-004',
      name: 'Data Encryption Standards',
      project: 'PEO MLB',
      date: '2024-11-30T16:20:00Z',
      requirements: 31,
      tests: 78,
      passRate: 91,
      compliance: 96,
      status: 'completed',
      savedBy: 'Core APEX',
      vaultUrl: 'https://corevault.progrediai.com/artifacts/apex-rpt-2024-004'
    },
    {
      id: 'RPT-2024-005',
      name: 'Concurrent User Testing',
      project: 'PEO MLB',
      date: '2024-11-29T11:00:00Z',
      requirements: 18,
      tests: 56,
      passRate: 82,
      compliance: 90,
      status: 'in-progress',
      savedBy: 'Core APEX'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Archive className="h-10 w-10 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Core Vault Integration
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
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Archive className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How Core Vault Integration Works
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
    </div>
  );
}