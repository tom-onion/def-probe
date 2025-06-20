import React, { useState, useEffect } from 'react';
import { Wifi, Activity, AlertTriangle, Eye, Filter, Download, RefreshCw } from 'lucide-react';

const NetworkAnalysis = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [networkData, setNetworkData] = useState({
    totalPackets: 15847,
    anomalies: 23,
    suspiciousIPs: 7,
    blockedConnections: 156
  });

  const [trafficData, setTrafficData] = useState([
    { time: '00:00', inbound: 23, outbound: 18, threats: 2 },
    { time: '00:05', inbound: 35, outbound: 28, threats: 1 },
    { time: '00:10', inbound: 42, outbound: 33, threats: 0 },
    { time: '00:15', inbound: 38, outbound: 29, threats: 3 },
    { time: '00:20', inbound: 51, outbound: 41, threats: 1 },
    { time: '00:25', inbound: 47, outbound: 35, threats: 2 },
  ]);

  const [detectedThreats, setDetectedThreats] = useState([
    {
      id: 1,
      ip: '192.168.1.142',
      type: 'Port Scan',
      severity: 'High',
      time: '2024-01-15 14:23:15',
      blocked: true,
      details: 'Systematic port scanning detected from external IP'
    },
    {
      id: 2,
      ip: '10.0.0.87',
      type: 'DDoS Attempt',
      severity: 'Critical',
      time: '2024-01-15 14:18:42',
      blocked: true,
      details: 'High volume of requests detected, possible DDoS attack'
    },
    {
      id: 3,
      ip: '172.16.0.23',
      type: 'Malware Communication',
      severity: 'Medium',
      time: '2024-01-15 14:15:30',
      blocked: false,
      details: 'Suspicious outbound communication pattern detected'
    },
    {
      id: 4,
      ip: '203.0.113.45',
      type: 'SQL Injection',
      severity: 'High',
      time: '2024-01-15 14:12:18',
      blocked: true,
      details: 'Malicious SQL injection attempt in HTTP requests'
    }
  ]);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setNetworkData(prev => ({
        ...prev,
        totalPackets: prev.totalPackets + Math.floor(Math.random() * 1000),
        anomalies: prev.anomalies + Math.floor(Math.random() * 5)
      }));
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const stats = [
    { title: 'Total Packets', value: networkData.totalPackets.toLocaleString(), icon: Activity, color: 'text-blue-400' },
    { title: 'Anomalies Detected', value: networkData.anomalies, icon: AlertTriangle, color: 'text-red-400' },
    { title: 'Suspicious IPs', value: networkData.suspiciousIPs, icon: Eye, color: 'text-yellow-400' },
    { title: 'Blocked Connections', value: networkData.blockedConnections, icon: Wifi, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Network Traffic Analysis</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={startScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                <span className="text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Traffic Chart */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Real-time Traffic Monitor</h3>
        <div className="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2 overflow-x-auto">
          {trafficData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1 min-w-0">
              <div className="w-full flex flex-col items-center space-y-1">
                <div 
                  className="w-6 sm:w-8 bg-blue-500 rounded-t"
                  style={{ height: `${Math.max(data.inbound * 2, 10)}px` }}
                  title={`Inbound: ${data.inbound} MB/s`}
                ></div>
                <div 
                  className="w-6 sm:w-8 bg-green-500 rounded-t"
                  style={{ height: `${Math.max(data.outbound * 2, 10)}px` }}
                  title={`Outbound: ${data.outbound} MB/s`}
                ></div>
                {data.threats > 0 && (
                  <div 
                    className="w-6 sm:w-8 bg-red-500 rounded-t"
                    style={{ height: `${Math.max(data.threats * 10, 5)}px` }}
                    title={`Threats: ${data.threats}`}
                  ></div>
                )}
              </div>
              <span className="text-xs text-gray-400 truncate">{data.time}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-400">Inbound</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-400">Outbound</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-400">Threats</span>
          </div>
        </div>
      </div>

      {/* Detected Threats */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Detected Threats</h3>
          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg flex items-center justify-center space-x-2 text-white text-sm transition-colors duration-200 w-fit">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 sm:px-4 text-gray-400 font-medium text-sm">IP Address</th>
                <th className="text-left py-3 px-2 sm:px-4 text-gray-400 font-medium text-sm">Threat Type</th>
                <th className="text-left py-3 px-2 sm:px-4 text-gray-400 font-medium text-sm">Severity</th>
                <th className="text-left py-3 px-2 sm:px-4 text-gray-400 font-medium text-sm hidden sm:table-cell">Time</th>
                <th className="text-left py-3 px-2 sm:px-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 text-gray-400 font-medium text-sm hidden lg:table-cell">Details</th>
              </tr>
            </thead>
            <tbody>
              {detectedThreats.map((threat) => (
                <tr key={threat.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-2 sm:px-4 text-white font-mono text-xs sm:text-sm">{threat.ip}</td>
                  <td className="py-3 px-2 sm:px-4 text-white text-sm">{threat.type}</td>
                  <td className="py-3 px-2 sm:px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm hidden sm:table-cell">{threat.time}</td>
                  <td className="py-3 px-2 sm:px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      threat.blocked ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {threat.blocked ? 'Blocked' : 'Monitoring'}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-400 text-sm max-w-xs truncate hidden lg:table-cell">{threat.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NetworkAnalysis;