import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, Eye, Server, Globe, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalScans: 1247,
    vulnerabilities: 23,
    activeThreats: 3,
    securityScore: 87,
    networkTraffic: 2.3,
    blockedAttacks: 156
  });

  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, type: 'critical', message: 'Suspicious login attempt from 192.168.1.100', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High network traffic detected on port 443', time: '5 min ago' },
    { id: 3, type: 'info', message: 'Vulnerability scan completed successfully', time: '15 min ago' },
    { id: 4, type: 'critical', message: 'Failed authentication attempts exceeded threshold', time: '23 min ago' }
  ]);

  const stats = [
    {
      title: 'Security Score',
      value: metrics.securityScore,
      unit: '%',
      icon: Shield,
      color: 'bg-green-500',
      trend: 'up',
      change: '+5%'
    },
    {
      title: 'Active Threats',
      value: metrics.activeThreats,
      unit: '',
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: 'down',
      change: '-2'
    },
    {
      title: 'Network Traffic',
      value: metrics.networkTraffic,
      unit: 'GB/s',
      icon: Activity,
      color: 'bg-blue-500',
      trend: 'up',
      change: '+12%'
    },
    {
      title: 'Blocked Attacks',
      value: metrics.blockedAttacks,
      unit: '',
      icon: Eye,
      color: 'bg-yellow-500',
      trend: 'up',
      change: '+8'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        networkTraffic: +(Math.random() * 5).toFixed(1),
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        securityScore: Math.max(75, Math.min(95, prev.securityScore + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Security Dashboard</h2>
        <div className="flex items-center space-x-2 bg-gray-800 px-3 sm:px-4 py-2 rounded-lg w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Live Monitoring</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{stat.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-xs sm:text-sm">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {stat.value}{stat.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Alerts */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-500" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 sm:p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)} transition-all duration-200 hover:bg-opacity-20`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 sm:space-x-3 flex-1">
                    <span className="text-base sm:text-lg flex-shrink-0">{getAlertIcon(alert.type)}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium break-words">{alert.message}</p>
                      <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
            <Server className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
            System Status
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { name: 'Network Scanner', status: 'active', uptime: '99.9%' },
              { name: 'Vulnerability DB', status: 'active', uptime: '100%' },
              { name: 'Threat Detection', status: 'active', uptime: '98.7%' },
              { name: 'Report Generator', status: 'maintenance', uptime: '95.2%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    service.status === 'active' ? 'bg-green-500' : 
                    service.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-white font-medium text-sm sm:text-base truncate">{service.name}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-gray-400 text-xs sm:text-sm">Uptime: {service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { title: 'Run Full Scan', description: 'Complete security audit', icon: Shield, color: 'bg-blue-600 hover:bg-blue-700' },
            { title: 'Generate Report', description: 'Export security findings', icon: Globe, color: 'bg-green-600 hover:bg-green-700' },
            { title: 'Update Signatures', description: 'Refresh threat database', icon: Server, color: 'bg-purple-600 hover:bg-purple-700' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`${action.color} p-3 sm:p-4 rounded-lg text-white transition-all duration-200 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-semibold text-sm sm:text-base">{action.title}</p>
                    <p className="text-xs sm:text-sm opacity-90 truncate">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;