import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  Star, 
  Send, 
  Archive, 
  FileText, 
  Trash2, 
  MoreHorizontal, 
  ChevronDown, 
  X, 
  Minimize2,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  AlignLeft,
  Type,
  Paperclip,
  Folder,
  Plus
} from 'lucide-react';

const Email = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({
    from: '',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    parent: 'Account',
    parentSelect: '',
    template: '',
    htmlEnabled: true
  });

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Mail, active: true },
    { id: 'important', name: 'Important', icon: Star },
    { id: 'sent', name: 'Sent', icon: Send },
    { id: 'archive', name: 'Archive', icon: Archive },
    { id: 'drafts', name: 'Drafts', icon: FileText },
    { id: 'trash', name: 'Trash', icon: Trash2 }
  ];

  const handleComposeChange = (field, value) => {
    setComposeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSend = () => {
    console.log('Sending email:', composeData);
    setShowCompose(false);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', composeData);
  };

  const handleCancel = () => {
    setShowCompose(false);
    setComposeData({
      from: '',
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      parent: 'Account',
      parentSelect: '',
      template: '',
      htmlEnabled: true
    });
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      {/* Main Email Interface */}
      <div className="flex h-screen">
        {/* Left Sidebar - Email Folders */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Emails</h1>
          </div>
          
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder=""
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Folders */}
          <div className="p-2">
            <div className="flex items-center justify-between mb-2 px-2">
              <button className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-1" />
                All
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            
            {folders.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                    selectedFolder === folder.id ? 'bg-red-50 text-blue-600 border-l-2 border-blue-500' : 'text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {folder.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span>0</span>
                  <div className="flex ml-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowCompose(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Compose
              </button>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-6">
            <div className="text-center py-20">
              <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No Data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Compose Email</h2>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Minimize2 className="h-4 w-4 text-gray-400" />
                </button>
                <button 
                  onClick={handleCancel}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button 
                  onClick={handleSend}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
                <button 
                  onClick={handleSaveDraft}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Save Draft
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

              {/* Email Form */}
              <div className="space-y-4">
                {/* From */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From <span className="text-blue-500">*</span>
                    </label>
                    <div className="text-sm text-gray-600">
                      SMTP is not configured: <a href="#" className="text-blue-600 hover:underline">Personal Email Accounts</a>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CC</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={composeData.cc}
                        onChange={(e) => handleComposeChange('cc', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* To & BCC */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To <span className="text-blue-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={composeData.to}
                        onChange={(e) => handleComposeChange('to', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BCC</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={composeData.bcc}
                        onChange={(e) => handleComposeChange('bcc', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Parent & Template */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select
                          value={composeData.parent}
                          onChange={(e) => handleComposeChange('parent', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Account">Account</option>
                          <option value="Contact">Contact</option>
                          <option value="Lead">Lead</option>
                          <option value="Opportunity">Opportunity</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Select"
                          value={composeData.parentSelect}
                          onChange={(e) => handleComposeChange('parentSelect', e.target.value)}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={composeData.template}
                        onChange={(e) => handleComposeChange('template', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => handleComposeChange('subject', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                  
                  {/* Text Editor Toolbar */}
                  <div className="border border-gray-300 rounded-t bg-gray-50 p-2 flex flex-wrap gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Bold className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Italic className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Underline className="h-4 w-4" />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Link className="h-4 w-4" />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <select className="text-sm border-0 bg-transparent">
                      <option>14</option>
                    </select>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Type className="h-4 w-4" />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <List className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <textarea
                    value={composeData.body}
                    onChange={(e) => handleComposeChange('body', e.target.value)}
                    rows={8}
                    className="w-full border border-gray-300 border-t-0 rounded-b px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Attachments & HTML */}
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                    <div className="flex gap-2">
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                        <Paperclip className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                        <Folder className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">HTML</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={composeData.htmlEnabled}
                        onChange={(e) => handleComposeChange('htmlEnabled', e.target.checked)}
                        className="sr-only"
                      />
                      <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${composeData.htmlEnabled ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;