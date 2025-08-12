import React, { useState } from 'react';
import { ChevronRight, Edit3, Plus, X, Info } from 'lucide-react';

const UserInterface = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [formData, setFormData] = useState({
    applicationName: 'EspoCRM',
    theme: 'Espo',
    sideNavbar: 'Side Navbar',
    recordsPerPage: '20',
    recordsPerPageSelect: '10',
    recordsPerPageSmall: '5',
    recordsPerPageKanban: '5',
    disableUserThemes: false,
    disableAvatars: false,
    displayTotalCount: true
  });

  const [navbarItems, setNavbarItems] = useState([
    { id: 1, name: 'CRM', items: ['Account', 'Contact', 'Lead', 'Opportunity', 'Meeting', 'Call', 'Task', 'Case', 'Email'] },
    { id: 2, name: 'Activities', items: [] },
    { id: 3, name: 'Marketing', items: [] },
    { id: 4, name: 'Configuration', items: [] }
  ]);

  const [globalCreateList, setGlobalCreateList] = useState([
    'Account', 'Contact', 'Lead', 'Opportunity', 'Meeting', 'Call', 'Task', 'Case', 'Email'
  ]);

  const [dashboardWidgets, setDashboardWidgets] = useState([
    { id: 1, name: 'Stream' },
    { id: 2, name: 'My Activities' }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving configuration:', formData);
    alert('Configuration saved successfully!');
  };

  const handleCancel = () => {
    console.log('Canceling changes');
    // Reset form or navigate away
  };

  const navigateToAdmin = () => {
    window.location.href = '/admin';
  };

  const removeNavbarItem = (groupId, itemIndex) => {
    setNavbarItems(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, items: group.items.filter((_, index) => index !== itemIndex) }
        : group
    ));
  };

  const removeGlobalCreateItem = (index) => {
    setGlobalCreateList(prev => prev.filter((_, i) => i !== index));
  };

  const removeDashboardWidget = (id) => {
    setDashboardWidgets(prev => prev.filter(widget => widget.id !== id));
  };

  const tabs = ['General', 'Navbar', 'Dashboard'];

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
          <span className="text-gray-900">User Interface</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo
                  </label>
                  <div className="flex items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <Edit3 className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select 
                    value={formData.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Espo">Espo</option>
                    <option value="Dark">Dark</option>
                    <option value="Light">Light</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Records Per Page
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </label>
                  <input
                    type="number"
                    value={formData.recordsPerPage}
                    onChange={(e) => handleInputChange('recordsPerPage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Records Per Page (Small)
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </label>
                  <input
                    type="number"
                    value={formData.recordsPerPageSmall}
                    onChange={(e) => handleInputChange('recordsPerPageSmall', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="displayTotalCount"
                    checked={formData.displayTotalCount}
                    onChange={(e) => handleInputChange('displayTotalCount', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="displayTotalCount" className="ml-2 block text-sm text-gray-700">
                    Display Total Count (on List View)
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </label>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Name
                  </label>
                  <input
                    type="text"
                    value={formData.applicationName}
                    onChange={(e) => handleInputChange('applicationName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Info className="w-4 h-4 inline mr-1 text-gray-400" />
                    Side Navbar
                  </label>
                  <select 
                    value={formData.sideNavbar}
                    onChange={(e) => handleInputChange('sideNavbar', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Side Navbar">Side Navbar</option>
                    <option value="Top Navbar">Top Navbar</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="disableUserThemes"
                    checked={formData.disableUserThemes}
                    onChange={(e) => handleInputChange('disableUserThemes', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="disableUserThemes" className="ml-2 block text-sm text-gray-700">
                    Disable User Themes
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="disableAvatars"
                    checked={formData.disableAvatars}
                    onChange={(e) => handleInputChange('disableAvatars', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="disableAvatars" className="ml-2 block text-sm text-gray-700">
                    Disable Avatars
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Records Per Page (Select)
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </label>
                  <input
                    type="number"
                    value={formData.recordsPerPageSelect}
                    onChange={(e) => handleInputChange('recordsPerPageSelect', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Records Per Page (Kanban)
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </label>
                  <input
                    type="number"
                    value={formData.recordsPerPageKanban}
                    onChange={(e) => handleInputChange('recordsPerPageKanban', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Navbar' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tab List */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tab List</h3>
                <div className="space-y-4">
                  {navbarItems.map((group) => (
                    <div key={group.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">📝 {group.name}</span>
                      </div>
                      <div className="space-y-2">
                        {group.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                            <span className="text-sm">{item}</span>
                            <button
                              onClick={() => removeNavbarItem(group.id, index)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="mt-2 text-blue-500 hover:text-blue-700 text-sm flex items-center">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Create List */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Global Create List</h3>
                <div className="space-y-2">
                  {globalCreateList.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm">{item}</span>
                      <button
                        onClick={() => removeGlobalCreateItem(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="mt-8 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disableTabColors"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="disableTabColors" className="ml-2 block text-sm text-gray-700">
                  Disable scope colors
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disableTabColors2"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="disableTabColors2" className="ml-2 block text-sm text-gray-700">
                  Disable tab colors
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Dashboard' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Dashboard Layout (default)</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dashboardWidgets.map((widget) => (
                  <div key={widget.id} className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[200px] relative">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-medium text-gray-700">{widget.name}</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => removeDashboardWidget(widget.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-center text-gray-400 text-sm">
                      Widget content will appear here
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInterface;