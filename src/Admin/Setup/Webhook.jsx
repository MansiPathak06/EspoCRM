import React, { useState } from 'react';
import { ChevronRight, Search, Plus, MoreVertical, X, ChevronDown, ChevronUp } from 'lucide-react';

const Webhook = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [webhooks, setWebhooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedApiUser, setSelectedApiUser] = useState('');
  const [isApiUserOpen, setIsApiUserOpen] = useState(false);
  const [formData, setFormData] = useState({
    event: '',
    url: '',
    apiUser: ''
  });

  // Mock API users for the dropdown
  const apiUsers = [
    'Admin User',
    'API User 1',
    'API User 2',
    'Integration User'
  ];

  const handleNavigateToAdmin = () => {
    // In a real app, you would use React Router
    window.location.href = '/admin';
  };

  const handleCreateWebhook = () => {
    setCurrentView('create');
  };

  const handleSave = () => {
    if (formData.event && formData.url) {
      const newWebhook = {
        id: Date.now(),
        ...formData,
        apiUser: selectedApiUser,
        isActive: isActive
      };
      setWebhooks([...webhooks, newWebhook]);
      
      // Reset form
      setFormData({ event: '', url: '', apiUser: '' });
      setSelectedApiUser('');
      setIsActive(true);
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({ event: '', url: '', apiUser: '' });
    setSelectedApiUser('');
    setIsActive(true);
    setCurrentView('list');
  };

  const handleApiUserSelect = (user) => {
    setSelectedApiUser(user);
    setFormData({ ...formData, apiUser: user });
    setIsApiUserOpen(false);
  };

  const filteredWebhooks = webhooks.filter(webhook =>
    webhook.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webhook.url.toLowerCase().includes(searchTerm.toLowerCase())
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
                Webhooks
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
                      Event <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter event name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/webhook"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Is Active</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API User
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsApiUserOpen(!isApiUserOpen)}
                        className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                      >
                        <span className={selectedApiUser ? 'text-gray-900' : 'text-gray-500'}>
                          {selectedApiUser || 'Select'}
                        </span>
                        <div className="flex items-center space-x-1">
                          {isApiUserOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          {selectedApiUser && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApiUser('');
                                setFormData({ ...formData, apiUser: '' });
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </button>

                      {isApiUserOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                          {apiUsers.map((user) => (
                            <button
                              key={user}
                              onClick={() => handleApiUserSelect(user)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                            >
                              {user}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
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
            <span className="text-gray-800 font-medium">Webhooks</span>
          </nav>
        </div>

        {/* Header with Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Webhooks</h1>
          <button
            onClick={handleCreateWebhook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Webhook
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
                  placeholder="Search webhooks..."
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
            {filteredWebhooks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No Data</div>
                <p className="text-gray-400 mt-2">
                  {searchTerm ? 'No webhooks found matching your search.' : 'No webhooks have been created yet.'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateWebhook}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create your first webhook
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Event</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">URL</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">API User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWebhooks.map((webhook) => (
                      <tr key={webhook.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{webhook.event}</td>
                        <td className="py-3 px-4 text-gray-600 truncate max-w-xs">{webhook.url}</td>
                        <td className="py-3 px-4 text-gray-600">{webhook.apiUser}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              webhook.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {webhook.isActive ? 'Active' : 'Inactive'}
                          </span>
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
          {filteredWebhooks.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {filteredWebhooks.length} / {filteredWebhooks.length}
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

export default Webhook;