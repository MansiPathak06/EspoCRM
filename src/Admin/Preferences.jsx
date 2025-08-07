import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit, X } from 'lucide-react';

const Preferences = () => {
  const [activeTab, setActiveTab] = useState('Locale');
  const [formData, setFormData] = useState({
    // Locale tab
    language: 'Default - English (US)',
    timeZone: 'Default - UTC',
    firstDayOfWeek: 'Default - Sunday',
    dateFormat: 'Default - DD.MM.YYYY',
    timeFormat: 'Default - HH:mm',
    defaultCurrency: 'Default - USD',
    thousandSeparator: ',',
    decimalMark: '.',
    
    // General tab
    emailReplyToAll: true,
    emailReplyInHTML: true,
    useExternalEmailClient: false,
    emailSignature: '',
    autoFollowRecord: true,
    globalAutoFollow: '',
    autoFollowCreated: false,
    autoFollowCreatedSpecific: '',
    exportDelimiter: ',',
    disableTextFilterStoring: false,
    doNotPreFillAssignedUser: true,
    calendarSlotDuration: 'Default',
    calendarScrollToHour: 'Default',
    defaultReminders: [],
    defaultRemindersForTasks: [],
    
    // User Interface tab
    theme: 'Default - Espo',
    contentWidth: 'Normal',
    customTabList: false,
    dashboardLayout: [
      { name: 'Stream', id: 'stream' },
      { name: 'My Activities', id: 'activities' }
    ],
    
    // Notifications tab
    inAppAssignmentNotifications: {
      calls: true,
      emails: true
    },
    inAppNotificationsAboutReactions: true
  });

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

  const handleNestedCheckboxChange = (parent, field) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: !prev[parent][field]
      }
    }));
  };

  const addDashboardItem = () => {
    // Placeholder for adding dashboard items
  };

  const removeDashboardItem = (id) => {
    setFormData(prev => ({
      ...prev,
      dashboardLayout: prev.dashboardLayout.filter(item => item.id !== id)
    }));
  };

  const tabs = ['Locale', 'General', 'User Interface', 'Notifications'];

  const renderLocaleTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
          >
            <option>Default - English (US)</option>
            <option>English (UK)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Day of Week
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.firstDayOfWeek}
            onChange={(e) => handleInputChange('firstDayOfWeek', e.target.value)}
          >
            <option>Default - Sunday</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Zone
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.timeZone}
            onChange={(e) => handleInputChange('timeZone', e.target.value)}
          >
            <option>Default - UTC</option>
            <option>America/New_York</option>
            <option>America/Los_Angeles</option>
            <option>Europe/London</option>
            <option>Asia/Tokyo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.dateFormat}
            onChange={(e) => handleInputChange('dateFormat', e.target.value)}
          >
            <option>Default - DD.MM.YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
            <option>DD/MM/YYYY</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Format
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.timeFormat}
            onChange={(e) => handleInputChange('timeFormat', e.target.value)}
          >
            <option>Default - HH:mm</option>
            <option>h:mm A</option>
            <option>h:mm a</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Currency
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.defaultCurrency}
            onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
          >
            <option>Default - USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>JPY</option>
            <option>INR</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thousand Separator
          </label>
          <input 
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.thousandSeparator}
            onChange={(e) => handleInputChange('thousandSeparator', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decimal Mark *
          </label>
          <input 
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.decimalMark}
            onChange={(e) => handleInputChange('decimalMark', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="emailReplyToAll"
            checked={formData.emailReplyToAll}
            onChange={() => handleCheckboxChange('emailReplyToAll')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="emailReplyToAll" className="text-sm font-medium text-gray-700">
            Email Reply to all by default
          </label>
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="emailReplyInHTML"
            checked={formData.emailReplyInHTML}
            onChange={() => handleCheckboxChange('emailReplyInHTML')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="emailReplyInHTML" className="text-sm font-medium text-gray-700">
            Email Reply in HTML
          </label>
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="useExternalEmailClient"
            checked={formData.useExternalEmailClient}
            onChange={() => handleCheckboxChange('useExternalEmailClient')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="useExternalEmailClient" className="text-sm font-medium text-gray-700">
            Use an external email client
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Signature
        </label>
        <div className="border border-gray-300 rounded-md">
          <div className="flex items-center space-x-2 p-2 border-b border-gray-300 bg-gray-50">
            <button className="p-1 hover:bg-gray-200 rounded"><strong>B</strong></button>
            <button className="p-1 hover:bg-gray-200 rounded"><em>I</em></button>
            <button className="p-1 hover:bg-gray-200 rounded"><u>U</u></button>
            <button className="p-1 hover:bg-gray-200 rounded">S</button>
            <button className="p-1 hover:bg-gray-200 rounded">A</button>
            <button className="p-1 hover:bg-gray-200 rounded">T</button>
            <button className="p-1 hover:bg-gray-200 rounded">🔗</button>
            <button className="p-1 hover:bg-gray-200 rounded">&lt;/&gt;</button>
            <button className="p-1 hover:bg-gray-200 rounded">✕</button>
          </div>
          <textarea 
            className="w-full h-32 p-3 resize-none focus:outline-none"
            value={formData.emailSignature}
            onChange={(e) => handleInputChange('emailSignature', e.target.value)}
            placeholder="Enter email signature..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="autoFollowRecord"
            checked={formData.autoFollowRecord}
            onChange={() => handleCheckboxChange('autoFollowRecord')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="autoFollowRecord" className="text-sm font-medium text-gray-700">
            Auto-follow record after posting in Stream
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Global Auto-Follow
          </label>
          <input 
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.globalAutoFollow}
            onChange={(e) => handleInputChange('globalAutoFollow', e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="autoFollowCreated"
            checked={formData.autoFollowCreated}
            onChange={() => handleCheckboxChange('autoFollowCreated')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="autoFollowCreated" className="text-sm font-medium text-gray-700">
            Auto-follow created records
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auto-follow created records of specific entity types
          </label>
          <input 
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.autoFollowCreatedSpecific}
            onChange={(e) => handleInputChange('autoFollowCreatedSpecific', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Delimiter *
          </label>
          <input 
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.exportDelimiter}
            onChange={(e) => handleInputChange('exportDelimiter', e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="disableTextFilterStoring"
            checked={formData.disableTextFilterStoring}
            onChange={() => handleCheckboxChange('disableTextFilterStoring')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="disableTextFilterStoring" className="text-sm font-medium text-gray-700">
            Disable text filter storing
          </label>
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="doNotPreFillAssignedUser"
            checked={formData.doNotPreFillAssignedUser}
            onChange={() => handleCheckboxChange('doNotPreFillAssignedUser')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="doNotPreFillAssignedUser" className="text-sm font-medium text-gray-700">
            Do not pre-fill assigned user on record creation
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calendar Slot Duration
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.calendarSlotDuration}
            onChange={(e) => handleInputChange('calendarSlotDuration', e.target.value)}
          >
            <option>Default</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calendar Scroll to Hour
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.calendarScrollToHour}
            onChange={(e) => handleInputChange('calendarScrollToHour', e.target.value)}
          >
            <option>Default</option>
            <option>6:00</option>
            <option>7:00</option>
            <option>8:00</option>
            <option>9:00</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Reminders
          </label>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Reminders for Tasks
          </label>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserInterfaceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.theme}
            onChange={(e) => handleInputChange('theme', e.target.value)}
          >
            <option>Default - Espo</option>
            <option>Dark</option>
            <option>Light</option>
            <option>Blue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Width
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.contentWidth}
            onChange={(e) => handleInputChange('contentWidth', e.target.value)}
          >
            <option>Normal</option>
            <option>Wide</option>
            <option>Full</option>
          </select>
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="customTabList"
            checked={formData.customTabList}
            onChange={() => handleCheckboxChange('customTabList')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="customTabList" className="text-sm font-medium text-gray-700">
            Custom Tab List
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Dashboard Layout
          </label>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={addDashboardItem}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.dashboardLayout.map((item) => (
            <div key={item.id} className="border border-gray-300 rounded-lg p-4 bg-white min-h-48">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-700">{item.name}</h3>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeDashboardItem(item.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 min-h-32 bg-gray-50 rounded p-2">
                {item.name === 'Stream' && 'Activity stream content...'}
                {item.name === 'My Activities' && 'My activities content...'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">In-app assignment notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="callsNotifications"
              checked={formData.inAppAssignmentNotifications.calls}
              onChange={() => handleNestedCheckboxChange('inAppAssignmentNotifications', 'calls')}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="callsNotifications" className="text-sm text-gray-700">
              Calls
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="emailsNotifications"
              checked={formData.inAppAssignmentNotifications.emails}
              onChange={() => handleNestedCheckboxChange('inAppAssignmentNotifications', 'emails')}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailsNotifications" className="text-sm text-gray-700">
              Emails
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="reactionsNotifications"
            checked={formData.inAppNotificationsAboutReactions}
            onChange={() => handleCheckboxChange('inAppNotificationsAboutReactions')}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="reactionsNotifications" className="text-sm font-medium text-gray-700">
            In-app notifications about reactions
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <nav className="text-sm text-gray-500">
              <span>Preferences</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Admin</span>
            </nav>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Save
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-2 py-2 text-gray-400 hover:text-gray-600">
              ⋯
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === 'Locale' && renderLocaleTab()}
            {activeTab === 'General' && renderGeneralTab()}
            {activeTab === 'User Interface' && renderUserInterfaceTab()}
            {activeTab === 'Notifications' && renderNotificationsTab()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-4">
        © 2025 EspoCRM
      </div>
    </div>
  );
};

export default Preferences;