import React, { useState } from 'react';
import { Search, MoreVertical, ChevronLeft, ChevronRight, Plus, ChevronDown, X, Paperclip, Info } from 'lucide-react';

const APIUsers = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'

  const ListView = () => (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg sm:text-xl font-medium text-gray-900">API Users</h1>
              <button 
                onClick={() => setCurrentView('create')}
                className="sm:hidden bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Create
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentView('create')}
                  className="hidden sm:flex bg-blue-600 text-white px-4 py-2 rounded-md text-sm items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create API User
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* No Data State */}
        <div className="p-8 sm:p-12 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Data</h3>
              <p className="text-sm text-gray-500">No API users have been created yet.</p>
            </div>
            <button 
              onClick={() => setCurrentView('create')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Create your first API User
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-gray-700 text-center sm:text-left">
          0 / 0
        </div>
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const CreateView = () => (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Form Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-medium text-gray-900">Create API User</h1>
              <div className="flex items-center gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  Save
                </button>
                <button 
                  onClick={() => setCurrentView('list')}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Name
                    <span className="text-red-500 ml-1">*</span>
                    <Info className="inline w-4 h-4 ml-1 text-gray-400" />
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Teams and Access Control Section */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Teams and Access Control</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <div className="text-sm text-gray-600">API</div>
                    </div>

                    {/* Is Active */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Is Active
                        <Info className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Teams */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teams
                        <Info className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white">
                          <option>Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>

                    {/* Default Team */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Team
                        <Info className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <div className="relative">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white">
                          <option>Select</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                          <X className="w-4 h-4 text-gray-400" />
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roles
                      <Info className="inline w-4 h-4 ml-1 text-gray-400" />
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white">
                        <option>Select</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Authentication Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Method</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white">
                      <option>API Key</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right Column - Avatar */}
              <div className="lg:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload avatar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === 'list' ? <ListView /> : <CreateView />;
};

export default APIUsers;