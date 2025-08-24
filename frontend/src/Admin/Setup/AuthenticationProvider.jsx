import React, { useState } from 'react';
import { ChevronRight, Search, Plus, MoreVertical, ChevronDown, ChevronUp, X, ChevronLeft } from 'lucide-react';

const AuthenticationProvider = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isMethodOpen, setIsMethodOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    method: ''
  });

  // Authentication methods for the dropdown
  const authMethods = [
    'OAuth 2.0',
    'SAML',
    'LDAP',
    'OpenID Connect',
    'JWT',
    'Basic Authentication',
    'API Key',
    'Active Directory'
  ];

  const handleNavigateToAdmin = () => {
    // In a real app, you would use React Router
    window.location.href = '/admin';
  };

  const handleCreateProvider = () => {
    setCurrentView('create');
  };

  const handleSave = () => {
    if (formData.name && selectedMethod) {
      const newProvider = {
        id: Date.now(),
        ...formData,
        method: selectedMethod,
        createdAt: new Date().toISOString(),
        status: 'Active'
      };
      setProviders([...providers, newProvider]);
      
      // Reset form
      setFormData({ name: '', method: '' });
      setSelectedMethod('');
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', method: '' });
    setSelectedMethod('');
    setCurrentView('list');
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setFormData({ ...formData, method: method });
    setIsMethodOpen(false);
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={handleNavigateToAdmin}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Administration
              </button>
              <ChevronRight className="w-4 h-4" />
              <span 
                className="text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
                onClick={() => setCurrentView('list')}
              >
                Authentication Providers
              </span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-800 font-medium">create</span>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="text-gray-600 hover:text-gray-800 p-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter provider name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Method <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsMethodOpen(!isMethodOpen)}
                        className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                      >
                        <span className={selectedMethod ? 'text-gray-900' : 'text-gray-500'}>
                          {selectedMethod || 'Select authentication method'}
                        </span>
                        <div className="flex items-center space-x-1">
                          {isMethodOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          {selectedMethod && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMethod('');
                                setFormData({ ...formData, method: '' });
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </button>

                      {isMethodOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {authMethods.map((method) => (
                            <button
                              key={method}
                              onClick={() => handleMethodSelect(method)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Can be used for additional fields in the future */}
                <div className="space-y-6">
                  <div className="text-sm text-gray-600">
                    <h3 className="font-medium text-gray-700 mb-2">Configuration Notes</h3>
                    <ul className="space-y-1 text-xs">
                      <li>• Ensure the authentication method is properly configured</li>
                      <li>• Test the provider connection before saving</li>
                      <li>• Check with your system administrator for specific settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={handleNavigateToAdmin}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Administration
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">Authentication Providers</span>
          </nav>
        </div>

        {/* Header with Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Authentication Providers</h1>
          <button
            onClick={handleCreateProvider}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Provider
          </button>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="text-gray-600 hover:text-gray-800 p-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {filteredProviders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No Data</div>
                <p className="text-gray-400 mt-2">
                  {searchTerm ? 'No authentication providers found matching your search.' : 'No authentication providers have been created yet.'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateProvider}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create your first authentication provider
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Method</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProviders.map((provider) => (
                      <tr key={provider.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-medium">{provider.name}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            {provider.method}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                            {provider.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {new Date(provider.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProviders.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {filteredProviders.length} / {filteredProviders.length}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationProvider;