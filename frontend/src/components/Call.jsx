import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronDown, Calendar, Clock, X, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const Call = () => {
  const [callView, setCallView] = useState('list'); // 'list' or 'create'
  const [calls, setCalls] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parent: '',
    parentType: 'Account',
    assignedUser: 'Admin',
    teams: '',
    status: 'Planned',
    direction: 'Outbound',
    dateStart: '06.08.2025',
    timeStart: '03:45',
    dateEnd: '06.08.2025',
    timeEnd: '03:50',
    duration: '5m',
    phoneNumber: '',
    users: '',
    contacts: '',
    leads: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.name) {
      setCalls([...calls, formData]);
      setFormData({
        name: '',
        parent: '',
        parentType: 'Account',
        assignedUser: 'Admin',
        teams: '',
        status: 'Planned',
        direction: 'Outbound',
        dateStart: '06.08.2025',
        timeStart: '03:45',
        dateEnd: '06.08.2025',
        timeEnd: '03:50',
        duration: '5m',
        phoneNumber: '',
        users: '',
        contacts: '',
        leads: ''
      });
      setCallView('list');
    }
  };

  const handleCancel = () => {
    setCallView('list');
    setFormData({
      name: '',
      parent: '',
      parentType: 'Account',
      assignedUser: 'Admin',
      teams: '',
      status: 'Planned',
      direction: 'Outbound',
      dateStart: '06.08.2025',
      timeStart: '03:45',
      dateEnd: '06.08.2025',
      timeEnd: '03:50',
      duration: '5m',
      phoneNumber: '',
      users: '',
      contacts: '',
      leads: ''
    });
  };

  // Generate time slots for scheduler
  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  if (callView === 'create') {
    return (
      <div className="bg-gray-50 flex-1">
        {/* Header */}
        <div className="bg-white border-b px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="text-blue-500">📞</span>
            <span className="ml-2">Calls</span>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button 
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm hover:bg-blue-600"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-3 py-1.5 md:px-4 md:py-2 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
            <button className="bg-gray-200 text-gray-700 px-2 py-1.5 md:px-3 md:py-2 rounded text-sm">
              <MoreHorizontal size={16} />
            </button>
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden bg-gray-200 text-gray-700 px-2 py-1.5 rounded text-sm ml-auto"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Mobile Sidebar Backdrop */}
          {showSidebar && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* Main Form */}
          <div className="flex-1 p-3 sm:p-4 md:p-6">
            <div className="bg-white rounded shadow-sm">
              <div className="p-3 sm:p-4 md:p-6">
                {/* Name Field */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Parent and Status Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent</label>
                    <div className="flex flex-col sm:flex-row">
                      <select
                        name="parentType"
                        value={formData.parentType}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded sm:rounded-l sm:rounded-r-none px-3 py-2 bg-white text-sm w-full sm:w-32 mb-2 sm:mb-0"
                      >
                        <option value="Account">Account</option>
                        <option value="Contact">Contact</option>
                        <option value="Lead">Lead</option>
                      </select>
                      <div className="flex flex-1">
                        <input
                          type="text"
                          name="parent"
                          value={formData.parent}
                          onChange={handleInputChange}
                          placeholder="Select"
                          className="flex-1 border border-gray-300 sm:border-l-0 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="border border-l-0 border-gray-300 px-3 py-2 bg-gray-50">
                          <ChevronDown size={16} />
                        </button>
                        <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Planned">Planned</option>
                      <option value="Held">Held</option>
                      <option value="Not Held">Not Held</option>
                    </select>
                  </div>
                </div>

                {/* Direction Row */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                  <select
                    name="direction"
                    value={formData.direction}
                    onChange={handleInputChange}
                    className="w-full max-w-xs border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Outbound">Outbound</option>
                    <option value="Inbound">Inbound</option>
                  </select>
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Start <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex flex-1 mb-2 sm:mb-0">
                        <input
                          type="text"
                          name="dateStart"
                          value={formData.dateStart}
                          onChange={handleInputChange}
                          className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="border border-l-0 border-gray-300 px-3 py-2 bg-gray-50">
                          <Calendar size={16} />
                        </button>
                      </div>
                      <div className="flex w-full sm:w-auto">
                        <input
                          type="text"
                          name="timeStart"
                          value={formData.timeStart}
                          onChange={handleInputChange}
                          className="flex-1 sm:w-20 border border-gray-300 sm:border-l-0 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
                          <Clock size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date End <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex flex-1 mb-2 sm:mb-0">
                        <input
                          type="text"
                          name="dateEnd"
                          value={formData.dateEnd}
                          onChange={handleInputChange}
                          className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="border border-l-0 border-gray-300 px-3 py-2 bg-gray-50">
                          <Calendar size={16} />
                        </button>
                      </div>
                      <div className="flex w-full sm:w-auto">
                        <input
                          type="text"
                          name="timeEnd"
                          value={formData.timeEnd}
                          onChange={handleInputChange}
                          className="flex-1 sm:w-20 border border-gray-300 sm:border-l-0 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
                          <Clock size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration and Reminders Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="5m">5m</option>
                      <option value="10m">10m</option>
                      <option value="15m">15m</option>
                      <option value="30m">30m</option>
                      <option value="1h">1h</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reminders</label>
                    <button className="border border-gray-300 rounded px-3 py-2 text-gray-400 hover:text-gray-600">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Scheduler */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Scheduler</label>
                  <div className="bg-gray-50 p-3 md:p-4 rounded border">
                    <div className="text-sm text-gray-600 mb-2">Wed 6 August</div>
                    <div className="overflow-x-auto">
                      <div className="min-w-[400px]">
                        <div className="flex items-center space-x-1">
                          {timeSlots.slice(0, 7).map((time) => (
                            <div key={time} className="text-xs text-gray-500 w-12 sm:w-16 text-center flex-shrink-0">
                              {time}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <div className="flex items-center min-w-[80px]">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600">Admin</span>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            {timeSlots.slice(0, 7).map((time, index) => (
                              <div
                                key={time}
                                className={`w-12 h-6 sm:w-16 sm:h-8 border flex-shrink-0 ${
                                  index === 3 || index === 4
                                    ? 'bg-red-200 border-red-300'
                                    : 'bg-white border-gray-200'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={`
            fixed inset-y-0 right-0 z-50 w-72 sm:w-80 bg-white transform transition-transform duration-300 ease-in-out overflow-y-auto
            lg:relative lg:translate-x-0 lg:z-auto
            ${showSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            <div className="p-3 sm:p-4 lg:p-6 space-y-4">
              {/* Mobile Close Button */}
              <div className="lg:hidden flex justify-end">
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="bg-white rounded shadow-sm p-3 sm:p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned User <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex-1 border border-gray-300 rounded-l px-3 py-2 bg-blue-50 flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">{formData.assignedUser}</span>
                  </div>
                  <button className="border border-l-0 border-gray-300 px-3 py-2 bg-gray-50">
                    <ChevronDown size={16} />
                  </button>
                  <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded shadow-sm p-3 sm:p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
                <select
                  name="teams"
                  value={formData.teams}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="sales">Sales Team</option>
                  <option value="support">Support Team</option>
                </select>
              </div>

              <div className="bg-white rounded shadow-sm p-3 sm:p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Users</label>
                    <select
                      name="users"
                      value={formData.users}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Contacts</label>
                    <select
                      name="contacts"
                      value={formData.contacts}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="contact1">Contact 1</option>
                      <option value="contact2">Contact 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Leads</label>
                    <select
                      name="leads"
                      value={formData.leads}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="lead1">Lead 1</option>
                      <option value="lead2">Lead 2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t px-3 sm:px-4 md:px-6 py-3">
          <div className="text-xs text-gray-500">© 2025 EspoCRM</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex-1">
      {/* Header */}
      <div className="bg-white border-b px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex items-center">
            <span className="text-blue-500 text-lg sm:text-xl mr-2">📞</span>
            <h1 className="text-lg sm:text-xl font-medium">Calls</h1>
          </div>
          <button
            onClick={() => setCallView('create')}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-2 sm:px-4 rounded text-sm hover:bg-gray-50 flex items-center justify-center sm:justify-start"
          >
            <Plus size={16} className="mr-1" />
            Create Call
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b px-2 sm:px-4 md:px-6 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <select className="border border-gray-300 rounded sm:rounded-l sm:rounded-r-none px-3 py-2 bg-white text-sm w-full sm:w-auto">
            <option>All</option>
          </select>
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border border-gray-300 sm:border-t sm:border-b sm:border-l-0 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="border border-gray-300 px-3 py-2 bg-gray-50">
              <Search size={16} />
            </button>
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 p-2 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
            <button className="text-gray-400 p-2 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 md:p-6">
        {calls.length === 0 ? (
          <div className="bg-white rounded shadow-sm">
            <div className="p-6 sm:p-8 text-center text-gray-500">
              No Data
            </div>
          </div>
        ) : (
          <div className="bg-white rounded shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Direction</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date Start</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Parent</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Assigned User</th>
                  </tr>
                </thead>
                <tbody>
                  {calls.map((call, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer text-sm">
                        {call.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          call.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                          call.status === 'Held' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-sm">{call.direction}</td>
                      <td className="py-3 px-4 text-gray-700 text-sm">
                        {call.dateStart} {call.timeStart}
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-sm">{call.parent || '-'}</td>
                      <td className="py-3 px-4 text-gray-700 text-sm">{call.assignedUser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 border-t bg-gray-50 gap-2">
              <div className="text-sm text-gray-500 text-center sm:text-left">
                0 / 0
              </div>
              <div className="flex items-center justify-center space-x-1">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Call;