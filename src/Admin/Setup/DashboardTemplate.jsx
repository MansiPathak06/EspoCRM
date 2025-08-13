import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, Edit, MoreHorizontal } from 'lucide-react';

const DashboardTemplate = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [templateName, setTemplateName] = useState('');
  const [layout, setLayout] = useState('');

  const handleCreateTemplate = () => {
    setCurrentView('create');
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving dashboard template:', { name: templateName, layout });
    setCurrentView('list');
    setTemplateName('');
    setLayout('');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setTemplateName('');
    setLayout('');
  };

  const handleAdministrationClick = () => {
    // Navigate to /admin
    window.location.href = '/admin';
  };

  const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
    // Add actual navigation logic here
  };

  const handleEditLayout = () => {
    console.log('Edit layout clicked');
    // Add layout editor logic here
  };

  const handleAddLayout = () => {
    console.log('Add layout clicked');
    // Add layout addition logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <button 
            onClick={handleAdministrationClick}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            Administration
          </button>
          <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
          <span className="text-gray-600">Dashboard Templates</span>
          {currentView === 'create' && (
            <>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
              <span className="text-gray-600">create</span>
            </>
          )}
        </div>

        {/* List View */}
        {currentView === 'list' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Dashboard Templates</h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
                  />
                </div>
                {/* Create Button */}
                <button
                  onClick={handleCreateTemplate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Template</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No Data</p>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                0 / 0
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => navigateTo('prev')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('next')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create View */}
        {currentView === 'create' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 p-6 border-b border-gray-200">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => console.log('More options')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition-colors flex items-center justify-center"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter template name"
                />
              </div>

              {/* Layout Field */}
              <div className="space-y-2">
                <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
                  Layout <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      id="layout"
                      type="text"
                      value={layout}
                      onChange={(e) => setLayout(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-20"
                      placeholder="Enter layout configuration"
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex space-x-1">
                      <button
                        onClick={handleEditLayout}
                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title="Edit Layout"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleAddLayout}
                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title="Add Layout"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTemplate;