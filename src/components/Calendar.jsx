import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Plus, Bell, MoreHorizontal, RotateCcw, Edit, ChevronDown } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 27)); // July 27, 2025
  const [viewMode, setViewMode] = useState('Week');
  const [showDropdown, setShowDropdown] = useState(false);

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
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Start from Sunday of the week containing the first day
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const monthDates = [];
    const currentDate = new Date(startDate);
    
    // Generate 6 weeks (42 days)
    for (let i = 0; i < 42; i++) {
      monthDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return monthDates;
  };

  const weekDates = getWeekDates(currentDate);
  const monthDates = getMonthDates(currentDate);
  
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
      // Timeline view
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
      // Timeline - navigate by day
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Time slots from 06:00 to 18:00
  const timeSlots = [];
  for (let hour = 6; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  // Timeline time slots (every 4 hours)
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

  // Dropdown menu items
  const dropdownItems = [
    { label: 'Day', hasIcon: false },
    { label: 'Meetings', hasIcon: true, checked: true },
    { label: 'Calls', hasIcon: true, checked: true },
    { label: 'Tasks', hasIcon: true, checked: true },
    { label: 'Create Shared View', hasIcon: false },
    { label: 'Working Time Calendars', hasIcon: false }
  ];

  // Month View
  const renderMonthView = () => (
    <div className="flex-1 bg-white">
      {/* Month header */}
      <div className="grid grid-cols-7 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 sm:p-4 text-center font-medium text-gray-700 border-r last:border-r-0 text-xs sm:text-sm">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7">
        {monthDates.map((date, index) => (
          <div 
            key={index} 
            className={`min-h-[80px] sm:min-h-[100px] md:min-h-[120px] border-r border-b last:border-r-0 p-1 sm:p-2 hover:bg-gray-50 cursor-pointer ${
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
      {/* Week header */}
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
                <div className="text-xs font-semibold">{getDayNumber(date)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time slots grid */}
      <div className="flex-1 overflow-auto">
        {timeSlots.map((time, timeIndex) => (
          <div key={timeIndex} className="grid grid-cols-8 border-b last:border-b-0 min-h-[40px] sm:min-h-[50px] md:min-h-[60px]">
            <div className="p-1 sm:p-3 border-r bg-gray-50 text-xs sm:text-sm text-gray-600 font-medium flex items-center">
              <span className="hidden sm:block">{time}</span>
              <span className="sm:hidden">{time.split(':')[0]}</span>
            </div>
            {weekDates.map((date, dayIndex) => (
              <div 
                key={`${timeIndex}-${dayIndex}`}
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
      {/* Timeline header */}
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
        
        {/* Date header */}
        <div className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          Sun 27 July
        </div>
        
        {/* Time scale */}
        <div className="flex border-b overflow-x-auto">
          {timelineSlots.map((time, index) => (
            <div key={index} className="flex-1 min-w-[50px] sm:min-w-[80px] text-center text-xs sm:text-sm text-gray-600 py-2 whitespace-nowrap">
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline content */}
      <div className="p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
            A
          </div>
          <span className="text-xs sm:text-sm text-gray-700">Admin</span>
        </div>
        
        {/* Timeline grid */}
        <div className="mt-2 sm:mt-4 relative overflow-x-auto">
          <div className="grid grid-cols-6 gap-0 min-h-[40px] sm:min-h-[60px] border border-gray-200 rounded min-w-[300px]">
            {timelineSlots.slice(0, -1).map((time, index) => (
              <div 
                key={index} 
                className="border-r last:border-r-0 hover:bg-blue-50 cursor-pointer transition-colors duration-150 min-w-[50px]"
              >
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
          {/* Left side - Navigation */}
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

          {/* Right side - View modes and actions */}
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
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      {viewMode === 'Month' && renderMonthView()}
      {viewMode === 'Week' && renderWeekView()}
      {viewMode === 'Timeline' && renderTimelineView()}
      
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