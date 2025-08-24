import React, { useState } from 'react';
import { ChevronRight, Search, Plus, MoreHorizontal, ChevronLeft, ChevronDown, Info } from 'lucide-react';

const OAuthProviders = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [searchTerm, setSearchTerm] = useState('');
  const [providers, setProviders] = useState([]); // Empty list for "No Data" state
  const [formData, setFormData] = useState({
    name: '',
    isActive: true,
    clientId: '',
    clientSecret: '',
    authorizationEndpoint: '',
    tokenEndpoint: '',
    scopes: [],
    scopeSeparator: '',
    authorizationParams: '1',
    authorizationPrompt: 'none',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScopeAdd = (scope) => {
    if (scope.trim() && !formData.scopes.includes(scope.trim())) {
      setFormData(prev => ({
        ...prev,
        scopes: [...prev.scopes, scope.trim()]
      }));
    }
  };

  const handleScopeRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      scopes: prev.scopes.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('Saving OAuth provider:', formData);
    // Add your save logic here
    setCurrentView('list');
  };

  const handleCancel = () => {
    console.log('Cancelling changes');
    setFormData({
      name: '',
      isActive: true,
      clientId: '',
      clientSecret: '',
      authorizationEndpoint: '',
      tokenEndpoint: '',
      scopes: [],
      scopeSeparator: '',
      authorizationParams: '1',
      authorizationPrompt: 'none',
      description: ''
    });
    setCurrentView('list');
  };

  const navigateToAdmin = () => {
    console.log('Navigating to /admin');
    window.location.href = '/admin';
  };

  const handleCreateProvider = () => {
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
            <span className="text-gray-600">OAuth Providers</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">OAuth Providers</h1>
              <button
                onClick={handleCreateProvider}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create OAuth Provider
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
                  placeholder="Search providers..."
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
            {providers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No Data</div>
                <p className="text-gray-400 mt-2">No OAuth providers have been created yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Table would go here when there's data */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Provider rows would be mapped here */}
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
              OAuth Providers
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
              <h1 className="text-2xl font-semibold text-gray-900">Create OAuth Provider</h1>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Client ID */}
                <div>
                  <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                    Client ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="clientId"
                    type="text"
                    value={formData.clientId}
                    onChange={(e) => handleInputChange('clientId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Authorization Endpoint */}
                <div>
                  <label htmlFor="authorizationEndpoint" className="block text-sm font-medium text-gray-700 mb-2">
                    Authorization Endpoint <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="authorizationEndpoint"
                    type="text"
                    value={formData.authorizationEndpoint}
                    onChange={(e) => handleInputChange('authorizationEndpoint', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Scopes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scopes</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.scopes.map((scope, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        {scope}
                        <button
                          onClick={() => handleScopeRemove(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Type & press enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleScopeAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        handleScopeAdd(input.value);
                        input.value = '';
                      }}
                      className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Authorization Params */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Authorization Params
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <input
                    type="text"
                    value={formData.authorizationParams}
                    onChange={(e) => handleInputChange('authorizationParams', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Is Active */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is Active</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">Provider is active</span>
                  </label>
                </div>

                {/* Client Secret */}
                <div>
                  <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Secret <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="clientSecret"
                    type="password"
                    value={formData.clientSecret}
                    onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Token Endpoint */}
                <div>
                  <label htmlFor="tokenEndpoint" className="block text-sm font-medium text-gray-700 mb-2">
                    Token Endpoint <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tokenEndpoint"
                    type="text"
                    value={formData.tokenEndpoint}
                    onChange={(e) => handleInputChange('tokenEndpoint', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Scope Separator */}
                <div>
                  <label htmlFor="scopeSeparator" className="block text-sm font-medium text-gray-700 mb-2">
                    Scope Separator
                  </label>
                  <input
                    id="scopeSeparator"
                    type="text"
                    value={formData.scopeSeparator}
                    onChange={(e) => handleInputChange('scopeSeparator', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Authorization Prompt */}
                <div>
                  <label htmlFor="authorizationPrompt" className="block text-sm font-medium text-gray-700 mb-2">
                    Authorization Prompt
                  </label>
                  <div className="relative">
                    <select
                      id="authorizationPrompt"
                      value={formData.authorizationPrompt}
                      onChange={(e) => handleInputChange('authorizationPrompt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="none">none</option>
                      <option value="login">login</option>
                      <option value="consent">consent</option>
                      <option value="select_account">select_account</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="mt-8">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter description..."
              />
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
      </div>
    </div>
  );

  return currentView === 'list' ? <ListView /> : <CreateView />;
};

export default OAuthProviders;