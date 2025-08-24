import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronDown, X, Minimize2 } from 'lucide-react';

const TargetList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    assignedUser: '',
    teams: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving target list:', formData);
    setShowCreateModal(false);
    setFormData({
      name: '',
      category: '',
      description: '',
      assignedUser: '',
      teams: ''
    });
  };

  const handleCancel = () => {
    setShowCreateModal(false);
    setFormData({
      name: '',
      category: '',
      description: '',
      assignedUser: '',
      teams: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Action Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-auto">
                  <select className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                <div className="relative flex-1 sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder=""
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2 text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Target List</span>
                  <span className="sm:hidden">Create</span>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8 text-center text-gray-500">
            <div className="text-lg">No Data</div>
          </div>
        </div>
      </div>

      {/* Create Target List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-medium text-gray-800">Create Target List</h2>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600 hidden sm:block">
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 p-4 border-b border-gray-200">
              <button 
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
              >
                Save
              </button>
              <button className="text-blue-600 px-4 py-2 border border-blue-600 rounded hover:bg-blue-50 text-sm sm:text-base">
                Full Form
              </button>
              <button 
                onClick={handleCancel}
                className="text-gray-600 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Select</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned User
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.assignedUser}
                        onChange={(e) => handleInputChange('assignedUser', e.target.value)}
                        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Select</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teams
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.teams}
                        onChange={(e) => handleInputChange('teams', e.target.value)}
                        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Select</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetList;