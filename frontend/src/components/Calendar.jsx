import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Plus, Bell, MoreHorizontal, RotateCcw, Edit, ChevronDown, X, Clock, User, Tag } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 27)); // July 27, 2025
  const [viewMode, setViewMode] = useState('Week');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [createType, setCreateType] = useState('Meeting');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    status: 'Planned',
    direction: 'Outbound',
    priority: 'Normal',
    dateStart: '',
    timeStart: '09:00',
    dateEnd: '',
    timeEnd: '10:00',
    duration: '1h',
    parent: '',
    description: '',
    assignedUser: 'Admin',
    teams: '',
    users: '',
    contacts: '',
    leads: ''
  });

  // Reset form when type changes
  useEffect(() => {
    if (createType === 'Meeting') {
      setFormData(prev => ({
        ...prev,
        status: 'Planned',
        duration: '1h'
      }));
    } else if (createType === 'Call') {
      setFormData(prev => ({
        ...prev,
        status: 'Planned',
        direction: 'Outbound',
        duration: '5m'
      }));
    } else if (createType === 'Task') {
      setFormData(prev => ({
        ...prev,
        status: 'Not Started',
        priority: 'Normal'
      }));
    }
  }, [createType]);

  // Get the week dates starting from the current date
  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };

  // Get month calendar data
  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const monthDates = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      monthDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return monthDates;
  };

  const weekDates = getWeekDates(currentDate);
  const monthDates = getMonthDates(currentDate);
  
  // Format date for input fields
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Handle cell click
  const handleCellClick = (date, time = null) => {
    setSelectedDate(date);
    setSelectedTime(time);
    const formattedDate = formatDateForInput(date);
    
    setFormData(prev => ({
      ...prev,
      dateStart: formattedDate,
      dateEnd: formattedDate,
      timeStart: time || '09:00',
      timeEnd: time ? calculateEndTime(time, prev.duration) : '10:00'
    }));
    
    setShowCreateForm(true);
  };

  // Calculate end time based on start time and duration
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    
    let durationMinutes = 60; // default 1 hour
    if (duration.includes('m')) {
      durationMinutes = parseInt(duration);
    } else if (duration.includes('h')) {
      const hourValue = parseFloat(duration);
      durationMinutes = hourValue * 60;
    }
    
    const endMinutes = startMinutes + durationMinutes;
    const endHours = Math.floor(endMinutes / 60) % 24;
    const endMins = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  // Update end time when start time or duration changes
  const updateEndTime = () => {
    if (formData.timeStart && formData.duration) {
      const newEndTime = calculateEndTime(formData.timeStart, formData.duration);
      setFormData(prev => ({
        ...prev,
        timeEnd: newEndTime
      }));
    }
  };

  useEffect(() => {
    updateEndTime();
  }, [formData.timeStart, formData.duration]);

  // Format month year for header
  const formatMonthYear = () => {
    if (viewMode === 'Month') {
      return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'Week') {
      const startMonth = weekDates[0].toLocaleString('default', { month: 'long', year: 'numeric' });
      const endMonth = weekDates[6].toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (startMonth === endMonth) {
        return startMonth;
      } else {
        return `${weekDates[0].toLocaleString('default', { month: 'long' })} ${weekDates[0].getFullYear()} – ${weekDates[6].toLocaleString('default', { month: 'long' })} ${weekDates[6].getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
  };

  // Navigate week/month
  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'Month') {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else if (viewMode === 'Week') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const timeSlots = [];
  for (let hour = 6; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const timelineSlots = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDayNumber = (date) => {
    return date.getDate().toString().padStart(2, '0');
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const dropdownItems = [
    { label: 'Day', hasIcon: false },
    { label: 'Meetings', hasIcon: true, checked: true },
    { label: 'Calls', hasIcon: true, checked: true },
    { label: 'Tasks', hasIcon: true, checked: true },
    { label: 'Create Shared View', hasIcon: false },
    { label: 'Working Time Calendars', hasIcon: false }
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save form data
  const handleSave = () => {
    console.log('Saving:', createType, formData);
    setShowCreateForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      status: createType === 'Task' ? 'Not Started' : 'Planned',
      direction: 'Outbound',
      priority: 'Normal',
      dateStart: '',
      timeStart: '09:00',
      dateEnd: '',
      timeEnd: '10:00',
      duration: createType === 'Call' ? '5m' : '1h',
      parent: '',
      description: '',
      assignedUser: 'Admin',
      teams: '',
      users: '',
      contacts: '',
      leads: ''
    });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Generate scheduler bars with proper positioning
  const generateSchedulerBars = () => {
    if (!formData.dateStart || !formData.timeStart) return [];
    
    const [startHours, startMinutes] = formData.timeStart.split(':').map(Number);
    const [endHours, endMinutes] = formData.timeEnd.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    // Total day is 24 hours = 1440 minutes
    const totalMinutes = 24 * 60;
    
    const leftPercent = (startTotalMinutes / totalMinutes) * 100;
    const widthPercent = ((endTotalMinutes - startTotalMinutes) / totalMinutes) * 100;
    
    return [{
      left: leftPercent,
      width: Math.max(widthPercent, 2),
      color: createType === 'Meeting' ? 'bg-blue-500' : createType === 'Call' ? 'bg-green-500' : 'bg-orange-500',
      title: formData.name || `${createType}`
    }];
  };

  // Create Form Component
  const CreateForm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Full Form
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Type Tabs */}
          <div className="flex items-center gap-6 mb-6">
            {['Meeting', 'Call', 'Task'].map((type) => (
              <button
                key={type}
                onClick={() => setCreateType(type)}
                className={`flex items-center gap-2 ${
                  createType === type ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  createType === type ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
                }`}>
                  {createType === type && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${createType.toLowerCase()} name`}
                />
              </div>

              {/* Status and Direction/Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {createType === 'Task' ? (
                      <>
                        <option value="Not Started">Not Started</option>
                        <option value="Started">Started</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Deferred">Deferred</option>
                      </>
                    ) : (
                      <>
                        <option value="Planned">Planned</option>
                        <option value="Held">Held</option>
                        <option value="Not Held">Not Held</option>
                      </>
                    )}
                  </select>
                </div>
                
                {createType === 'Call' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Direction
                    </label>
                    <select
                      value={formData.direction}
                      onChange={(e) => handleInputChange('direction', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Outbound">Outbound</option>
                      <option value="Inbound">Inbound</option>
                    </select>
                  </div>
                )}

                {createType === 'Task' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Date and Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {createType === 'Task' ? 'Date Start' : 'Date Start *'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={formData.dateStart}
                      onChange={(e) => handleInputChange('dateStart', e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {createType !== 'Task' && (
                      <input
                        type="time"
                        value={formData.timeStart}
                        onChange={(e) => handleInputChange('timeStart', e.target.value)}
                        className="border border-gray-300 rounded px-0 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                    {createType === 'Task' && (
                      <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>None</option>
                      </select>
                    )}
                  </div>
                </div>

                {createType !== 'Task' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {createType === 'Call' && (
                        <>
                          <option value="5m">5m</option>
                          <option value="10m">10m</option>
                        </>
                      )}
                      <option value="15m">15m</option>
                      <option value="30m">30m</option>
                      <option value="45m">45m</option>
                      <option value="1h">1h</option>
                      <option value="1.5h">1h 30m</option>
                      <option value="2h">2h</option>
                      <option value="3h">3h</option>
                      <option value="4h">4h</option>
                    </select>
                  </div>
                )}

                {createType === 'Task' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Due
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={formData.dateEnd}
                        onChange={(e) => handleInputChange('dateEnd', e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {createType !== 'Task' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date End *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={formData.dateEnd}
                      onChange={(e) => handleInputChange('dateEnd', e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="time"
                      value={formData.timeEnd}
                      onChange={(e) => handleInputChange('timeEnd', e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Parent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent
                </label>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Account</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Select"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${createType.toLowerCase()} description`}
                />
              </div>

              {/* Scheduler */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Scheduler
                </label>
                <div className="border border-gray-300 rounded p-4 bg-gray-50">
                  <div className="text-sm text-gray-600 mb-3">
                    {formData.dateStart ? new Date(formData.dateStart).getFullYear() : '2025'}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      A
                    </div>
                    <span className="text-sm text-gray-700">{formData.assignedUser}</span>
                  </div>
                  <div className="relative h-10 bg-white border border-gray-200 rounded overflow-hidden">
                    {/* Time markers */}
                    <div className="absolute inset-0 flex">
                      {[0, 4, 8, 12, 16, 20, 24].map((hour, index) => (
                        <div
                          key={hour}
                          className="border-l border-gray-200 text-xs text-gray-500 pl-1"
                          style={{ width: '14.28%' }}
                        >
                          {hour < 24 && `${hour}:00`}
                        </div>
                      ))}
                    </div>
                    
                    {/* Event bars */}
                    {generateSchedulerBars().map((bar, index) => (
                      <div
                        key={index}
                        className={`absolute top-1 h-8 ${bar.color} rounded text-white text-xs flex items-center justify-center font-medium shadow-sm`}
                        style={{ 
                          left: `${bar.left}%`, 
                          width: `${Math.max(bar.width, 3)}%`,
                          minWidth: '30px'
                        }}
                        title={`${bar.title} (${formData.timeStart} - ${formData.timeEnd})`}
                      >
                        {bar.width > 8 && (
                          <span className="truncate px-1">{bar.title}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned User *
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50">
                    <div className="w-5 h-5 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm">Admin</span>
                  </div>
                  <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teams
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Select"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attendees
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Users</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Select"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Contacts</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Select"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Leads</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Select"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-2 py-2 border border-gray-300 rounded hover:bg-gray-50">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Month View
  const renderMonthView = () => (
    <div className="flex-1 bg-white">
      <div className="grid grid-cols-7 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 sm:p-4 text-center font-medium text-gray-700 border-r last:border-r-0 text-xs sm:text-sm">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {monthDates.map((date, index) => (
          <div 
            key={index} 
            onClick={() => handleCellClick(date)}
            className={`min-h-[80px] sm:min-h-[100px] md:min-h-[120px] border-r border-b last:border-r-0 p-1 sm:p-2 hover:bg-blue-50 cursor-pointer transition-colors ${
              !isCurrentMonth(date) ? 'text-gray-400 bg-gray-50' : ''
            }`}
          >
            <div className={`text-xs sm:text-sm ${isToday(date) ? 'bg-blue-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mx-auto sm:mx-0' : ''}`}>
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Week View
  const renderWeekView = () => (
    <div className="flex-1 bg-white">
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 sm:p-4 border-r bg-gray-50"></div>
        {weekDates.map((date, index) => (
          <div key={index} className="p-2 sm:p-4 text-center border-r last:border-r-0">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">
              <div className="hidden sm:block">
                {getDayName(date)} {getDayNumber(date)}
              </div>
              <div className="sm:hidden">
                <div className="text-xs">{getDayName(date).charAt(0)}</div>
                <div className={`text-xs font-semibold ${isToday(date) ? 'bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto' : ''}`}>
                  {getDayNumber(date)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {timeSlots.map((time, timeIndex) => (
          <div key={timeIndex} className="grid grid-cols-8 border-b last:border-b-0 min-h-[40px] sm:min-h-[50px] md:min-h-[60px]">
            <div className="p-1 sm:p-3 border-r bg-gray-50 text-xs sm:text-sm text-gray-600 font-medium flex items-center justify-end pr-3">
              <span className="hidden sm:block">{time}</span>
              <span className="sm:hidden">{time.split(':')[0]}</span>
            </div>
            {weekDates.map((date, dayIndex) => (
              <div 
                key={`${timeIndex}-${dayIndex}`}
                onClick={() => handleCellClick(date, time)}
                className="border-r last:border-r-0 hover:bg-blue-50 cursor-pointer transition-colors duration-150 min-h-[40px] sm:min-h-[50px] md:min-h-[60px]"
              >
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Timeline View
  const renderTimelineView = () => (
    <div className="flex-1 bg-white">
      <div className="border-b p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4 flex-wrap">
          <button className="p-1 hover:bg-gray-100 rounded">
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>
          <span className="text-xs sm:text-sm text-gray-700">Today</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-700">Shared</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'long' 
          })}
        </div>
        
        <div className="flex border-b overflow-x-auto">
          {timelineSlots.map((time, index) => (
            <div 
              key={index} 
              onClick={() => handleCellClick(currentDate, time)}
              className="flex-1 min-w-[50px] sm:min-w-[80px] text-center text-xs sm:text-sm text-gray-600 py-2 whitespace-nowrap hover:bg-blue-50 cursor-pointer"
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
            A
          </div>
          <span className="text-xs sm:text-sm text-gray-700">Admin</span>
        </div>
        
        <div className="relative overflow-x-auto">
          {/* Timeline grid */}
          <div className="grid grid-cols-6 gap-0 min-h-[40px] sm:min-h-[60px] border border-gray-200 rounded min-w-[300px] relative">
            {timelineSlots.slice(0, -1).map((time, index) => (
              <div 
                key={index} 
                onClick={() => handleCellClick(currentDate, time)}
                className="border-r last:border-r-0 hover:bg-blue-50 cursor-pointer transition-colors duration-150 min-w-[50px] relative"
              >
                <div className="absolute bottom-0 left-0 text-xs text-gray-500 p-1">
                  {time}
                </div>
              </div>
            ))}
            
            {/* Render scheduled events on timeline */}
            {generateSchedulerBars().map((bar, index) => (
              <div
                key={index}
                className={`absolute top-2 h-6 sm:h-8 ${bar.color} opacity-80 rounded text-white text-xs flex items-center justify-center font-medium shadow-sm z-10`}
                style={{ 
                  left: `${bar.left}%`, 
                  width: `${Math.max(bar.width, 5)}%`,
                  minWidth: '30px'
                }}
                title={`${bar.title} (${formData.timeStart} - ${formData.timeEnd})`}
              >
                {bar.width > 10 && (
                  <span className="truncate px-1">{bar.title}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
            
            <button
              onClick={goToToday}
              className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Today
            </button>

            <h1 className="text-base sm:text-xl font-medium text-gray-900 ml-2 sm:ml-4 truncate">
              <span className="hidden md:inline">{formatMonthYear()}</span>
              <span className="md:hidden text-sm">{currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('Month')}
                className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded ${viewMode === 'Month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <span className="hidden sm:inline">Month</span>
                <span className="sm:hidden">M</span>
              </button>
              <button
                onClick={() => setViewMode('Week')}
                className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded ${viewMode === 'Week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <span className="hidden sm:inline">Week</span>
                <span className="sm:hidden">W</span>
              </button>
              <button
                onClick={() => setViewMode('Timeline')}
                className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded ${viewMode === 'Timeline' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <span className="hidden sm:inline">Timeline</span>
                <span className="sm:hidden">T</span>
              </button>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {dropdownItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {index === 4 && <hr className="border-gray-200" />}
                      <button className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between">
                        <span className="truncate pr-2">{item.label}</span>
                        {item.hasIcon && item.checked && (
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Add Create Button */}
            <button
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                setFormData(prev => ({
                  ...prev,
                  dateStart: formatDateForInput(today),
                  dateEnd: formatDateForInput(today)
                }));
                setShowCreateForm(true);
              }}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      {viewMode === 'Month' && renderMonthView()}
      {viewMode === 'Week' && renderWeekView()}
      {viewMode === 'Timeline' && renderTimelineView()}
      
      {/* Create Form Modal */}
      {showCreateForm && <CreateForm />}
      
      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default Calendar;