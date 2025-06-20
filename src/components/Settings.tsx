import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Database, Wifi, Key, Save } from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      organizationName: 'SecureWatch Pro',
      timezone: 'UTC-5',
      language: 'English',
      theme: 'dark'
    },
    security: {
      autoScan: true,
      scanFrequency: 'daily',
      realTimeMonitoring: true,
      alertThreshold: 'medium',
      sessionTimeout: 30
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false,
      reportDelivery: 'weekly'
    },
    network: {
      scanPorts: '80,443,22,21,25',
      maxConcurrentScans: 10,
      networkRange: '192.168.1.0/24',
      excludedHosts: '192.168.1.1,192.168.1.2'
    }
  });

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Organization Name
        </label>
        <input
          type="text"
          value={settings.general.organizationName}
          onChange={(e) => handleSettingChange('general', 'organizationName', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Timezone
        </label>
        <select
          value={settings.general.timezone}
          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="UTC-5">UTC-5 (Eastern)</option>
          <option value="UTC-6">UTC-6 (Central)</option>
          <option value="UTC-7">UTC-7 (Mountain)</option>
          <option value="UTC-8">UTC-8 (Pacific)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Language
        </label>
        <select
          value={settings.general.language}
          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="English">English</option>
          <option value="Spanish">Español</option>
          <option value="French">Français</option>
          <option value="German">Deutsch</option>
        </select>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Automatic Scanning</h4>
          <p className="text-gray-400 text-sm">Enable automatic vulnerability scanning</p>
        </div>
        <button
          onClick={() => handleSettingChange('security', 'autoScan', !settings.security.autoScan)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            settings.security.autoScan ? 'bg-blue-600' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              settings.security.autoScan ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Scan Frequency
        </label>
        <select
          value={settings.security.scanFrequency}
          onChange={(e) => handleSettingChange('security', 'scanFrequency', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Real-time Monitoring</h4>
          <p className="text-gray-400 text-sm">Monitor network traffic in real-time</p>
        </div>
        <button
          onClick={() => handleSettingChange('security', 'realTimeMonitoring', !settings.security.realTimeMonitoring)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            settings.security.realTimeMonitoring ? 'bg-blue-600' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              settings.security.realTimeMonitoring ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Alert Threshold
        </label>
        <select
          value={settings.security.alertThreshold}
          onChange={(e) => handleSettingChange('security', 'alertThreshold', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical Only</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="5"
          max="120"
        />
      </div>
    </div>
  );

  const renderNetworkSettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Default Scan Ports
        </label>
        <input
          type="text"
          value={settings.network.scanPorts}
          onChange={(e) => handleSettingChange('network', 'scanPorts', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="80,443,22,21,25"
        />
        <p className="text-gray-400 text-xs mt-1">Comma-separated list of ports to scan</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Network Range
        </label>
        <input
          type="text"
          value={settings.network.networkRange}
          onChange={(e) => handleSettingChange('network', 'networkRange', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="192.168.1.0/24"
        />
        <p className="text-gray-400 text-xs mt-1">CIDR notation for network range</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Excluded Hosts
        </label>
        <input
          type="text"
          value={settings.network.excludedHosts}
          onChange={(e) => handleSettingChange('network', 'excludedHosts', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="192.168.1.1,192.168.1.2"
        />
        <p className="text-gray-400 text-xs mt-1">Comma-separated list of hosts to exclude</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Max Concurrent Scans
        </label>
        <input
          type="number"
          value={settings.network.maxConcurrentScans}
          onChange={(e) => handleSettingChange('network', 'maxConcurrentScans', parseInt(e.target.value))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          max="50"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'network':
        return renderNetworkSettings();
      case 'notifications':
        return (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Notification settings coming soon...</p>
          </div>
        );
      case 'database':
        return (
          <div className="text-center py-8">
            <Database className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Database configuration coming soon...</p>
          </div>
        );
      case 'api':
        return (
          <div className="text-center py-8">
            <Key className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">API key management coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Settings</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors duration-200 w-fit">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
              {sections.find(s => s.id === activeSection)?.label} Settings
            </h3>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;