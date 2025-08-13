import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, X, ChevronDown, ChevronUp } from 'lucide-react';

const LeadCapture = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [formData, setFormData] = useState({
    name: '',
    isActive: true,
    subscribeToTargetList: true,
    subscribeContact: true,
    targetTeam: '',
    campaign: '',
    targetList: '',
    leadSource: 'Web Site',
    duplicateCheck: true,
    payloadFields: ['First Name', 'Last Name', 'Email'],
    webForm: '',
    doubleOptIn: ''
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    targetTeam: false,
    campaign: false,
    targetList: false,
    leadSource: false
  });

  const handleCreateEntry = () => {
    setCurrentView('create');
  };

  const handleSave = () => {
    console.log('Saving lead capture entry:', formData);
    setCurrentView('list');
    // Reset form data
    setFormData({
      name: '',
      isActive: true,
      subscribeToTargetList: true,
      subscribeContact: true,
      targetTeam: '',
      campaign: '',
      targetList: '',
      leadSource: 'Web Site',
      duplicateCheck: true,
      payloadFields: ['First Name', 'Last Name', 'Email'],
      webForm: '',
      doubleOptIn: ''
    });
  };

  const handleCancel = () => {
    setCurrentView('list');
  };

  const handleAdministrationClick = () => {
    window.location.href = '/admin';
  };

  const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const toggleDropdown = (field) => {
    setDropdownOpen(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const addPayloadField = () => {
    console.log('Add payload field clicked');
  };

  const removePayloadField = (index) => {
    setFormData(prev => ({
      ...prev,
      payloadFields: prev.payloadFields.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <button 
            onClick={handleAdministrationClick}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            Administration
          </button>
          <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
          <span className="text-gray-600">Lead Capture</span>
          {currentView === 'create' && (
            <>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
              <span className="text-gray-600">create</span>
            </>
          )}
        </div>

        {/* List View */}
        {currentView === 'list' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Lead Capture</h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
                  />
                </div>
                {/* Create Button */}
                <button
                  onClick={handleCreateEntry}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Entry Point</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No Data</p>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">0 / 0</div>
              <div className="flex space-x-1">
                <button
                  onClick={() => navigateTo('prev')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('next')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create View */}
        {currentView === 'create' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 p-6 border-b border-gray-200">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => console.log('More options')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition-colors"
              >
                •••
              </button>
            </div>

            {/* Form */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Subscribe to Target List */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="subscribeToTargetList"
                    checked={formData.subscribeToTargetList}
                    onChange={() => handleCheckboxChange('subscribeToTargetList')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="subscribeToTargetList" className="text-sm text-gray-700">
                    Subscribe to Target List
                  </label>
                </div>

                {/* Subscribe Contact if exists */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="subscribeContact"
                    checked={formData.subscribeContact}
                    onChange={() => handleCheckboxChange('subscribeContact')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="subscribeContact" className="text-sm text-gray-700">
                    Subscribe Contact if exists
                  </label>
                </div>

                {/* Target Team */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Target Team</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.targetTeam}
                      onChange={(e) => handleInputChange('targetTeam', e.target.value)}
                      placeholder="Select"
                      className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex items-center space-x-1">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Duplicate Check */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="duplicateCheck"
                    checked={formData.duplicateCheck}
                    onChange={() => handleCheckboxChange('duplicateCheck')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="duplicateCheck" className="text-sm text-gray-700">
                    Duplicate Check
                  </label>
                </div>

                {/* Payload Fields */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Payload Fields <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {formData.payloadFields.map((field, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                        <span className="text-sm text-gray-700">{field}</span>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => removePayloadField(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addPayloadField}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Web Form */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Web Form</label>
                  <textarea
                    value={formData.webForm}
                    onChange={(e) => handleInputChange('webForm', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                {/* Double Opt-In */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Double Opt-In</label>
                  <textarea
                    value={formData.doubleOptIn}
                    onChange={(e) => handleInputChange('doubleOptIn', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Is Active */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={() => handleCheckboxChange('isActive')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Is Active
                  </label>
                </div>

                {/* Campaign */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Campaign</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.campaign}
                      onChange={(e) => handleInputChange('campaign', e.target.value)}
                      placeholder="Select"
                      className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex items-center space-x-1">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Target List */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Target List <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.targetList}
                      onChange={(e) => handleInputChange('targetList', e.target.value)}
                      placeholder="Select"
                      className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex items-center space-x-1">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lead Source */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Lead Source</label>
                  <div className="relative">
                    <select
                      value={formData.leadSource}
                      onChange={(e) => handleInputChange('leadSource', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                    >
                      <option value="Web Site">Web Site</option>
                      <option value="Email Campaign">Email Campaign</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Referral">Referral</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCapture;