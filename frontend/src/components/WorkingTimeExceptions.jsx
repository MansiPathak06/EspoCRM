import React, { useState } from 'react';
import { Search, Plus, Calendar, ChevronLeft, ChevronRight, MoreHorizontal, Info, ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";


const WorkingTimeExceptions = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [formData, setFormData] = useState({
    type: 'Non-working',
    name: '',
    dateStart: '',
    dateEnd: '',
    calendars: [],
    users: [],
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving:', formData);
    setCurrentView('list');
  };

  const handleCancel = () => {
    setFormData({
      type: 'Non-working',
      name: '',
      dateStart: '',
      dateEnd: '',
      calendars: [],
      users: [],
      description: ''
    });
    setCurrentView('list');
  };

  const handleCalendarIconClick = (fieldName) => {
    // Trigger the date input click
    const dateInput = document.querySelector(`input[name="${fieldName}"]`);
    if (dateInput) {
      dateInput.focus();
      dateInput.showPicker && dateInput.showPicker();
    }
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
                Working Time Exceptions
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
          <div className="max-w-4xl mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Non-working">Non-working</option>
                    <option value="Working">Working</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Date Start */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Start <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateStart"
                      value={formData.dateStart}
                      onChange={(e) => handleInputChange('dateStart', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    />
                    <Calendar 
                      className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                      onClick={() => handleCalendarIconClick('dateStart')}
                    />
                  </div>
                </div>

                {/* Date End */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date End <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateEnd"
                      value={formData.dateEnd}
                      onChange={(e) => handleInputChange('dateEnd', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    />
                    <Calendar 
                      className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                      onClick={() => handleCalendarIconClick('dateEnd')}
                    />
                  </div>
                </div>

                {/* Calendars */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Calendars
                    <Info className="ml-1 h-3 w-3 text-gray-400" />
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      defaultValue=""
                    >
                      <option value="">Select</option>
                    </select>
                    <Link to="/workingtimecalendars">
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </Link>
                  </div>
                </div>

                {/* Users */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Users
                    <Info className="ml-1 h-3 w-3 text-gray-400" />
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      defaultValue=""
                    >
                      <option value="">Select</option>
                    </select>
                    <Link to="/users">
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
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
          <h1 className="text-xl font-medium text-gray-800">Working Time Exceptions</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('create')}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>Create Exception</span>
            </button>
           <Link
  to="/workingtimecalendars"
  className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 inline-block text-center"
>
  Calendars
</Link>

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
              <button className="text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronRight size={20} />
            </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingTimeExceptions;