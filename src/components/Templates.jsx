import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Templates = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [formData, setFormData] = useState({
    name: '',
    entityType: '',
    teams: '',
    pageOrientation: 'Portrait',
    paperFormat: 'A4',
    font: '',
    topMargin: '10',
    leftMargin: '10',
    rightMargin: '10',
    bottomMargin: '20',
    title: '',
    printHeader: false,
    printFooter: false,
    style: '1'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving:', formData);
    setCurrentView('list');
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      entityType: '',
      teams: '',
      pageOrientation: 'Portrait',
      paperFormat: 'A4',
      font: '',
      topMargin: '10',
      leftMargin: '10',
      rightMargin: '10',
      bottomMargin: '20',
      title: '',
      printHeader: false,
      printFooter: false,
      style: '1'
    });
    setCurrentView('list');
  };

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={() => setCurrentView('list')}
                className="text-blue-500 hover:text-blue-700"
              >
                Templates
              </button>
              <span className="text-gray-400">›</span>
              <span className="text-gray-800">create</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-gray-600">
                <Search size={20} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Plus size={20} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mb-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium"
              >
                Cancel
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Page Orientation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Orientation
                    </label>
                    <div className="relative">
                      <select
                        value={formData.pageOrientation}
                        onChange={(e) => handleInputChange('pageOrientation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="Portrait">Portrait</option>
                        <option value="Landscape">Landscape</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Font */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font
                    </label>
                    <div className="relative">
                      <select
                        value={formData.font}
                        onChange={(e) => handleInputChange('font', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Helvetica">Helvetica</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Left Margin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Left Margin
                    </label>
                    <input
                      type="number"
                      value={formData.leftMargin}
                      onChange={(e) => handleInputChange('leftMargin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Print Header */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Print Header
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.printHeader}
                        onChange={(e) => handleInputChange('printHeader', e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Print Footer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Print Footer
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.printFooter}
                        onChange={(e) => handleInputChange('printFooter', e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style
                    </label>
                    <input
                      type="text"
                      value={formData.style}
                      onChange={(e) => handleInputChange('style', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-6">
                  {/* Entity Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entity Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.entityType}
                        onChange={(e) => handleInputChange('entityType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Account">Account</option>
                        <option value="Contact">Contact</option>
                        <option value="Lead">Lead</option>
                        <option value="Opportunity">Opportunity</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Paper Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paper Format
                    </label>
                    <div className="relative">
                      <select
                        value={formData.paperFormat}
                        onChange={(e) => handleInputChange('paperFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="Letter">Letter</option>
                        <option value="Legal">Legal</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Top Margin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Top Margin
                    </label>
                    <input
                      type="number"
                      value={formData.topMargin}
                      onChange={(e) => handleInputChange('topMargin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Right Margin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Right Margin
                    </label>
                    <input
                      type="number"
                      value={formData.rightMargin}
                      onChange={(e) => handleInputChange('rightMargin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Bottom Margin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bottom Margin
                    </label>
                    <input
                      type="number"
                      value={formData.bottomMargin}
                      onChange={(e) => handleInputChange('bottomMargin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Teams */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teams
                    </label>
                    <div className="relative">
                      <select
                        value={formData.teams}
                        onChange={(e) => handleInputChange('teams', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Support">Support</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-800">Templates</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('create')}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>Create Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                <Search size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-lg mb-2">No Data</div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            0 / 0
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;