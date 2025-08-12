import React, { useState } from 'react';
import { ChevronRight, X, Info } from 'lucide-react';

export default function Notifications() {
  // State for form controls
  const [inAppNotifications, setInAppNotifications] = useState(['Calls', 'Emails']);
  const [showNotificationNumber, setShowNotificationNumber] = useState(false);
  const [mentionNotifications, setMentionNotifications] = useState(false);
  const [internalUserUpdates, setInternalUserUpdates] = useState(false);
  const [portalUserUpdates, setPortalUserUpdates] = useState(true);
  const [emailDelay, setEmailDelay] = useState('30');
  const [adminNotifications, setAdminNotifications] = useState(true);
  const [versionNotifications, setVersionNotifications] = useState(true);
  const [extensionNotifications, setExtensionNotifications] = useState(true);
  
  // Stream notification settings
  const [streamScopes, setStreamScopes] = useState(['Cases']);
  const [streamNotifyAbout, setStreamNotifyAbout] = useState(['Posts', 'Status updates', 'Received emails']);

  const handleSave = () => {
    // Save logic here
    console.log('Settings saved');
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    // Cancel logic here
    console.log('Changes cancelled');
    // Reset to original values or navigate away
  };

  const handleAdminClick = () => {
    // Navigate to admin
    window.location.href = '/admin';
  };

  const removeTag = (tags, setTags, tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const availableNotificationTypes = ['Calls', 'Emails', 'Messages', 'Tasks'];
  const availableStreamScopes = ['Cases', 'Contacts', 'Opportunities', 'Leads'];
  const availableStreamNotifications = ['Posts', 'Status updates', 'Received emails', 'Comments'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <button 
            onClick={handleAdminClick}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Administration
          </button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-700 font-medium">Notifications</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Action Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* In-app Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">In-app Notifications</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Entities to notify about upon assignment
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {inAppNotifications.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(inAppNotifications, setInAppNotifications, tag)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select 
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                    onChange={(e) => {
                      if (e.target.value && !inAppNotifications.includes(e.target.value)) {
                        setInAppNotifications([...inAppNotifications, e.target.value]);
                      }
                      e.target.value = '';
                    }}
                  >
                    <option value="">Add notification type...</option>
                    {availableNotificationTypes
                      .filter(type => !inAppNotifications.includes(type))
                      .map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showNotificationNumber}
                      onChange={(e) => setShowNotificationNumber(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Display new notification number in page title</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={mentionNotifications}
                      onChange={(e) => setMentionNotifications(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Send email notifications about mentions in posts</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={internalUserUpdates}
                      onChange={(e) => setInternalUserUpdates(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Notifications about updates in Stream for internal users</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={portalUserUpdates}
                      onChange={(e) => setPortalUserUpdates(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Notifications about updates in Stream for portal users</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    Delay of email notifications (in seconds)
                    <Info className="h-4 w-4 text-gray-400" />
                  </label>
                  <input
                    type="number"
                    value={emailDelay}
                    onChange={(e) => setEmailDelay(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-20"
                  />
                </div>
              </div>
            </div>

            {/* Admin Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Notifications</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={adminNotifications}
                      onChange={(e) => setAdminNotifications(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">System notifications in administration panel</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={versionNotifications}
                      onChange={(e) => setVersionNotifications(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Show notification when new EspoCRM version is available</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Stream Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stream Email Notifications</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
                    Stream email notifications scopes
                    <Info className="h-4 w-4 text-gray-400" />
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {streamScopes.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(streamScopes, setStreamScopes, tag)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select 
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                    onChange={(e) => {
                      if (e.target.value && !streamScopes.includes(e.target.value)) {
                        setStreamScopes([...streamScopes, e.target.value]);
                      }
                      e.target.value = '';
                    }}
                  >
                    <option value="">Add scope...</option>
                    {availableStreamScopes
                      .filter(scope => !streamScopes.includes(scope))
                      .map(scope => (
                        <option key={scope} value={scope}>{scope}</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">What to notify about</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {streamNotifyAbout.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(streamNotifyAbout, setStreamNotifyAbout, tag)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select 
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                    onChange={(e) => {
                      if (e.target.value && !streamNotifyAbout.includes(e.target.value)) {
                        setStreamNotifyAbout([...streamNotifyAbout, e.target.value]);
                      }
                      e.target.value = '';
                    }}
                  >
                    <option value="">Add notification type...</option>
                    {availableStreamNotifications
                      .filter(type => !streamNotifyAbout.includes(type))
                      .map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>

            {/* Extension Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Extension Notifications</h3>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={extensionNotifications}
                    onChange={(e) => setExtensionNotifications(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Show notification when new versions of extensions are available</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}