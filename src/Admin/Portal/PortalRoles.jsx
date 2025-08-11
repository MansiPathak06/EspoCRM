import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const PortalRoles = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    exportPermission: 'not set',
    massUpdatePermission: 'not set',
    search: '',
    scopePermissions: {
      Emails: 'not set',
      Templates: 'not set',
      Accounts: 'not set',
      Activities: 'not set',
      Calls: 'not set',
      Cases: 'not set',
      Contacts: 'not set',
      'Document Folders': 'not set',
      Documents: 'not set',
      'Knowledge Base': 'not set',
      'Knowledge Base Categories': 'not set',
      Leads: 'not set',
      Meetings: 'not set',
      Opportunities: 'not set',
      Tasks: 'not set'
    },
    fieldPermissions: {
      Emails: [],
      Accounts: [],
      Calls: [],
      Cases: [],
      Contacts: [],
      'Document Folders': [],
      Documents: [],
      'Knowledge Base': [],
      'Knowledge Base Categories': [],
      Leads: [],
      Meetings: [],
      Opportunities: [],
      Tasks: []
    }
  });

  const permissionOptions = [
    'not set',
    'Yes',
    'No',
    'Team',
    'Own',
    'Account',
    'Contact'
  ];

  const handleCreatePortalRole = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    setFormData({
      name: '',
      exportPermission: 'not set',
      massUpdatePermission: 'not set',
      search: '',
      scopePermissions: {
        Emails: 'not set',
        Templates: 'not set',
        Accounts: 'not set',
        Activities: 'not set',
        Calls: 'not set',
        Cases: 'not set',
        Contacts: 'not set',
        'Document Folders': 'not set',
        Documents: 'not set',
        'Knowledge Base': 'not set',
        'Knowledge Base Categories': 'not set',
        Leads: 'not set',
        Meetings: 'not set',
        Opportunities: 'not set',
        Tasks: 'not set'
      },
      fieldPermissions: {
        Emails: [],
        Accounts: [],
        Calls: [],
        Cases: [],
        Contacts: [],
        'Document Folders': [],
        Documents: [],
        'Knowledge Base': [],
        'Knowledge Base Categories': [],
        Leads: [],
        Meetings: [],
        Opportunities: [],
        Tasks: []
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScopePermissionChange = (entity, value) => {
    setFormData(prev => ({
      ...prev,
      scopePermissions: {
        ...prev.scopePermissions,
        [entity]: value
      }
    }));
  };

  const addFieldPermission = (entity) => {
    setFormData(prev => ({
      ...prev,
      fieldPermissions: {
        ...prev.fieldPermissions,
        [entity]: [...prev.fieldPermissions[entity], { field: '', read: false, edit: false }]
      }
    }));
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <nav className="text-sm text-gray-600 mb-4">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Portal Roles</span>
              <span className="mx-2">›</span>
              <span>create</span>
            </nav>
            
            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleCloseCreateForm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={handleCloseCreateForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button className="px-2 py-2 text-gray-500 hover:text-gray-700">
                ⋯
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Export and Mass Update Permissions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Export Permission <span className="text-gray-400">ℹ️</span>
                  </label>
                  <select
                    name="exportPermission"
                    value={formData.exportPermission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {permissionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mass Update Permission <span className="text-gray-400">ℹ️</span>
                  </label>
                  <select
                    name="massUpdatePermission"
                    value={formData.massUpdatePermission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {permissionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  name="search"
                  value={formData.search}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Scope Level Table */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Scope Level</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Access</th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Create</th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Read</th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Edit</th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Delete</th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Stream</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(formData.scopePermissions).map((entity, index) => (
                        <tr key={entity} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700">
                            {entity}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <select
                              value={formData.scopePermissions[entity]}
                              onChange={(e) => handleScopePermissionChange(entity, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              {permissionOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Field Level Table */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Field Level</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Read</th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(formData.fieldPermissions).map((entity, index) => (
                        <tr key={entity} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700">
                            {entity}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <button
                              onClick={() => addFieldPermission(entity)}
                              className="text-blue-500 hover:text-blue-700 text-lg font-bold"
                            >
                              +
                            </button>
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <button
                              onClick={() => addFieldPermission(entity)}
                              className="text-blue-500 hover:text-blue-700 text-lg font-bold"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <nav className="text-sm text-gray-600 mb-2">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Administration</span>
              <span className="mx-2">›</span>
              <span>Portal Roles</span>
            </nav>
            <h1 className="text-2xl font-semibold text-gray-900">Portal Roles</h1>
          </div>
          <button
            onClick={handleCreatePortalRole}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mt-4 sm:mt-0"
          >
            <Plus size={16} />
            Create Portal Role
          </button>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>0 / 0</span>
            <div className="flex items-center gap-1">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center text-gray-500">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">No Data</h3>
            <p className="text-sm">No portal roles found. Create your first portal role to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalRoles;