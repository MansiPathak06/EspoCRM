import React, { useState } from 'react';
import { Search, Plus, Calendar, Clock, Users, MoreHorizontal, ChevronDown, X, User } from 'lucide-react';

const Meeting = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [formData, setFormData] = useState({
    name: '',
    parent: 'Account',
    parentSelect: '',
    assignedUser: 'Admin',
    status: 'Planned',
    teams: '',
    dateStart: '05.08.2025',
    timeStart: '09:30',
    dateEnd: '05.08.2025',
    timeEnd: '10:30',
    duration: '1h',
    attendeesUsers: '',
    contacts: '',
    leads: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving meeting:', formData);
    setCurrentView('list');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setFormData({
      name: '',
      parent: 'Account',
      parentSelect: '',
      assignedUser: 'Admin',
      status: 'Planned',
      teams: '',
      dateStart: '05.08.2025',
      timeStart: '09:30',
      dateEnd: '05.08.2025',
      timeEnd: '10:30',
      duration: '1h',
      attendeesUsers: '',
      contacts: '',
      leads: '',
      description: ''
    });
  };

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
  ];

  if (currentView === 'create') {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="text-blue-600">Meetings</span>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
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
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Planned">Planned</option>
                    <option value="Held">Held</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Not Held">Not Held</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Date Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Start <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.dateStart}
                      onChange={(e) => handleInputChange('dateStart', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative w-24">
                    <input
                      type="text"
                      value={formData.timeStart}
                      onChange={(e) => handleInputChange('timeStart', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Clock className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <div className="relative">
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15min">15 minutes</option>
                    <option value="30min">30 minutes</option>
                    <option value="1h">1 hour</option>
                    <option value="1h30min">1 hour 30 minutes</option>
                    <option value="2h">2 hours</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              {/* Parent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent</label>
                <div className="flex gap-2">
                  <div className="relative w-32">
                    <select
                      value={formData.parent}
                      onChange={(e) => handleInputChange('parent', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Account">Account</option>
                      <option value="Contact">Contact</option>
                      <option value="Lead">Lead</option>
                      <option value="Opportunity">Opportunity</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Select"
                      value={formData.parentSelect}
                      onChange={(e) => handleInputChange('parentSelect', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-2 top-2 flex gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date End */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date End <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.dateEnd}
                      onChange={(e) => handleInputChange('dateEnd', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative w-24">
                    <input
                      type="text"
                      value={formData.timeEnd}
                      onChange={(e) => handleInputChange('timeEnd', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Clock className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Reminders */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reminders</label>
                <button className="border border-gray-300 rounded px-3 py-2 text-gray-500 hover:bg-gray-50 flex items-center justify-center w-8 h-8">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Assigned User */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned User <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-medium">A</span>
                    </div>
                    <span className="text-gray-900">{formData.assignedUser}</span>
                  </div>
                  <div className="absolute right-2 top-2 flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Teams */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select"
                    value={formData.teams}
                    onChange={(e) => handleInputChange('teams', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Attendees - Users */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Users</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select"
                        value={formData.attendeesUsers}
                        onChange={(e) => handleInputChange('attendeesUsers', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Contacts */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Contacts</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select"
                        value={formData.contacts}
                        onChange={(e) => handleInputChange('contacts', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Leads */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Leads</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select"
                        value={formData.leads}
                        onChange={(e) => handleInputChange('leads', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Scheduler */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Scheduler</h3>
            
            {/* Date Header */}
            <div className="bg-gray-50 px-4 py-2 border border-gray-200 rounded-t">
              <span className="font-medium text-gray-700">Tue 5 August</span>
            </div>

            {/* Time Grid */}
            <div className="border-l border-r border-b border-gray-200 rounded-b">
              <div className="grid grid-cols-9 border-b border-gray-200">
                <div className="p-2 border-r border-gray-200"></div>
                {timeSlots.map((time) => (
                  <div key={time} className="p-2 border-r border-gray-200 text-center text-sm font-medium text-gray-600">
                    {time}
                  </div>
                ))}
              </div>

              {/* Admin Row */}
              <div className="grid grid-cols-9 min-h-[60px]">
                <div className="p-2 border-r border-gray-200 flex items-center">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-medium">A</span>
                    </div>
                    <span className="text-sm text-gray-700">Admin</span>
                  </div>
                </div>
                {timeSlots.map((time, index) => (
                  <div key={time} className="p-1 border-r border-gray-200 relative">
                    {/* Meeting blocks */}
                    {index === 3 && (
                      <div className="absolute top-1 left-1 right-1 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                        <div className="w-1 h-6 bg-blue-500 rounded"></div>
                      </div>
                    )}
                    {index === 4 && (
                      <div className="absolute top-1 left-1 right-1 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                        <div className="w-1 h-6 bg-blue-500 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View (No Data State)
  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Meetings</h1>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Create Button */}
          <button
            onClick={() => setCurrentView('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Create
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Stream Section */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Stream</h2>
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              </div>
              <p className="text-gray-500">No Data</p>
            </div>
          </div>
        </div>

        {/* My Activities Section */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">My Activities</h2>
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
              </div>
              <p className="text-gray-500">No Data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-2 mr-3">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-2 mr-3">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-2 mr-3">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Planned</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-lg p-2 mr-3">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Held</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;