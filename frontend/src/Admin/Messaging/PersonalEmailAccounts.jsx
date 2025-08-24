import React, { useState } from 'react';
import { Plus, ArrowLeft, ArrowRight, X, Info, Calendar, MoreVertical, Search, ChevronDown, User } from 'lucide-react';

const PersonalEmailAccounts = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [activeTab, setActiveTab] = useState('Main');
  const [searchFilter, setSearchFilter] = useState('All');
  const [formData, setFormData] = useState({
    emailAddress: '',
    name: '',
    status: 'Active',
    assignedUser: 'Admin',
    fetchEmails: true,
    fetchSince: '',
    host: '',
    port: '993',
    monitoredFolders: ['INBOX'],
    putInFolder: '',
    username: '',
    password: '',
    security: 'SSL/TLS',
    keepFetchedEmailsUnread: false,
    storeSentEmails: false,
    useSMTP: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    // Handle save logic here
    setCurrentView('list');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setFormData({
      emailAddress: '',
      name: '',
      status: 'Active',
      assignedUser: 'Admin',
      fetchEmails: true,
      fetchSince: '',
      host: '',
      port: '993',
      monitoredFolders: ['INBOX'],
      putInFolder: '',
      username: '',
      password: '',
      security: 'SSL/TLS',
      keepFetchedEmailsUnread: false,
      storeSentEmails: false,
      useSMTP: false
    });
  };

  const handleTestConnection = () => {
    console.log('Testing connection...');
    // Handle test connection logic
  };

  const addMonitoredFolder = () => {
    setFormData(prev => ({
      ...prev,
      monitoredFolders: [...prev.monitoredFolders, '']
    }));
  };

  const removeMonitoredFolder = (index) => {
    setFormData(prev => ({
      ...prev,
      monitoredFolders: prev.monitoredFolders.filter((_, i) => i !== index)
    }));
  };

  const updateMonitoredFolder = (index, value) => {
    setFormData(prev => ({
      ...prev,
      monitoredFolders: prev.monitoredFolders.map((folder, i) => i === index ? value : folder)
    }));
  };

  const navigateToAdmin = () => {
    // This would handle navigation to /admin
    console.log('Navigating to /admin');
    window.location.href = '/admin';
  };

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button 
                onClick={navigateToAdmin}
                className="text-blue-500 hover:text-blue-700 hover:underline"
              >
                Administration
              </button>
              <span className="text-gray-400">&gt;</span>
              <span className="text-gray-700">Personal Email Accounts</span>
            </div>
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Email Account</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg mb-2">No Data</div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <span>0 / 0</span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2">
          <button 
            onClick={navigateToAdmin}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Personal Email Accounts
          </button>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-700">create</span>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex space-x-8">
            {['Main', 'IMAP', 'SMTP'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'Main' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                  <Info className="ml-1 h-4 w-4 text-gray-400" />
                </label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned User *
                </label>
                <div className="flex">
                  <div className="flex items-center flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{formData.assignedUser}</span>
                  </div>
                  <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 hover:bg-gray-300">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300">
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'IMAP' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={formData.fetchEmails}
                      onChange={(e) => handleInputChange('fetchEmails', e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Fetch Emails</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fetch Since *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.fetchSince}
                      onChange={(e) => handleInputChange('fetchSince', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned User *
                  </label>
                  <div className="flex">
                    <div className="flex items-center flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{formData.assignedUser}</span>
                    </div>
                    <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 hover:bg-gray-300">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300">
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Host *
                  </label>
                  <input
                    type="text"
                    value={formData.host}
                    onChange={(e) => handleInputChange('host', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security
                  </label>
                  <select
                    value={formData.security}
                    onChange={(e) => handleInputChange('security', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="SSL/TLS">SSL/TLS</option>
                    <option value="STARTTLS">STARTTLS</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Port *
                  </label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => handleInputChange('port', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monitored Folders *
                  </label>
                  <div className="space-y-2">
                    {formData.monitoredFolders.map((folder, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={folder}
                          onChange={(e) => updateMonitoredFolder(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Folder name"
                        />
                        <button
                          onClick={() => removeMonitoredFolder(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addMonitoredFolder}
                      className="text-blue-500 hover:text-blue-700 text-sm px-3 py-1 border border-gray-300 rounded-md"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Put in Folder
                  </label>
                  <div className="flex">
                    <select
                      value={formData.putInFolder}
                      onChange={(e) => handleInputChange('putInFolder', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Inbox">Inbox</option>
                      <option value="Sent">Sent</option>
                    </select>
                    <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 hover:bg-gray-300">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300">
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.keepFetchedEmailsUnread}
                    onChange={(e) => handleInputChange('keepFetchedEmailsUnread', e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Keep Fetched Emails Unread</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.storeSentEmails}
                    onChange={(e) => handleInputChange('storeSentEmails', e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="flex items-center text-sm font-medium text-gray-700">
                    Store Sent Emails
                    <Info className="ml-1 h-4 w-4 text-gray-400" />
                  </span>
                </label>
              </div>

              <button
                onClick={handleTestConnection}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Test Connection
              </button>
            </div>
          )}

          {activeTab === 'SMTP' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.useSMTP}
                      onChange={(e) => handleInputChange('useSMTP', e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="flex items-center text-sm font-medium text-gray-700">
                      Use SMTP
                      <Info className="ml-1 h-4 w-4 text-gray-400" />
                    </span>
                  </label>
                </div>

                <div></div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned User *
                  </label>
                  <div className="flex">
                    <div className="flex items-center flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{formData.assignedUser}</span>
                    </div>
                    <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 hover:bg-gray-300">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300">
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalEmailAccounts;