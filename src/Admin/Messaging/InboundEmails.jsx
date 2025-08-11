import React, { useState } from 'react';
import { Info } from 'lucide-react';

const InboundEmails = () => {
  const [formData, setFormData] = useState({
    emailMaxSize: '10',
    maxPersonalAccounts: '2',
    maxPersonalPortionSize: '50',
    maxGroupPortionSize: '50'
  });

  const handleAdminClick = () => {
    // Navigate to /admin
    window.location.href = '/admin';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
            <span className="text-gray-900">Inbound Emails</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Email Max Size (Mb) */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    Email Max Size (Mb)
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                  </label>
                  <input
                    type="number"
                    value={formData.emailMaxSize}
                    onChange={(e) => handleInputChange('emailMaxSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Max number of personal email accounts per user */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max number of personal email accounts per user
                  </label>
                  <input
                    type="number"
                    value={formData.maxPersonalAccounts}
                    onChange={(e) => handleInputChange('maxPersonalAccounts', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Max email portion size for personal account fetching */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max email portion size for personal account fetching
                  </label>
                  <input
                    type="number"
                    value={formData.maxPersonalPortionSize}
                    onChange={(e) => handleInputChange('maxPersonalPortionSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Max email portion size for group account fetching */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max email portion size for group account fetching
                  </label>
                  <input
                    type="number"
                    value={formData.maxGroupPortionSize}
                    onChange={(e) => handleInputChange('maxGroupPortionSize', e.target.value)}
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

export default InboundEmails;