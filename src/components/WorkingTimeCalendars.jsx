import React, { useState } from 'react';
import { Search, Plus, ChevronDown, MoreHorizontal, Edit, Eye, X } from 'lucide-react';
import { Link } from "react-router-dom";


const WorkingTimeCalendars = () => {
  const [calendars, setCalendars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'view', 'edit'
  const [currentCalendar, setCurrentCalendar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    workdaySchedule: {
      startTime: '09:00',
      endTime: '17:00'
    },
    timeZone: 'Default - UTC',
    workingDays: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: false,
      sun: false
    },
    daySchedules: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    description: ''
  });

  const days = [
    { key: 'mon', label: 'Mon', fullLabel: 'Mon Schedule' },
    { key: 'tue', label: 'Tue', fullLabel: 'Tue Schedule' },
    { key: 'wed', label: 'Wed', fullLabel: 'Wed Schedule' },
    { key: 'thu', label: 'Thu', fullLabel: 'Thu Schedule' },
    { key: 'fri', label: 'Fri', fullLabel: 'Fri Schedule' },
    { key: 'sat', label: 'Sat', fullLabel: 'Sat Schedule' },
    { key: 'sun', label: 'Sun', fullLabel: 'Sun Schedule' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      workdaySchedule: {
        startTime: '09:00',
        endTime: '17:00'
      },
      timeZone: 'Default - UTC',
      workingDays: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false
      },
      daySchedules: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: []
      },
      description: ''
    });
  };

  const handleCreateCalendar = () => {
    setModalMode('create');
    setCurrentCalendar(null);
    resetForm();
    setShowModal(true);
  };

  const handleViewCalendar = (calendar) => {
    setModalMode('view');
    setCurrentCalendar(calendar);
    setFormData({ ...calendar });
    setShowModal(true);
  };

  const handleEditCalendar = (calendar) => {
    setModalMode('edit');
    setCurrentCalendar(calendar);
    setFormData({ ...calendar });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newCalendar = {
        id: calendars.length + 1,
        ...formData
      };
      setCalendars([...calendars, newCalendar]);
    } else if (modalMode === 'edit') {
      setCalendars(calendars.map(calendar => 
        calendar.id === currentCalendar.id 
          ? { ...calendar, ...formData }
          : calendar
      ));
    }
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleWorkingDayChange = (day, checked) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: checked
      }
    }));
  };

  const addScheduleToDay = (day) => {
    const startTime = prompt('Enter start time (HH:MM):');
    const endTime = prompt('Enter end time (HH:MM):');
    if (startTime && endTime) {
      setFormData(prev => ({
        ...prev,
        daySchedules: {
          ...prev.daySchedules,
          [day]: [...prev.daySchedules[day], { startTime, endTime }]
        }
      }));
    }
  };

  const removeScheduleFromDay = (day, index) => {
    setFormData(prev => ({
      ...prev,
      daySchedules: {
        ...prev.daySchedules,
        [day]: prev.daySchedules[day].filter((_, i) => i !== index)
      }
    }));
  };

  const filteredCalendars = calendars.filter(calendar => 
    calendar.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Working Time Calendars</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateCalendar}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Create Calendar
            </button>
            <Link
  to="/workingtimeexceptions"
  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm inline-block text-center"
>
  Exceptions
</Link>

          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm appearance-none">
              <option>All</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Search size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Calendars List */}
      <div className="px-6">
        {calendars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Data</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase">
                <div className="col-span-6">Name</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {filteredCalendars.map((calendar) => (
              <div key={calendar.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 group">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <span className="text-sm font-medium text-gray-900">{calendar.name}</span>
                  </div>
                  <div className="col-span-5 text-sm text-gray-600">
                    {calendar.description || ''}
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                      <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronDown size={16} />
                      </button>
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 min-w-24 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                        <button
                          onClick={() => handleViewCalendar(calendar)}
                          className="w-full px-3 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => handleEditCalendar(calendar)}
                          className="w-full px-3 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-gray-500">0 / 0</span>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400">
              <ChevronDown className="rotate-90" size={16} />
            </button>
            <button className="p-1 text-gray-400">
              <ChevronDown className="-rotate-90" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">Working Time Calendars</span>
                <span className="text-gray-400">›</span>
                <span className="text-gray-600">
                  {modalMode === 'create' ? 'create' : modalMode === 'view' ? 'view' : 'edit'}
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={modalMode === 'view'}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  {/* Workday Schedule */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Workday Schedule <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={formData.workdaySchedule.startTime}
                        onChange={(e) => handleInputChange('workdaySchedule.startTime', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="time"
                        value={formData.workdaySchedule.endTime}
                        onChange={(e) => handleInputChange('workdaySchedule.endTime', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                      {modalMode !== 'view' && (
                        <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                          <X size={16} />
                        </button>
                      )}
                      {modalMode !== 'view' && (
                        <button
                          onClick={() => {
                            // Add new schedule row
                          }}
                          className="p-2 text-blue-600 hover:text-blue-700"
                        >
                          <Plus size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Days Checkboxes */}
                  <div className="grid grid-cols-1 gap-3">
                    {days.map((day) => (
                      <div key={day.key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={day.key}
                          checked={formData.workingDays[day.key]}
                          onChange={(e) => handleWorkingDayChange(day.key, e.target.checked)}
                          disabled={modalMode === 'view'}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                        />
                        <label htmlFor={day.key} className="ml-2 text-sm text-gray-700 w-8">
                          {day.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      disabled={modalMode === 'view'}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Time Zone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone
                    </label>
                    <div className="relative">
                      <select
                        value={formData.timeZone}
                        onChange={(e) => handleInputChange('timeZone', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 appearance-none"
                      >
                        <option>Default - UTC</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                        <option>Asia/Tokyo</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Day Schedules */}
                  {days.map((day) => (
                    <div key={day.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {day.fullLabel}
                      </label>
                      <div className="space-y-2">
                        {formData.daySchedules[day.key].map((schedule, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="time"
                              value={schedule.startTime}
                              disabled={modalMode === 'view'}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="time"
                              value={schedule.endTime}
                              disabled={modalMode === 'view'}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                            {modalMode !== 'view' && (
                              <button
                                onClick={() => removeScheduleFromDay(day.key, index)}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        {modalMode !== 'view' && (
                          <button
                            onClick={() => addScheduleToDay(day.key)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Plus size={16} />
                            Add schedule
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkingTimeCalendars;