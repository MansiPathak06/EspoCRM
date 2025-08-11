import React, { useState } from 'react';
import { Search, ChevronRight, Plus, ChevronDown, ChevronUp, X, Edit, Info, Paperclip } from 'lucide-react';

const Portals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    customUrl: '',
    customId: '',
    isActive: true,
    isDefault: false,
    roles: '',
    dateFormat: 'Default - DD.MM.YYYY',
    timeFormat: 'Default - HH:mm',
    timeZone: 'Default - UTC',
    firstDayOfWeek: 'Default - Sunday',
    defaultCurrency: 'Default - USD',
    language: 'Default - English (US)',
    authenticationProvider: '',
    authTokenLifetime: '',
    authTokenMaxIdleTime: '',
    logo: null,
    layoutSet: '',
    theme: 'Default - Espo',
    applicationName: '',
    tabList: [],
    quickCreateList: [],
    dashboardLayout: []
  });

  const portals = []; // Empty for "No Data" state

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleCreatePortal = () => {
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setActiveTab('general');
    setFormData({
      name: '',
      url: '',
      customUrl: '',
      customId: '',
      isActive: true,
      isDefault: false,
      roles: '',
      dateFormat: 'Default - DD.MM.YYYY',
      timeFormat: 'Default - HH:mm',
      timeZone: 'Default - UTC',
      firstDayOfWeek: 'Default - Sunday',
      defaultCurrency: 'Default - USD',
      language: 'Default - English (US)',
      authenticationProvider: '',
      authTokenLifetime: '',
      authTokenMaxIdleTime: '',
      logo: null,
      layoutSet: '',
      theme: 'Default - Espo',
      applicationName: '',
      tabList: [],
      quickCreateList: [],
      dashboardLayout: []
    });
  };

  const renderPortalsList = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span>Administration</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Portals</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">Portals</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative max-w-md w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Create Portal Button */}
            <button
              onClick={handleCreatePortal}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Pagination Info */}
          <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <span>0 / 0</span>
            <div className="flex space-x-1">
              <button className="p-1 rounded hover:bg-gray-100" disabled>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100" disabled>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* No Data State */}
          <div className="px-6 py-16 text-center">
            <p className="text-gray-500 text-lg">No Data</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateForm = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="text-blue-600 cursor-pointer" onClick={() => setShowCreateForm(false)}>Portals</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">create</span>
            </nav>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              •••
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'general', name: 'General' },
              { id: 'settings', name: 'Settings' },
              { id: 'userInterface', name: 'User Interface' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">Is Active</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="—"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 text-sm font-medium text-gray-700">Is Default</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Roles</label>
              <div className="relative">
                <select
                  value={formData.roles}
                  onChange={(e) => handleInputChange('roles', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">Select</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom ID</label>
              <input
                type="text"
                value={formData.customId}
                onChange={(e) => handleInputChange('customId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom URL</label>
              <input
                type="text"
                value={formData.customUrl}
                onChange={(e) => handleInputChange('customUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <div className="relative">
                <select
                  value={formData.dateFormat}
                  onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - DD.MM.YYYY">Default - DD.MM.YYYY</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <div className="relative">
                <select
                  value={formData.timeZone}
                  onChange={(e) => handleInputChange('timeZone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - UTC">Default - UTC</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
              <div className="relative">
                <select
                  value={formData.timeFormat}
                  onChange={(e) => handleInputChange('timeFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - HH:mm">Default - HH:mm</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Day of Week</label>
              <div className="relative">
                <select
                  value={formData.firstDayOfWeek}
                  onChange={(e) => handleInputChange('firstDayOfWeek', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - Sunday">Default - Sunday</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <div className="relative">
                <select
                  value={formData.defaultCurrency}
                  onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - USD">Default - USD</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <div className="relative">
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - English (US)">Default - English (US)</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Provider</label>
              <div className="relative flex">
                <select
                  value={formData.authenticationProvider}
                  onChange={(e) => handleInputChange('authenticationProvider', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">Select</option>
                </select>
                <button className="px-3 py-2 border-l-0 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Auth Token Lifetime (hours)</label>
                <input
                  type="text"
                  value={formData.authTokenLifetime}
                  onChange={(e) => handleInputChange('authTokenLifetime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Info className="h-4 w-4 text-gray-400 mt-6" />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Auth Token Max Idle Time (hours)</label>
                <input
                  type="text"
                  value={formData.authTokenMaxIdleTime}
                  onChange={(e) => handleInputChange('authTokenMaxIdleTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Info className="h-4 w-4 text-gray-400 mt-6" />
            </div>
          </div>
        );

      case 'userInterface':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <Paperclip className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="relative">
                <select
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Default - Espo">Default - Espo</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Layout Set</label>
                <div className="relative flex">
                  <select
                    value={formData.layoutSet}
                    onChange={(e) => handleInputChange('layoutSet', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">Select</option>
                  </select>
                  <button className="px-3 py-2 border-l-0 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <Info className="h-4 w-4 text-gray-400 mt-6" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
              <input
                type="text"
                value={formData.applicationName}
                onChange={(e) => handleInputChange('applicationName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tab List</label>
              <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center">
                Add
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Create List</label>
              <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center">
                Add
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Layout</label>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <Edit className="h-4 w-4 text-gray-400" />
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <Plus className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return showCreateForm ? renderCreateForm() : renderPortalsList();
};

export default Portals;