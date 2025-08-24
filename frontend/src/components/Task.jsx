import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Calendar, Clock, Paperclip, Folder, ChevronDown, ChevronUp, X, User } from 'lucide-react';

const Task = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Normal');
  const [dateStart, setDateStart] = useState('');
  const [dateDue, setDateDue] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUser, setAssignedUser] = useState('Admin');
  const [parent, setParent] = useState('');
  const [team, setTeam] = useState('');

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showParentDropdown, setShowParentDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const statusOptions = ['Not Started', 'In Progress', 'Completed', 'Deferred', 'Cancelled'];
  const priorityOptions = ['Low', 'Normal', 'High', 'Urgent'];
  const parentOptions = ['Account', 'Contact', 'Lead', 'Opportunity'];
  const teamOptions = ['Sales Team', 'Marketing Team', 'Support Team', 'Development Team'];

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving task:', {
      taskName,
      status,
      priority,
      dateStart,
      dateDue,
      description,
      assignedUser,
      parent,
      team
    });
    // Reset form and go back to list view
    setIsCreating(false);
    resetForm();
  };

  const handleCancel = () => {
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setStatus('Not Started');
    setPriority('Normal');
    setDateStart('');
    setDateDue('');
    setDescription('');
    setParent('');
    setTeam('');
  };

  const CustomDropdown = ({ 
    value, 
    options, 
    isOpen, 
    setIsOpen, 
    onChange, 
    placeholder = "Select" 
  }) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  if (isCreating) {
    return (
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsCreating(false)}
            >
              Tasks
            </span>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Create Task</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task name"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <CustomDropdown
                    value={status}
                    options={statusOptions}
                    isOpen={showStatusDropdown}
                    setIsOpen={setShowStatusDropdown}
                    onChange={setStatus}
                  />
                </div>

                {/* Date Start */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Start</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="date"
                        value={dateStart}
                        onChange={(e) => setDateStart(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Clock className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Date Due */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Due</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="date"
                        value={dateDue}
                        onChange={(e) => setDateDue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Clock className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                {/* Parent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                  <div className="flex gap-2">
                    <CustomDropdown
                      value="Account"
                      options={parentOptions}
                      isOpen={showParentDropdown}
                      setIsOpen={setShowParentDropdown}
                      onChange={() => {}}
                      placeholder="Account"
                    />
                    <input
                      type="text"
                      value={parent}
                      onChange={(e) => setParent(e.target.value)}
                      placeholder="Select"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <CustomDropdown
                    value={priority}
                    options={priorityOptions}
                    isOpen={showPriorityDropdown}
                    setIsOpen={setShowPriorityDropdown}
                    onChange={setPriority}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Assigned User */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned User <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
                        A
                      </div>
                      <span className="text-gray-700">{assignedUser}</span>
                    </div>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Teams */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
                  <CustomDropdown
                    value={team}
                    options={teamOptions}
                    isOpen={showTeamDropdown}
                    setIsOpen={setShowTeamDropdown}
                    onChange={setTeam}
                    placeholder="Select"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter task description..."
              />
            </div>

            {/* Attachments */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Folder className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Tasks List View (Empty State)
  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              All
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Search className="w-4 h-4" />
          </button>

          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-600">0 / 0</div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data</h3>
          <p className="text-gray-500 mb-4">
            No tasks found. Create your first task to get started.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;