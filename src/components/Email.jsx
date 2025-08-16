import React, { useState, useRef } from 'react';
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
  Plus,
  Menu
} from 'lucide-react';

const Email = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  
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
    console.log('Attachments:', attachments);
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
    setAttachments([]);
  };

  const handleFolderSelect = (folderId) => {
    setSelectedFolder(folderId);
    setShowSidebar(false);
  };

  // Text formatting functions using document.execCommand
  const formatText = (command, value = null) => {
    if (!composeData.htmlEnabled) return;
    
    const editor = textareaRef.current;
    if (!editor) return;
    
    editor.focus();
    
    switch (command) {
      case 'bold':
        document.execCommand('bold', false, null);
        break;
      case 'italic':
        document.execCommand('italic', false, null);
        break;
      case 'underline':
        document.execCommand('underline', false, null);
        break;
      case 'link':
        const url = prompt('Enter URL:') || '#';
        document.execCommand('createLink', false, url);
        break;
      case 'unorderedList':
        document.execCommand('insertUnorderedList', false, null);
        break;
      case 'orderedList':
        document.execCommand('insertOrderedList', false, null);
        break;
      case 'alignLeft':
        document.execCommand('justifyLeft', false, null);
        break;
      case 'alignCenter':
        document.execCommand('justifyCenter', false, null);
        break;
      case 'alignRight':
        document.execCommand('justifyRight', false, null);
        break;
      case 'alignJustify':
        document.execCommand('justifyFull', false, null);
        break;
      case 'fontSize':
        document.execCommand('fontSize', false, value);
        break;
      case 'fontName':
        document.execCommand('fontName', false, value);
        break;
      case 'foreColor':
        document.execCommand('foreColor', false, value);
        break;
      case 'hiliteColor':
        document.execCommand('hiliteColor', false, value);
        break;
      case 'indent':
        document.execCommand('indent', false, null);
        break;
      case 'outdent':
        document.execCommand('outdent', false, null);
        break;
      case 'insertHorizontalRule':
        document.execCommand('insertHorizontalRule', false, null);
        break;
      case 'removeFormat':
        document.execCommand('removeFormat', false, null);
        break;
      default:
        break;
    }
    
    // Update state with new content
    setTimeout(() => {
      handleComposeChange('body', editor.innerHTML);
    }, 0);
  };

  // File attachment functions
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />

      {/* Main Email Interface */}
      <div className="flex h-screen">
        {/* Mobile Menu Backdrop */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Left Sidebar - Email Folders */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-auto
          ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Emails</h1>
              <button 
                onClick={() => setShowSidebar(false)}
                className="md:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
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
                  onClick={() => handleFolderSelect(folder.id)}
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
          <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowSidebar(true)}
                  className="md:hidden p-1 hover:bg-gray-100 rounded"
                >
                  <Menu className="h-5 w-5" />
                </button>
                
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
                className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded hover:bg-blue-600 transition-colors"
              >
                <span className="hidden sm:inline">Compose</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-4 md:p-6">
            <div className="text-center py-20">
              <Mail className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base md:text-lg">No Data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200">
              <h2 className="text-base md:text-lg font-semibold">Compose Email</h2>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded hidden md:block">
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
            <div className="p-3 md:p-6 overflow-y-auto max-h-[calc(95vh-140px)] md:max-h-[calc(90vh-140px)]">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <button 
                  onClick={handleSend}
                  className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
                <button 
                  onClick={handleSaveDraft}
                  className="bg-gray-200 text-gray-700 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded hover:bg-gray-300 transition-colors"
                >
                  Save Draft
                </button>
                <button 
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-gray-200 text-gray-700 px-2 py-1.5 md:px-3 md:py-2 rounded hover:bg-gray-300 transition-colors">
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
                    <div className="text-xs md:text-sm text-gray-600">
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
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Parent & Template */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <select
                          value={composeData.parent}
                          onChange={(e) => handleComposeChange('parent', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-16 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                  
                  {/* Text Editor Toolbar */}
                  <div className="border border-gray-300 rounded-t bg-gray-50 p-2 flex flex-wrap gap-1 overflow-x-auto">
                    {/* Basic Formatting */}
                    <button 
                      onClick={() => formatText('bold')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => formatText('italic')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => formatText('underline')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </button>
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Link */}
                    <button 
                      onClick={() => formatText('link')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Insert Link"
                    >
                      <Link className="h-4 w-4" />
                    </button>
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Font Size */}
                    <select 
                      className="text-sm border-0 bg-transparent flex-shrink-0 hover:bg-gray-200 rounded px-2"
                      onChange={(e) => formatText('fontSize', e.target.value)}
                      title="Font Size"
                    >
                      <option value="">Size</option>
                      <option value="1">10px</option>
                      <option value="2">12px</option>
                      <option value="3">14px</option>
                      <option value="4">16px</option>
                      <option value="5">18px</option>
                      <option value="6">20px</option>
                      <option value="7">24px</option>
                    </select>
                    
                    {/* Font Family */}
                    <select 
                      className="text-sm border-0 bg-transparent flex-shrink-0 hover:bg-gray-200 rounded px-2"
                      onChange={(e) => formatText('fontName', e.target.value)}
                      title="Font Family"
                    >
                      <option value="">Font</option>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Courier New">Courier</option>
                    </select>
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Text Color */}
                    <input
                      type="color"
                      onChange={(e) => formatText('foreColor', e.target.value)}
                      className="w-8 h-8 border-0 rounded cursor-pointer flex-shrink-0"
                      title="Text Color"
                      defaultValue="#000000"
                    />
                    
                    {/* Background Color */}
                    <input
                      type="color"
                      onChange={(e) => formatText('hiliteColor', e.target.value)}
                      className="w-8 h-8 border-0 rounded cursor-pointer flex-shrink-0"
                      title="Highlight Color"
                      defaultValue="#ffff00"
                    />
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Lists */}
                    <button 
                      onClick={() => formatText('unorderedList')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => formatText('orderedList')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Numbered List"
                    >
                      <span className="text-sm font-bold">1.</span>
                    </button>
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Alignment */}
                    <button 
                      onClick={() => formatText('alignLeft')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Align Left"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => formatText('alignCenter')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Align Center"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm2 10.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => formatText('alignRight')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Align Right"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 4.75A.75.75 0 0017.25 4H2.75a.75.75 0 000 1.5h14.5a.75.75 0 00.75-.75zm0 10.5a.75.75 0 01-.75.75H7.25a.75.75 0 010-1.5h9.5a.75.75 0 01.75.75zM18 10a.75.75 0 01-.75.75H2.75a.75.75 0 010-1.5h14.5A.75.75 0 0118 10z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => formatText('alignJustify')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Justify"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Indent */}
                    <button 
                      onClick={() => formatText('indent')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Increase Indent"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M15 4.75A.75.75 0 0115.75 4h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 4.75zm0 10.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM15 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zM2.5 7.25a.75.75 0 00-1.06 1.06L4.19 11l-2.75 2.69a.75.75 0 101.06 1.06L6.56 11 2.5 7.25z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => formatText('outdent')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Decrease Indent"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M15 4.75A.75.75 0 0115.75 4h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 4.75zm0 10.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM15 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zM6.56 9L2.5 12.75a.75.75 0 101.06 1.06L6.31 11l-2.75-2.81A.75.75 0 102.5 7.25L6.56 9z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <div className="w-px bg-gray-300 mx-1 flex-shrink-0"></div>
                    
                    {/* Additional Options */}
                    <button 
                      onClick={() => formatText('insertHorizontalRule')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Insert Line"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => formatText('removeFormat')}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                      title="Clear Formatting"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button className="p-1 hover:bg-gray-200 rounded flex-shrink-0">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Rich Text Editor */}
                  <div
                    ref={textareaRef}
                    contentEditable
                    onInput={(e) => handleComposeChange('body', e.currentTarget.innerHTML)}
                    className="w-full border border-gray-300 border-t-0 rounded-b px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px] bg-white"
                    style={{ minHeight: '120px', maxHeight: '300px', overflowY: 'auto' }}
                    dangerouslySetInnerHTML={{ __html: composeData.body }}
                    placeholder="Type your message here..."
                  />
                  
                  {/* Fallback textarea for non-HTML mode */}
                  {!composeData.htmlEnabled && (
                    <textarea
                      value={composeData.body.replace(/<[^>]*>/g, '')}
                      onChange={(e) => handleComposeChange('body', e.target.value)}
                      rows={6}
                      className="w-full border border-gray-300 border-t-0 rounded-b px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px]"
                      placeholder="Type your message here..."
                      style={{ display: composeData.htmlEnabled ? 'none' : 'block' }}
                    />
                  )}
                </div>

                {/* Attachments Display */}
                {attachments.length > 0 && (
                  <div className="border border-gray-200 rounded p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Files:</h4>
                    <div className="space-y-2">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{attachment.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                          </div>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Remove attachment"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments & HTML */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleFileSelect}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Attach file"
                      >
                        <Paperclip className="h-4 w-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={handleFileSelect}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Browse files"
                      >
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