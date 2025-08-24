import React, { useState } from 'react';
import { Search, Plus, Menu, Bell, ChevronLeft, ChevronRight, X } from 'lucide-react';

const EmailFilters = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [isGlobal, setIsGlobal] = useState(false);
  const [parentType, setParentType] = useState('User');
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyContains, setBodyContains] = useState(['']);
  const [bodyContainsAll, setBodyContainsAll] = useState(['']);
  const [action, setAction] = useState('Ignore');
  const [markAsRead, setMarkAsRead] = useState(false);
  const [skipNotification, setSkipNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const handleNavigateToAdmin = () => {
    // In a real app, you'd use React Router: navigate('/admin')
    window.location.href = '/admin';
  };

  const handleNavigateToEmails = () => {
    // In a real app, you'd use React Router: navigate('/email')
    window.location.href = '/email';
  };

  const addBodyContainsField = (type) => {
    if (type === 'contains') {
      setBodyContains([...bodyContains, '']);
    } else {
      setBodyContainsAll([...bodyContainsAll, '']);
    }
  };

  const updateBodyContainsField = (index, value, type) => {
    if (type === 'contains') {
      const updated = [...bodyContains];
      updated[index] = value;
      setBodyContains(updated);
    } else {
      const updated = [...bodyContainsAll];
      updated[index] = value;
      setBodyContainsAll(updated);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving filter:', {
      filterName,
      isGlobal,
      parentType,
      fromEmail,
      toEmail,
      subject,
      bodyContains,
      bodyContainsAll,
      action,
      markAsRead,
      skipNotification
    });
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    // Reset form fields
    setFilterName('');
    setIsGlobal(false);
    setFromEmail('');
    setToEmail('');
    setSubject('');
    setBodyContains(['']);
    setBodyContainsAll(['']);
    setAction('Ignore');
    setMarkAsRead(false);
    setSkipNotification(false);
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-2 text-sm">
            <button 
              onClick={handleNavigateToAdmin}
              className="text-blue-500 hover:text-blue-700"
            >
              Administration
            </button>
            <span className="text-gray-500">›</span>
            <span className="text-blue-500">Email Filters</span>
            <span className="text-gray-500">›</span>
            <span className="text-gray-700">create</span>
          </div>
        </div>

        {/* Form Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 space-y-6">
              {/* Name and Is Global */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is Global
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isGlobal}
                        onChange={(e) => setIsGlobal(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Parent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={parentType}
                    onChange={(e) => setParentType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="User">User</option>
                    <option value="Team">Team</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Admin"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* From and To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <input
                    type="email"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Body Contains */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Contains
                </label>
                {bodyContains.map((value, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateBodyContainsField(index, e.target.value, 'contains')}
                      placeholder="Type & press enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => addBodyContainsField('contains')}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Body Contains All */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Contains All
                </label>
                {bodyContainsAll.map((value, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateBodyContainsField(index, e.target.value, 'all')}
                      placeholder="Type & press enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => addBodyContainsField('all')}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action
                  </label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Ignore">Ignore</option>
                    <option value="Move to Folder">Move to Folder</option>
                    <option value="Forward">Forward</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mark as Read
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={markAsRead}
                        onChange={(e) => setMarkAsRead(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skip Notification
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={skipNotification}
                        onChange={(e) => setSkipNotification(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
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
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-2 text-sm">
          <button 
            onClick={handleNavigateToAdmin}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            Administration
          </button>
          <span className="text-gray-500">›</span>
          <span className="text-gray-700 font-medium">Email Filters</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Action Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Menu className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Email Filter</span>
            </button>
            <button
              onClick={handleNavigateToEmails}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Emails
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 text-center">
            <div className="text-gray-500 text-lg">No Data</div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            0 / 0
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFilters;