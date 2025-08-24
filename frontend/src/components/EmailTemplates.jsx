import React, { useState, useRef } from 'react';
import { Search, Plus, MoreHorizontal, X, ChevronDown, ChevronUp, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link, Image, Paperclip, Code, Type, List, ListOrdered, Info } from 'lucide-react';

const EmailTemplates = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState('Person');
  const [selectedPlaceholderField, setSelectedPlaceholderField] = useState('Name');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    oneOff: false,
    assignedUser: '',
    category: '',
    teams: '',
    subject: '',
    placeholders: 'Person',
    body: '',
    html: true
  });

  const placeholderOptions = {
    'Person': ['Name', 'First Name', 'Last Name', 'Salutation', 'Email'],
    'Call': ['Subject', 'Start Date', 'End Date', 'Duration', 'Status'],
    'Account': ['Account Name', 'Industry', 'Phone', 'Website', 'Revenue'],
    'Campaign': ['Campaign Name', 'Status', 'Type', 'Start Date', 'End Date'],
    'Case': ['Case Number', 'Subject', 'Status', 'Priority', 'Origin'],
    'Contact': ['First Name', 'Last Name', 'Email', 'Phone', 'Title'],
    'Document': ['Document Name', 'Type', 'Size', 'Created Date', 'Modified Date'],
    'Knowledge Base Article': ['Title', 'Category', 'Status', 'Created Date', 'Author'],
    'Lead': ['First Name', 'Last Name', 'Company', 'Email', 'Phone'],
    'Meeting': ['Subject', 'Start Date', 'End Date', 'Location', 'Attendees'],
    'Opportunity': ['Opportunity Name', 'Stage', 'Amount', 'Close Date', 'Probability'],
    'Target List': ['List Name', 'Type', 'Description', 'Created Date', 'Members Count'],
    'Task': ['Subject', 'Status', 'Priority', 'Due Date', 'Assigned To'],
    'User': ['User Name', 'Email', 'First Name', 'Last Name', 'Role']
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceholderChange = (value) => {
    setSelectedPlaceholder(value);
    setSelectedPlaceholderField(placeholderOptions[value][0]);
  };

  const insertPlaceholder = () => {
    const placeholder = `{${selectedPlaceholder}.${selectedPlaceholderField}}`;
    setFormData(prev => ({
      ...prev,
      body: prev.body + placeholder
    }));
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSave = () => {
    console.log('Saving:', formData);
    setCurrentView('list');
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      oneOff: false,
      assignedUser: '',
      category: '',
      teams: '',
      subject: '',
      placeholders: 'Person',
      body: '',
      html: true
    });
    setCurrentView('list');
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-80">
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Form Content */}
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <button
                onClick={() => setCurrentView('list')}
                className="text-blue-500 hover:text-blue-700"
              >
                Email Templates
              </button>
              <span className="text-gray-400">›</span>
              <span className="text-gray-800">create</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* One-off */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        One-off
                        <Info className="ml-1 h-3 w-3 text-gray-400" />
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.oneOff}
                          onChange={(e) => handleInputChange('oneOff', e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setShowCategoryModal(true)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white flex items-center justify-between"
                        >
                          <span className={formData.category || 'text-gray-500'}>
                            {formData.category || 'Select'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                            {formData.category && (
                              <X 
                                className="h-4 w-4 text-gray-400 hover:text-gray-600" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInputChange('category', '');
                                }}
                              />
                            )}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Assigned User */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assigned User
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setShowUsersModal(true)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white flex items-center justify-between"
                        >
                          <span className={formData.assignedUser || 'text-gray-500'}>
                            {formData.assignedUser || 'Select'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                            {formData.assignedUser && (
                              <X 
                                className="h-4 w-4 text-gray-400 hover:text-gray-600" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInputChange('assignedUser', '');
                                }}
                              />
                            )}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teams
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setShowTeamsModal(true)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white flex items-center justify-between"
                        >
                          <span className={formData.teams || 'text-gray-500'}>
                            {formData.teams || 'Select'}
                          </span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Placeholders */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placeholders
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={selectedPlaceholder}
                        onChange={(e) => handlePlaceholderChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.keys(placeholderOptions).map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <select
                        value={selectedPlaceholderField}
                        onChange={(e) => setSelectedPlaceholderField(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {placeholderOptions[selectedPlaceholder].map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                      <button 
                        onClick={insertPlaceholder}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm"
                      >
                        Insert
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body
                    </label>
                    
                    {/* Rich Text Editor Toolbar */}
                    <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex items-center flex-wrap gap-1">
                      <button 
                        onClick={() => formatText('bold')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Bold size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('italic')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Italic size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('underline')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Underline size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <select 
                        onChange={(e) => formatText('fontSize', e.target.value)}
                        className="text-sm border-0 bg-transparent"
                      >
                        <option value="3">14</option>
                        <option value="4">16</option>
                        <option value="5">18</option>
                        <option value="6">24</option>
                      </select>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button 
                        onClick={() => formatText('foreColor', '#000000')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Type size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button 
                        onClick={() => formatText('insertUnorderedList')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <List size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('insertOrderedList')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <ListOrdered size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('justifyLeft')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <AlignLeft size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('justifyCenter')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <AlignCenter size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('justifyRight')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <AlignRight size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button 
                        onClick={() => formatText('createLink', prompt('Enter URL:'))}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Link size={16} />
                      </button>
                      <button 
                        onClick={() => formatText('insertImage', prompt('Enter image URL:'))}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Image size={16} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button 
                        onClick={() => formatText('formatBlock', 'pre')}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Code size={16} />
                      </button>
                    </div>

                    {/* Text Area */}
                    <div
                      contentEditable
                      className="w-full px-3 py-2 border-l border-r border-b border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-48"
                      style={{ minHeight: '12rem' }}
                      onInput={(e) => handleInputChange('body', e.target.innerHTML)}
                      dangerouslySetInnerHTML={{ __html: formData.body }}
                    />
                  </div>

                  {/* Bottom Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Attachments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attachments
                      </label>
                      <button 
                        onClick={handleFileUpload}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <Paperclip size={16} className="text-gray-400" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => console.log('Files selected:', e.target.files)}
                      />
                    </div>

                    {/* HTML */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        HTML
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.html}
                          onChange={(e) => handleInputChange('html', e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Info</h3>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Available placeholders:</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex flex-col">
                        <span className="font-mono text-blue-600">{'{today}'}</span>
                        <span className="text-gray-500 ml-2">– Today's date</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="font-mono text-blue-600">{'{now}'}</span>
                        <span className="text-gray-500 ml-2">– Current date & time</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="font-mono text-blue-600">{'{currentYear}'}</span>
                        <span className="text-gray-500 ml-2">– Current Year</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="font-mono text-blue-600">{'{optOutUrl}'}</span>
                        <span className="text-gray-500 ml-2">– URL for an unsubscribe link</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="font-mono text-blue-600">{'{optOutLink}'}</span>
                        <span className="text-gray-500 ml-2">– an unsubscribe link</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <Modal 
          isOpen={showCategoryModal} 
          onClose={() => setShowCategoryModal(false)}
          title="Select • Email Template Categories"
        >
          <div className="space-y-2">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="text-left text-sm text-gray-600 hover:bg-gray-50 w-full p-2 rounded"
            >
              Cancel
            </button>
            <div className="text-center text-gray-500 py-8">No Data</div>
          </div>
        </Modal>

        <Modal 
          isOpen={showTeamsModal} 
          onClose={() => setShowTeamsModal(false)}
          title="Select • Teams"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Select</button>
              <button
                onClick={() => setShowTeamsModal(false)}
                className="text-gray-600 hover:bg-gray-50 px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <select className="mt-2 px-3 py-1 border border-gray-300 rounded text-sm">
                <option>All</option>
              </select>
            </div>
            <div className="text-center text-gray-500 py-8">No Data</div>
          </div>
        </Modal>

        <Modal 
          isOpen={showUsersModal} 
          onClose={() => setShowUsersModal(false)}
          title="Select • Users"
        >
          <div className="space-y-2">
            <button
              onClick={() => setShowUsersModal(false)}
              className="text-left text-sm text-gray-600 hover:bg-gray-50 w-full p-2 rounded"
            >
              Cancel
            </button>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>Active</option>
                  <option>All</option>
                </select>
                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" id="myTeam" />
                  <label htmlFor="myTeam">Only My Team</label>
                </div>
              </div>
            </div>
            <div className="border rounded">
              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 text-sm font-medium">
                <div>User Name</div>
                <div>Email</div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-3 text-sm border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs">
                    A
                  </div>
                  <span>admin</span>
                </div>
                <div>admin</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Area */}
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-xl font-medium text-gray-800">Email Templates</h1>
            <button
              onClick={() => setCurrentView('create')}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center justify-center space-x-1 w-full sm:w-auto"
            >
              <Plus size={16} />
              <span>Create Email Template</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-lg mb-2">No Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;