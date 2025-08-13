import React, { useState } from 'react';
import { ChevronLeft, Search, MoreVertical, Plus } from 'lucide-react';

const Template = () => {
  const [formData, setFormData] = useState({
    name: '',
    entityType: '',
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

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving template:', formData);
    // Add save logic here
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      entityType: '',
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
    setShowCreateForm(false);
  };

  const navigateToAdmin = () => {
    // Navigate to admin page
    window.location.href = '/admin';
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <button 
                onClick={navigateToAdmin}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Administration
              </button>
              <ChevronLeft className="w-4 h-4 mx-1 rotate-180" />
              <button 
                onClick={() => setShowCreateForm(false)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Templates
              </button>
              <ChevronLeft className="w-4 h-4 mx-1 rotate-180" />
              <span className="text-gray-900">create</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button className="bg-gray-100 text-gray-600 px-2 py-2 rounded hover:bg-gray-200 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Orientation
                  </label>
                  <select
                    value={formData.pageOrientation}
                    onChange={(e) => handleInputChange('pageOrientation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Portrait">Portrait</option>
                    <option value="Landscape">Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font
                  </label>
                  <select
                    value={formData.font}
                    onChange={(e) => handleInputChange('font', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Font</option>
                    <option value="Arial">Arial</option>
                    <option value="Times">Times</option>
                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Left Margin
                  </label>
                  <input
                    type="number"
                    value={formData.leftMargin}
                    onChange={(e) => handleInputChange('leftMargin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Print Header
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.printHeader}
                    onChange={(e) => handleInputChange('printHeader', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Print Footer
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.printFooter}
                    onChange={(e) => handleInputChange('printFooter', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Style
                  </label>
                  <select
                    value={formData.style}
                    onChange={(e) => handleInputChange('style', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">Style 1</option>
                    <option value="2">Style 2</option>
                    <option value="3">Style 3</option>
                  </select>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entity Type *
                  </label>
                  <select
                    value={formData.entityType}
                    onChange={(e) => handleInputChange('entityType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Entity Type</option>
                    <option value="Account">Account</option>
                    <option value="Contact">Contact</option>
                    <option value="Lead">Lead</option>
                    <option value="Opportunity">Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paper Format
                  </label>
                  <select
                    value={formData.paperFormat}
                    onChange={(e) => handleInputChange('paperFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Top Margin
                  </label>
                  <input
                    type="number"
                    value={formData.topMargin}
                    onChange={(e) => handleInputChange('topMargin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Right Margin
                  </label>
                  <input
                    type="number"
                    value={formData.rightMargin}
                    onChange={(e) => handleInputChange('rightMargin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bottom Margin
                  </label>
                  <input
                    type="number"
                    value={formData.bottomMargin}
                    onChange={(e) => handleInputChange('bottomMargin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teams
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select</option>
                    <option value="Team1">Team 1</option>
                    <option value="Team2">Team 2</option>
                  </select>
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
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <button 
              onClick={navigateToAdmin}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Administration
            </button>
            <ChevronLeft className="w-4 h-4 mx-1 rotate-180" />
            <span className="text-gray-900">Templates</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Templates List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No Data</p>
              <p className="text-gray-400 text-sm mt-2">No templates found. Create your first template to get started.</p>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>0 / 0</span>
          <div className="flex gap-2">
            <button 
              disabled
              className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              disabled
              className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;