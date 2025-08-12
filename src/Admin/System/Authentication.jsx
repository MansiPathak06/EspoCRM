import React, { useState } from 'react';
import { ChevronRight, Info } from 'lucide-react';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [formData, setFormData] = useState({
    // General Tab
    authenticationMethod: 'Espo',
    authTokenLifetime: '0',
    onlyOneAuthToken: false,
    authTokenMaxIdleTime: '48',
    enable2FA: false,
    restrictAccessByIP: false,
    
    // Passwords Tab
    lengthOfGeneratedPasswords: '10',
    minimumPasswordLength: '',
    numberOfLettersRequired: '',
    passwordMustContainBothCases: false,
    numberOfDigitsRequired: '',
    numberOfSpecialCharsRequired: '',
    disablePasswordRecovery: false,
    disablePasswordRecoveryAdmin: false,
    preventEmailAddressExposure: false,
    disablePasswordRecoveryInternal: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving authentication configuration:', formData);
    alert('Authentication configuration saved successfully!');
  };

  const handleCancel = () => {
    console.log('Canceling changes');
    // Reset form or navigate away
  };

  const navigateToAdmin = () => {
    window.location.href = '/admin';
  };

  const tabs = ['General', 'Passwords'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center text-sm text-gray-600">
          <button 
            onClick={navigateToAdmin}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            Administration
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">Authentication</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto">
        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'General' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-8">
              {/* Configuration Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Configuration</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Authentication Method
                      </label>
                      <select 
                        value={formData.authenticationMethod}
                        onChange={(e) => handleInputChange('authenticationMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Espo">Espo</option>
                        <option value="LDAP">LDAP</option>
                        <option value="OAuth">OAuth</option>
                        <option value="SAML">SAML</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onlyOneAuthToken"
                        checked={formData.onlyOneAuthToken}
                        onChange={(e) => handleInputChange('onlyOneAuthToken', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="onlyOneAuthToken" className="ml-2 block text-sm text-gray-700">
                        Only one auth token per user
                        <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                      </label>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auth Token Lifetime (hours)
                        <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                      </label>
                      <input
                        type="number"
                        value={formData.authTokenLifetime}
                        onChange={(e) => handleInputChange('authTokenLifetime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auth Token Max Idle Time (hours)
                        <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                      </label>
                      <input
                        type="number"
                        value={formData.authTokenMaxIdleTime}
                        onChange={(e) => handleInputChange('authTokenMaxIdleTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="48"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2-Factor Authentication Section */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-6">2-Factor Authentication</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable2FA"
                    checked={formData.enable2FA}
                    onChange={(e) => handleInputChange('enable2FA', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enable2FA" className="ml-2 block text-sm text-gray-700">
                    Enable 2-Factor Authentication
                  </label>
                </div>
              </div>

              {/* Access Section */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Access</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="restrictAccessByIP"
                    checked={formData.restrictAccessByIP}
                    onChange={(e) => handleInputChange('restrictAccessByIP', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="restrictAccessByIP" className="ml-2 block text-sm text-gray-700">
                    Restrict access by IP address
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Passwords' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-8">
              {/* Strength Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Strength</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length of generated passwords *
                      </label>
                      <input
                        type="number"
                        value={formData.lengthOfGeneratedPasswords}
                        onChange={(e) => handleInputChange('lengthOfGeneratedPasswords', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum password length
                      </label>
                      <input
                        type="number"
                        value={formData.minimumPasswordLength}
                        onChange={(e) => handleInputChange('minimumPasswordLength', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of letters required in password
                      </label>
                      <input
                        type="number"
                        value={formData.numberOfLettersRequired}
                        onChange={(e) => handleInputChange('numberOfLettersRequired', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="passwordMustContainBothCases"
                        checked={formData.passwordMustContainBothCases}
                        onChange={(e) => handleInputChange('passwordMustContainBothCases', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="passwordMustContainBothCases" className="ml-2 block text-sm text-gray-700">
                        Password must contain letters of both upper and lower case
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of digits required in password
                      </label>
                      <input
                        type="number"
                        value={formData.numberOfDigitsRequired}
                        onChange={(e) => handleInputChange('numberOfDigitsRequired', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of special character required in password
                      </label>
                      <input
                        type="number"
                        value={formData.numberOfSpecialCharsRequired}
                        onChange={(e) => handleInputChange('numberOfSpecialCharsRequired', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recovery Section */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Recovery</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="disablePasswordRecovery"
                        checked={formData.disablePasswordRecovery}
                        onChange={(e) => handleInputChange('disablePasswordRecovery', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="disablePasswordRecovery" className="ml-2 block text-sm text-gray-700">
                        Disable password recovery
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="preventEmailAddressExposure"
                        checked={formData.preventEmailAddressExposure}
                        onChange={(e) => handleInputChange('preventEmailAddressExposure', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="preventEmailAddressExposure" className="ml-2 block text-sm text-gray-700">
                        Prevent email address exposure on password recovery form
                        <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                      </label>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="disablePasswordRecoveryAdmin"
                        checked={formData.disablePasswordRecoveryAdmin}
                        onChange={(e) => handleInputChange('disablePasswordRecoveryAdmin', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="disablePasswordRecoveryAdmin" className="ml-2 block text-sm text-gray-700">
                        Disable password recovery for admin users
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="disablePasswordRecoveryInternal"
                        checked={formData.disablePasswordRecoveryInternal}
                        onChange={(e) => handleInputChange('disablePasswordRecoveryInternal', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="disablePasswordRecoveryInternal" className="ml-2 block text-sm text-gray-700">
                        Disable password recovery for internal users
                        <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                      </label>
                    </div>
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

export default Authentication;