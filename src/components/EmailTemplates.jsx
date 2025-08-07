import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, X, ChevronDown, ChevronUp, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link, Image, Paperclip, Code, Type, List, ListOrdered, Info } from 'lucide-react';

const EmailTemplates = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [formData, setFormData] = useState({
    name: '',
    oneOff: false,
    assignedUser: '',
    category: '',
    teams: '',
    subject: '',
    placeholders: 'Person',
    body: '',
    html: true
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
      oneOff: false,
      assignedUser: '',
      category: '',
      teams: '',
      subject: '',
      placeholders: 'Person',
      body: '',
      html: true
    });
    setCurrentView('list');
  };

  const placeholdersList = [
    { key: '{today}', description: "Today's date" },
    { key: '{now}', description: 'Current date & time' },
    { key: '{currentYear}', description: 'Current Year' },
    { key: '{optOutUrl}', description: 'URL for an unsubscribe link' },
    { key: '{optOutLink}', description: 'an unsubscribe link' }
  ];

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
                Email Templates
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
          <div className="max-w-7xl mx-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                    {/* One-off */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        One-off
                        <Info className="ml-1 h-3 w-3 text-gray-400" />
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.oneOff}
                          onChange={(e) => handleInputChange('oneOff', e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
                        </select>
                        <div className="absolute right-3 top-2.5 flex items-center space-x-1">
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                          <X className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Assigned User */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assigned User
                      </label>
                      <div className="relative">
                        <select
                          value={formData.assignedUser}
                          onChange={(e) => handleInputChange('assignedUser', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select</option>
                        </select>
                        <div className="absolute right-3 top-2.5 flex items-center space-x-1">
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                          <X className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="md:col-span-2">
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
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Placeholders */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placeholders
                    </label>
                    <div className="flex items-center space-x-2">
                      <select
                        value={formData.placeholders}
                        onChange={(e) => handleInputChange('placeholders', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Person">Person</option>
                      </select>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm">
                        Insert
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body
                    </label>
                    
                    {/* Rich Text Editor Toolbar */}
                    <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex items-center space-x-1 flex-wrap">
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Bold size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Italic size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Underline size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <select className="text-sm border-0 bg-transparent">
                        <option>14</option>
                      </select>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Type size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <List size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <ListOrdered size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <AlignLeft size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Link size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Image size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Code size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600">
                        <Paperclip size={16} />
                      </button>
                    </div>

                    {/* Text Area */}
                    <textarea
                      value={formData.body}
                      onChange={(e) => handleInputChange('body', e.target.value)}
                      rows={12}
                      className="w-full px-3 py-2 border-l border-r border-b border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Bottom Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Attachments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attachments
                      </label>
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Paperclip size={16} className="text-gray-400" />
                      </button>
                    </div>

                    {/* HTML */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        HTML
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.html}
                          onChange={(e) => handleInputChange('html', e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Info</h3>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Available placeholders:</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {placeholdersList.map((placeholder, index) => (
                        <li key={index} className="flex flex-col">
                          <span className="font-mono text-blue-600">{placeholder.key}</span>
                          <span className="text-gray-500 ml-2">– {placeholder.description}</span>
                        </li>
                      ))}
                    </ul>
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
          <h1 className="text-xl font-medium text-gray-800">Email Templates</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('create')}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>Create Email Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
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
      </div>
    </div>
  );
};

export default EmailTemplates;