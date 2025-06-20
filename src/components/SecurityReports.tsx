import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Filter, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const SecurityReports = () => {
  const [selectedReport, setSelectedReport] = useState('summary');

  const reports = [
    {
      id: 'summary',
      title: 'Executive Summary',
      date: '2024-01-15',
      type: 'Summary',
      status: 'Complete',
      description: 'High-level overview of security posture and key findings'
    },
    {
      id: 'vulnerability',
      title: 'Vulnerability Assessment',
      date: '2024-01-15',
      type: 'Technical',
      status: 'Complete',
      description: 'Detailed analysis of discovered vulnerabilities and remediation steps'
    },
    {
      id: 'compliance',
      title: 'Compliance Report',
      date: '2024-01-14',
      type: 'Compliance',
      status: 'Complete',
      description: 'Assessment against industry standards (ISO 27001, NIST, SOC 2)'
    },
    {
      id: 'incident',
      title: 'Incident Response Report',
      date: '2024-01-13',
      type: 'Incident',
      status: 'Draft',
      description: 'Analysis of security incidents and response effectiveness'
    },
    {
      id: 'risk',
      title: 'Risk Assessment',
      date: '2024-01-12',
      type: 'Risk',
      status: 'Complete',
      description: 'Comprehensive risk analysis and mitigation strategies'
    }
  ];

  const executiveSummary = {
    overallScore: 87,
    trend: 'up',
    change: '+5%',
    keyFindings: [
      { title: 'Critical Vulnerabilities', value: 2, status: 'high', change: '-1' },
      { title: 'Security Controls', value: 47, status: 'good', change: '+3' },
      { title: 'Compliance Score', value: 94, status: 'excellent', change: '+2%' },
      { title: 'Incident Response Time', value: '4.2 min', status: 'good', change: '-0.8' }
    ],
    riskDistribution: [
      { level: 'Critical', count: 2, percentage: 8 },
      { level: 'High', count: 7, percentage: 28 },
      { level: 'Medium', count: 12, percentage: 48 },
      { level: 'Low', count: 4, percentage: 16 }
    ],
    recommendations: [
      'Implement multi-factor authentication across all systems',
      'Update vulnerability management process to include automated patching',
      'Enhance network segmentation for critical infrastructure',
      'Conduct security awareness training for all employees',
      'Deploy advanced threat detection solutions'
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete': return 'bg-green-600 text-white';
      case 'draft': return 'bg-yellow-600 text-white';
      case 'pending': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Security Reports</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors duration-200">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Report List */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Available Reports</h3>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm sm:text-base">{report.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{report.date}</span>
                    </span>
                    <span className="bg-gray-700 px-2 py-1 rounded">{report.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {selectedReport === 'summary' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Overall Security Score */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Overall Security Score</h3>
                  <div className="flex items-center space-x-2">
                    {executiveSummary.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                    )}
                    <span className={`text-sm ${executiveSummary.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {executiveSummary.change}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-4xl sm:text-6xl font-bold ${getScoreColor(executiveSummary.overallScore)} mb-2`}>
                    {executiveSummary.overallScore}
                  </div>
                  <div className="text-gray-400 text-sm sm:text-base">Security Posture Score</div>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Key Findings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {executiveSummary.keyFindings.map((finding, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white text-sm sm:text-base">{finding.title}</h4>
                        <span className="text-sm text-gray-400">{finding.change}</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{finding.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Distribution */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  {executiveSummary.riskDistribution.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${getRiskColor(risk.level)}`}></div>
                        <span className="text-white font-medium text-sm sm:text-base">{risk.level}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getRiskColor(risk.level)}`}
                            style={{ width: `${risk.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm w-6 sm:w-8">{risk.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-400" />
                  Priority Recommendations
                </h3>
                <div className="space-y-3">
                  {executiveSummary.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedReport !== 'summary' && (
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
              <div className="text-center py-8 sm:py-12">
                <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Report Preview</h3>
                <p className="text-gray-400 mb-6 text-sm sm:text-base px-4">
                  {reports.find(r => r.id === selectedReport)?.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 rounded-lg flex items-center space-x-2 text-white transition-colors duration-200 w-full sm:w-auto justify-center">
                    <Eye className="h-4 w-4" />
                    <span>View Full Report</span>
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-2 rounded-lg flex items-center space-x-2 text-white transition-colors duration-200 w-full sm:w-auto justify-center">
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityReports;