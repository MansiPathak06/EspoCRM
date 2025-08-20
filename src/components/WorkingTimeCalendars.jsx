import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const WorkingTimeCalendars = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    workdaySchedule: [{ from: '', to: '' }],
    timezone: 'Default - UTC',
    description: ''
  });

  const [weekdays, setWeekdays] = useState({
    Mon: { enabled: true, schedules: [{ from: '', to: '' }] },
    Tue: { enabled: true, schedules: [{ from: '', to: '' }] },
    Wed: { enabled: true, schedules: [{ from: '', to: '' }] },
    Thu: { enabled: true, schedules: [{ from: '', to: '' }] },
    Fri: { enabled: true, schedules: [{ from: '', to: '' }] },
    Sat: { enabled: true, schedules: [{ from: '', to: '' }] },
    Sun: { enabled: true, schedules: [{ from: '', to: '' }] }
  });

  const addWorkdaySchedule = () => {
    setFormData(prev => ({
      ...prev,
      workdaySchedule: [...prev.workdaySchedule, { from: '', to: '' }]
    }));
  };

  const removeWorkdaySchedule = (index) => {
    setFormData(prev => ({
      ...prev,
      workdaySchedule: prev.workdaySchedule.filter((_, i) => i !== index)
    }));
  };

  const updateWorkdaySchedule = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      workdaySchedule: prev.workdaySchedule.map((schedule, i) => 
        i === index ? { ...schedule, [field]: value } : schedule
      )
    }));
  };

  const toggleWeekday = (day) => {
    setWeekdays(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const addDaySchedule = (day) => {
    setWeekdays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        schedules: [...prev[day].schedules, { from: '', to: '' }]
      }
    }));
  };

  const removeDaySchedule = (day, index) => {
    setWeekdays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        schedules: prev[day].schedules.filter((_, i) => i !== index)
      }
    }));
  };

  const updateDaySchedule = (day, index, field, value) => {
    setWeekdays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        schedules: prev[day].schedules.map((schedule, i) => 
          i === index ? { ...schedule, [field]: value } : schedule
        )
      }
    }));
  };

  const dayNames = {
    Mon: 'Mon Schedule',
    Tue: 'Tue Schedule', 
    Wed: 'Wed Schedule',
    Thu: 'Thu Schedule',
    Fri: 'Fri Schedule',
    Sat: 'Sat Schedule',
    Sun: 'Sun Schedule'
  };

  const navigateToExceptions = () => {
    // Navigate to WorkingTimeExceptions.jsx
    window.location.href = '/workingtimeexceptions';
  };

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl text-gray-600">Working Time Calendars</h1>
              <div className="flex gap-3">
                <button 
                  onClick={() => setCurrentView('create')}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Create Calendar
                </button>
                <button 
                  onClick={navigateToExceptions}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Exceptions
                </button>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-end text-sm text-gray-500">
              <span className="mr-4">0 / 0</span>
              <button className="p-1 text-gray-400 hover:text-gray-600 mr-1">
                ‹
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                ›
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">No Data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <button 
              onClick={() => setCurrentView('list')}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Working Time Calendars
            </button>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          <div className="flex gap-3 mb-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Save
            </button>
            <button 
              onClick={() => setCurrentView('list')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-500 hover:text-gray-700 px-2 py-2"
              >
                •••
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-48">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Save & Continue Editing
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Save & New
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Workday Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workday Schedule <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {formData.workdaySchedule.map((schedule, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="time"
                            value={schedule.from}
                            onChange={(e) => updateWorkdaySchedule(index, 'from', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-gray-500">–</span>
                          <input
                            type="time"
                            value={schedule.to}
                            onChange={(e) => updateWorkdaySchedule(index, 'to', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {formData.workdaySchedule.length > 1 && (
                            <button
                              onClick={() => removeWorkdaySchedule(index)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addWorkdaySchedule}
                        className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm"
                      >
                        <Plus size={16} className="mr-1" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Default - UTC</option>
                    </select>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="space-y-4">
                  {Object.entries(weekdays).map(([day, data]) => (
                    <div key={day} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      {/* Day Checkbox */}
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={day}
                          checked={data.enabled}
                          onChange={() => toggleWeekday(day)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={day} className="text-sm font-medium text-gray-700">
                          {day}
                        </label>
                      </div>

                      {/* Day Schedule */}
                      {data.enabled && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{dayNames[day]}</span>
                          </div>
                          <div className="space-y-2">
                            {data.schedules.map((schedule, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={schedule.from}
                                  onChange={(e) => updateDaySchedule(day, index, 'from', e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <span className="text-gray-500">–</span>
                                <input
                                  type="time"
                                  value={schedule.to}
                                  onChange={(e) => updateDaySchedule(day, index, 'to', e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {data.schedules.length > 1 && (
                                  <button
                                    onClick={() => removeDaySchedule(day, index)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                  >
                                    <X size={16} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={() => addDaySchedule(day)}
                              className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm"
                            >
                              <Plus size={16} className="mr-1" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column - Empty in original design */}
              <div className="lg:col-span-1">
                {/* This space matches the original layout */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © 2023 EspoCRM
        </div>
      </div>
    </div>
  );
};

export default WorkingTimeCalendars;