import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const OutboundEmails = () => {
  const [formData, setFormData] = useState({
    systemEmailAddress: '',
    fromName: 'EspoCRM',
    isShared: true,
    bccAddress: '',
    emailLookupScopes: ['User'],
    emailSelectScopes: ['User', 'Contact', 'Lead', 'Account'],
    maxEmailsPerHour: '100',
    maxEmailsPerBatch: '',
    emailOpenTracking: false,
    useVERP: false,
    disableMandatoryOptOut: false,
    maxScheduledEmailsPerBatch: '50'
  });

  const handleAdminClick = () => {
    // Navigate to /admin
     console.log("Admin clicked");
    window.location.href = '/admin';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const removeTag = (field, tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(tag => tag !== tagToRemove)
    }));
  };

  const TagInput = ({ tags, onRemove, placeholder }) => (
    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      {tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
          {tag}
          <button
            type="button"
            onClick={() => onRemove(tag)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[100px] border-none outline-none bg-transparent"
      />
    </div>
  );

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="text-sm text-gray-500 mb-2">
            <button 
              onClick={handleAdminClick}
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Administration
            </button>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Outbound Emails</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
              Save
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            {/* Configuration Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Configuration</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* System Email Address */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      System Email Address
                      <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </label>
                    <input
                      type="email"
                      value={formData.systemEmailAddress}
                      onChange={(e) => handleInputChange('systemEmailAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  {/* From Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={formData.fromName}
                      onChange={(e) => handleInputChange('fromName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Is Shared */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      Is Shared
                      <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isShared}
                        onChange={(e) => handleInputChange('isShared', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* BCC address for external clients */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BCC address for external clients
                    </label>
                    <input
                      type="email"
                      value={formData.bccAddress}
                      onChange={(e) => handleInputChange('bccAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Email address look-up scopes */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Email address look-up scopes
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                  </label>
                  <TagInput 
                    tags={formData.emailLookupScopes}
                    onRemove={(tag) => removeTag('emailLookupScopes', tag)}
                    placeholder="Add scope..."
                  />
                </div>

                {/* Email address select scopes */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Email address select scopes
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                  </label>
                  <TagInput 
                    tags={formData.emailSelectScopes}
                    onRemove={(tag) => removeTag('emailSelectScopes', tag)}
                    placeholder="Add scope..."
                  />
                </div>
              </div>
            </div>

            {/* Mass Email Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Mass Email</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Max number of emails sent per hour */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max number of emails sent per hour *
                  </label>
                  <input
                    type="number"
                    value={formData.maxEmailsPerHour}
                    onChange={(e) => handleInputChange('maxEmailsPerHour', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Max number of emails sent per batch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max number of emails sent per batch
                  </label>
                  <input
                    type="number"
                    value={formData.maxEmailsPerBatch}
                    onChange={(e) => handleInputChange('maxEmailsPerBatch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Email Open Tracking */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Open Tracking
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.emailOpenTracking}
                      onChange={(e) => handleInputChange('emailOpenTracking', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Use VERP */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Use VERP
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.useVERP}
                      onChange={(e) => handleInputChange('useVERP', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Disable mandatory opt-out link */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disable mandatory opt-out link
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.disableMandatoryOptOut}
                      onChange={(e) => handleInputChange('disableMandatoryOptOut', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduled Send Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Scheduled Send</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Max number of scheduled emails sent per batch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max number of scheduled emails sent per batch *
                  </label>
                  <input
                    type="number"
                    value={formData.maxScheduledEmailsPerBatch}
                    onChange={(e) => handleInputChange('maxScheduledEmailsPerBatch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 EspoCRM
        </div>
      </div>
    </div>
  );
};

export default OutboundEmails;