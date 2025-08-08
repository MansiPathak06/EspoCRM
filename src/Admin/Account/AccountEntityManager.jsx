import React, { useState } from 'react'; 
import { 
  Search, Plus, MoreHorizontal, Users, User, Phone, DollarSign, 
  Calendar, Mail, MessageSquare, FileText, Folder, HelpCircle, 
  Target, CheckSquare, Settings, X, ChevronDown, Edit, 
  Hash, Link, LayoutGrid, Calculator, Copy
} from 'lucide-react';

const AccountEntityManager = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: 'Account',
    label: 'Account'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving entity configuration:', formData);
    // Save logic here
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  const ConfigCard = ({ icon: Icon, title, description, onClick }) => (
    <div 
      onClick={onClick}
      className="p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md cursor-pointer transition-all group"
    >
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  const FilterRow = ({ name, label, onCopy }) => (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600 font-mono">{name}</span>
        <span className="text-sm text-gray-900">{label}</span>
      </div>
      <button
        onClick={onCopy}
        className="p-1 text-gray-400 hover:text-gray-600"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <nav className="text-sm text-gray-500">
            <span className="text-blue-600 cursor-pointer hover:underline">Administration</span>
            <span className="mx-2">›</span>
            <span className="text-blue-600 cursor-pointer hover:underline">Entity Manager</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Account</span>
          </nav>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Entity Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-gray-400" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Account</h1>
                  <p className="text-sm text-gray-500">Entity Configuration</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <Edit className="w-4 h-4 mr-2 inline" />
                  Edit
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="px-4 sm:px-6">
              <nav className="flex space-x-8 overflow-x-auto">
                <TabButton
                  id="general"
                  label="General"
                  isActive={activeTab === 'general'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="details"
                  label="Details"
                  isActive={activeTab === 'details'}
                  onClick={setActiveTab}
                />
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'general' && (
              <div className="space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        name="label"
                        value={formData.label}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Configuration Cards */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Configuration</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ConfigCard
                      icon={Hash}
                      title="Fields"
                      description="Manage entity fields and properties"
                      onClick={() => console.log('Navigate to Fields')}
                    />
                    <ConfigCard
                      icon={Link}
                      title="Relationships"
                      description="Configure relationships with other entities"
                      onClick={() => console.log('Navigate to Relationships')}
                    />
                    <ConfigCard
                      icon={LayoutGrid}
                      title="Layouts"
                      description="Design forms and list views"
                      onClick={() => console.log('Navigate to Layouts')}
                    />
                    <ConfigCard
                      icon={Calculator}
                      title="Formula"
                      description="Create calculated fields and formulas"
                      onClick={() => console.log('Navigate to Formula')}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Entity Statistics</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-500">Fields</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">5</div>
                      <div className="text-sm text-gray-500">Relationships</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-sm text-gray-500">Layouts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">2</div>
                      <div className="text-sm text-gray-500">Formulas</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Primary Filters */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Primary Filters</h2>
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <FilterRow
                      name="starred"
                      label="Starred"
                      onCopy={() => console.log('Copy starred filter')}
                    />
                    <div className="border-t border-gray-100">
                      <FilterRow
                        name="recentlyCreated"
                        label="Recently Created"
                        onCopy={() => console.log('Copy recently created filter')}
                      />
                    </div>
                  </div>
                </div>

                {/* Configuration Cards (same as General tab) */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ConfigCard
                      icon={Hash}
                      title="Fields"
                      description="Manage entity fields and properties"
                      onClick={() => console.log('Navigate to Fields')}
                    />
                    <ConfigCard
                      icon={Link}
                      title="Relationships"
                      description="Configure relationships with other entities"
                      onClick={() => console.log('Navigate to Relationships')}
                    />
                    <ConfigCard
                      icon={LayoutGrid}
                      title="Layouts"
                      description="Design forms and list views"
                      onClick={() => console.log('Navigate to Layouts')}
                    />
                    <ConfigCard
                      icon={Calculator}
                      title="Formula"
                      description="Create calculated fields and formulas"
                      onClick={() => console.log('Navigate to Formula')}
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entity Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Base</option>
                      <option>Base Plus</option>
                      <option>Person</option>
                      <option>Company</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CRM"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Color
                    </label>
                    <input
                      type="color"
                      className="w-20 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue="#6b7280"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="disabled"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="disabled" className="text-sm font-medium text-gray-700">
                      Disabled
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="stream"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="stream" className="text-sm font-medium text-gray-700">
                      Stream
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="activities"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="activities" className="text-sm font-medium text-gray-700">
                      Activities
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter entity description..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountEntityManager;