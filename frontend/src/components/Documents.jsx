import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronDown, X, Minimize2, Paperclip } from 'lucide-react';

const Documents = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    name: '',
    status: 'Active',
    folder: '',
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleSave = () => {
    console.log('Saving document:', formData);
    setShowCreateModal(false);
    setFormData({
      file: null,
      name: '',
      status: 'Active',
      folder: '',
      description: '',
      assignedUser: '',
      teams: ''
    });
  };

  const handleCancel = () => {
    setShowCreateModal(false);
    setFormData({
      file: null,
      name: '',
      status: 'Active',
      folder: '',
      description: '',
      assignedUser: '',
      teams: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      
       
      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Action Bar */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
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
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2 flex-1 sm:flex-initial justify-center sm:justify-start text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline">Create Document</span>
                <span className="xs:hidden">Create</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 text-center text-gray-500">
            <div className="text-base sm:text-lg">No Data</div>
          </div>
        </div>
      </div>

      {/* Create Document Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-medium text-gray-800">Create Document</h2>
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
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                Save
              </button>
              <button className="text-blue-600 px-4 py-2 border border-blue-600 rounded hover:bg-blue-50 text-center">
                Full Form
              </button>
              <button 
                onClick={handleCancel}
                className="text-gray-600 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-center"
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
                      File <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label 
                        htmlFor="file-upload"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer flex items-center"
                      >
                        <Paperclip className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-500 truncate">
                          {formData.file ? formData.file.name : 'Choose file...'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="relative">
                        <select 
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Folder
                      </label>
                      <div className="relative">
                        <select 
                          value={formData.folder}
                          onChange={(e) => handleInputChange('folder', e.target.value)}
                          className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

export default Documents;