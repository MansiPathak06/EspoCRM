import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const TemplateManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    { id: 1, name: '2FA Code', category: 'Security' },
    { id: 2, name: 'Access Info', category: 'Access' },
    { id: 3, name: 'Access Info for Portals', category: 'Access' },
    { id: 4, name: 'Assignment - Case', category: 'Assignment' },
    { id: 5, name: 'Assignment - Lead', category: 'Assignment' },
    { id: 6, name: 'Assignment - Opportunity', category: 'Assignment' },
    { id: 7, name: 'Assignment - Task', category: 'Assignment' },
    { id: 8, name: 'Cancellation - Call', category: 'Cancellation' },
    { id: 9, name: 'Cancellation - Meeting', category: 'Cancellation' },
    { id: 10, name: 'Invitation - Call', category: 'Invitation' },
    { id: 11, name: 'Invitation - Meeting', category: 'Invitation' },
    { id: 12, name: 'Mention', category: 'Social' },
    { id: 13, name: 'Note about Post', category: 'Notes' },
    { id: 14, name: 'Note about Post (no Parent)', category: 'Notes' },
    { id: 15, name: 'Note about Received Email', category: 'Notes' },
    { id: 16, name: 'Note about Status Update', category: 'Notes' },
    { id: 17, name: 'Password Change Link', category: 'Security' },
    { id: 18, name: 'Reminder - Call', category: 'Reminder' },
    { id: 19, name: 'Reminder - Meeting', category: 'Reminder' },
    { id: 20, name: 'Reminder - Task', category: 'Reminder' }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateClick = (template) => {
    console.log('Template clicked:', template.name);
    // Route navigation will be added later
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span>Administration</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Template Manager</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">Template Manager</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Template List Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Available Templates ({filteredTemplates.length})
            </h2>
          </div>

          {/* Template List */}
          <div className="divide-y divide-gray-200">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-blue-600 group-hover:text-blue-800 truncate">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {template.category}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 ml-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No templates found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards - Mobile responsive grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Assignment Templates</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Reminder Templates</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Note Templates</p>
                <p className="text-2xl font-bold text-purple-600">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;