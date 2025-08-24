import React, { useState } from 'react';
import { ChevronRight, Search, Plus, MoreHorizontal, ChevronLeft, Info } from 'lucide-react';

const AppSecrets = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [searchTerm, setSearchTerm] = useState('');
  const [secrets, setSecrets] = useState([]); // Empty list for "No Data" state
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving app secret:', formData);
    // Add your save logic here
    setCurrentView('list');
  };

  const handleCancel = () => {
    console.log('Cancelling changes');
    setFormData({
      name: '',
      value: '',
      description: ''
    });
    setCurrentView('list');
  };

  const navigateToAdmin = () => {
    console.log('Navigating to /admin');
    window.location.href = '/admin';
  };

  const handleCreateSecret = () => {
    setCurrentView('create');
  };

  // List View Component
  const ListView = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={navigateToAdmin}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Administration
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">App Secrets</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">App Secrets</h1>
              <button
                onClick={handleCreateSecret}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Secret
              </button>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search secrets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {secrets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No Data</div>
                <p className="text-gray-400 mt-2">No app secrets have been created yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Table would go here when there's data */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Secret rows would be mapped here */}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                0 / 0
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Create View Component
  const CreateView = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={navigateToAdmin}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Administration
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button 
              onClick={() => setCurrentView('list')}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              App Secrets
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">create</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header with Action Buttons */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Create App Secret</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Save
                </button>
                <button className="px-2 py-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="max-w-2xl space-y-6">
              {/* Name */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter secret name"
                />
              </div>

              {/* Value */}
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                  Value <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="value"
                  rows="4"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter secret value"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description (optional)"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons (Mobile) */}
          <div className="sm:hidden p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Security Notice</p>
              <p>App secrets are stored securely and encrypted. Once saved, the full value will be masked for security purposes. Make sure to store a copy of your secret value in a secure location.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === 'list' ? <ListView /> : <CreateView />;
};

export default AppSecrets;