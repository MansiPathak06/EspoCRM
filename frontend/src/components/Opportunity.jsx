import React, { useState } from 'react';
import { Search, Plus, Calendar, DollarSign, Users, MoreHorizontal, ChevronDown, X, IndianRupee, TrendingUp } from 'lucide-react';

const Opportunity = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    account: '',
    assignedUser: '',
    stage: 'Prospecting',
    amount: '',
    closeDate: '',
    probability: '10',
    contacts: '',
    leadSource: '',
    teams: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (date) => {
    handleInputChange('closeDate', date);
    setShowCalendar(false);
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSave = () => {
    console.log('Saving opportunity:', formData);
    // Add save logic here
    setCurrentView('list');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setFormData({
      name: '',
      account: '',
      assignedUser: '',
      stage: 'Prospecting',
      amount: '',
      closeDate: '',
      probability: '10',
      contacts: '',
      leadSource: '',
      teams: '',
      description: ''
    });
  };

  // Simple Calendar Component
  const CalendarPicker = ({ onDateSelect, selectedDate, onClose }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = selectedDate === dateString;
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(dateString)}
          className={`p-2 text-sm rounded hover:bg-blue-100 transition-colors ${
            isSelected ? 'bg-blue-600 text-white' : 
            isToday ? 'bg-blue-100 text-blue-600 font-semibold' : 
            'text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </button>
          
          <h3 className="font-semibold text-gray-900">
            {months[currentMonth]} {currentYear}
          </h3>
          
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
        </div>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-xs font-medium text-gray-500 text-center">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end mt-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  if (currentView === 'create') {
    return (
      <div className="flex-1 bg-gray-50 p-3 sm:p-4 lg:p-6">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center text-sm text-gray-600 mb-3 sm:mb-4">
            <span className="text-green-600">Opportunities</span>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={handleSave}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                <div className="relative">
                  <select
                    value={formData.stage}
                    onChange={(e) => handleInputChange('stage', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Prospecting">Prospecting</option>
                    <option value="Qualification">Qualification</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Closed Lost">Closed Lost</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Probability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Probability, %</label>
                <input
                  type="number"
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Contacts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contacts</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select"
                    value={formData.contacts}
                    onChange={(e) => handleInputChange('contacts', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select"
                    value={formData.account}
                    onChange={(e) => handleInputChange('account', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">INR</span>
                </div>
              </div>

              {/* Close Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Close Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.closeDate}
                    onChange={(e) => handleInputChange('closeDate', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleCalendarToggle}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                  </button>
                  
                  {showCalendar && (
                    <CalendarPicker
                      selectedDate={formData.closeDate}
                      onDateSelect={handleDateSelect}
                      onClose={() => setShowCalendar(false)}
                    />
                  )}
                </div>
              </div>

              {/* Lead Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                <div className="relative">
                  <select
                    value={formData.leadSource}
                    onChange={(e) => handleInputChange('leadSource', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Website">Website</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6 md:col-span-2 lg:col-span-1">
              {/* Assigned User */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned User</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select"
                    value={formData.assignedUser}
                    onChange={(e) => handleInputChange('assignedUser', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Teams */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select"
                    value={formData.teams}
                    onChange={(e) => handleInputChange('teams', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-4 sm:mt-6 md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // List View (No Data State)
  return (
    <div className="flex-1 bg-gray-50 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Opportunities</h1>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Create Button */}
          <button
            onClick={() => setCurrentView('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <Plus size={16} />
            Create
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Stream Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Stream</h2>
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-2">
                <TrendingUp size={40} className="sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
              </div>
              <p className="text-gray-500 text-sm sm:text-base">No Data</p>
            </div>
          </div>
        </div>

        {/* My Activities Section */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">My Activities</h2>
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-2">
                <Users size={40} className="sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
              </div>
              <p className="text-gray-500 text-sm sm:text-base">No Data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-2 mr-3 flex-shrink-0">
              <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Total Value</p>
              <p className="text-base sm:text-lg font-semibold">₹0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-2 mr-3 flex-shrink-0">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Open Opportunities</p>
              <p className="text-base sm:text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-2 mr-3 flex-shrink-0">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">This Month</p>
              <p className="text-base sm:text-lg font-semibold">₹0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-lg p-2 mr-3 flex-shrink-0">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Closed Won</p>
              <p className="text-base sm:text-lg font-semibold">₹0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunity;