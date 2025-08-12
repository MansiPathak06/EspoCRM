import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const SMS = () => {
  const [smsProvider, setSmsProvider] = useState('');
  const [smsFromNumber, setSmsFromNumber] = useState('');
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);

  const providers = [
    'Twilio',
    'AWS SNS', 
    'Nexmo',
    'MessageBird',
    'TextMagic',
    'Plivo'
  ];

  const handleAdminClick = () => {
    // Navigate to /admin
    console.log('Navigating to /admin');
    // In a real app, you'd use React Router: navigate('/admin');
  };

  const handleSave = () => {
    console.log('Saving SMS settings:', { 
      provider: smsProvider, 
      fromNumber: smsFromNumber 
    });
    // Handle save logic here
  };

  const handleCancel = () => {
    setSmsProvider('');
    setSmsFromNumber('');
    console.log('Cancelled SMS settings');
  };

  const handleProviderSelect = (provider) => {
    setSmsProvider(provider);
    setIsProviderDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button
            onClick={handleAdminClick}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Administration
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">SMS</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* SMS Configuration Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 sm:p-8">
            <div className="space-y-8">
              {/* SMS Provider Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SMS Provider
                </label>
                <div className="relative max-w-md">
                  <button
                    onClick={() => setIsProviderDropdownOpen(!isProviderDropdownOpen)}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className={smsProvider ? 'text-gray-900' : 'text-gray-500'}>
                        {smsProvider || 'Select SMS Provider'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isProviderDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {isProviderDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="py-1">
                        {providers.map((provider) => (
                          <button
                            key={provider}
                            onClick={() => handleProviderSelect(provider)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                          >
                            {provider}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SMS From Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SMS From Number
                </label>
                <div className="max-w-md">
                  <input
                    type="text"
                    value={smsFromNumber}
                    onChange={(e) => setSmsFromNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
                    placeholder="Enter SMS from number"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the phone number that will be used as the sender for SMS messages
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 text-blue-400">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                SMS Configuration
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Configure your SMS provider settings to enable SMS functionality in the system. 
                  Make sure to verify your phone number with your SMS provider before using it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMS;