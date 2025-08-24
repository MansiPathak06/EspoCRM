import React, { useState } from 'react';
import { ChevronLeft, Plus, Search } from 'lucide-react';

const LayoutSet = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [layoutSetName, setLayoutSetName] = useState('');
  const [layouts, setLayouts] = useState('');

  const handleCreateLayoutSet = () => {
    setCurrentView('create');
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving layout set:', { name: layoutSetName, layouts });
    setCurrentView('list');
    setLayoutSetName('');
    setLayouts('');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setLayoutSetName('');
    setLayouts('');
  };

  const handleAdministrationClick = () => {
    // Navigate to /admin
    window.location.href = '/admin';
  };

  const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
    // Add actual navigation logic here
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
          <span className="text-gray-600">Layout Sets</span>
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
              <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Layout Sets</h1>
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
                  onClick={handleCreateLayoutSet}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Layout Set</span>
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
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition-colors"
              >
                •••
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
                  value={layoutSetName}
                  onChange={(e) => setLayoutSetName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter layout set name"
                />
              </div>

              {/* Layouts Field */}
              <div className="space-y-2">
                <label htmlFor="layouts" className="block text-sm font-medium text-gray-700">
                  Layouts
                </label>
                <textarea
                  id="layouts"
                  value={layouts}
                  onChange={(e) => setLayouts(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter layouts"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutSet;