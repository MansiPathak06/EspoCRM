import React, { useState } from 'react';
import { ChevronRight, Info } from 'lucide-react';

const JobSettings = () => {
  const [formData, setFormData] = useState({
    jobsRunInParallel: false,
    jobsMaxPortion: '15',
    daemonInterval: '10',
    daemonMaxProcessNumber: '5',
    daemonProcessTimeout: '36,000',
    forceUTCTimeZone: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving job settings:', formData);
    // Add your save logic here
  };

  const handleCancel = () => {
    console.log('Cancelling changes');
    // Add your cancel logic here
  };

  const navigateToAdmin = () => {
    console.log('Navigating to /admin');
    // Add your navigation logic here
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={navigateToAdmin}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Administration
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Job Settings</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header with Action Buttons */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Job Settings</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Jobs Run in Parallel */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Jobs Run in Parallel
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.jobsRunInParallel}
                      onChange={(e) => handleInputChange('jobsRunInParallel', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable parallel job execution</span>
                  </label>
                </div>

                {/* Daemon Interval */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label htmlFor="daemonInterval" className="text-sm font-medium text-gray-700">
                      Daemon Interval
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <input
                    id="daemonInterval"
                    type="text"
                    value={formData.daemonInterval}
                    onChange={(e) => handleInputChange('daemonInterval', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Daemon Process Timeout */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label htmlFor="daemonProcessTimeout" className="text-sm font-medium text-gray-700">
                      Daemon Process Timeout
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <input
                    id="daemonProcessTimeout"
                    type="text"
                    value={formData.daemonProcessTimeout}
                    onChange={(e) => handleInputChange('daemonProcessTimeout', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Jobs Max Portion */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label htmlFor="jobsMaxPortion" className="text-sm font-medium text-gray-700">
                      Jobs Max Portion
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <input
                    id="jobsMaxPortion"
                    type="text"
                    value={formData.jobsMaxPortion}
                    onChange={(e) => handleInputChange('jobsMaxPortion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Daemon Max Process Number */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label htmlFor="daemonMaxProcessNumber" className="text-sm font-medium text-gray-700">
                      Daemon Max Process Number
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <input
                    id="daemonMaxProcessNumber"
                    type="text"
                    value={formData.daemonMaxProcessNumber}
                    onChange={(e) => handleInputChange('daemonMaxProcessNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Force UTC Time Zone */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Force UTC Time Zone
                    </label>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.forceUTCTimeZone}
                      onChange={(e) => handleInputChange('forceUTCTimeZone', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">Force UTC time zone for all jobs</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons (Mobile) */}
          <div className="sm:hidden p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSettings;