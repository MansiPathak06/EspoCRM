import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  X, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight,
  Calendar,
  Info
} from 'lucide-react';
import { Link } from "react-router-dom";


const Campaigns = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    status: 'Planning',
    type: 'Email',
    budget: '',
    startDate: '',
    endDate: '',
    assignedUser: '',
    teams: '',
    targetLists: '',
    excludingTargetLists: '',
    description: ''
  });

  const statusOptions = ['Planning', 'Active', 'Inactive', 'Complete'];
  const typeOptions = ['Email', 'Newsletter', 'Web', 'Television', 'Radio', 'Mail'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      const newCampaign = {
        id: Date.now(),
        ...formData,
        createdDate: new Date().toISOString()
      };
      setCampaigns(prev => [newCampaign, ...prev]);
      setFormData({
        name: '',
        status: 'Planning',
        type: 'Email',
        budget: '',
        startDate: '',
        endDate: '',
        assignedUser: '',
        teams: '',
        targetLists: '',
        excludingTargetLists: '',
        description: ''
      });
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      status: 'Planning',
      type: 'Email',
      budget: '',
      startDate: '',
      endDate: '',
      assignedUser: '',
      teams: '',
      targetLists: '',
      excludingTargetLists: '',
      description: ''
    });
    setCurrentView('list');
  };

  const DropdownField = ({ value, options, onChange, placeholder = "Select" }) => (
    <div className="relative">
      <select 
        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );

  const SelectField = ({ value, onChange, placeholder = "Select" }) => (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <div className="flex items-center px-2 space-x-1">
          <ChevronDown className="w-4 h-4 text-gray-500" />
          {value && <X className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => onChange('')} />}
        </div>
      </div>
    </div>
  );

  const DateField = ({ value, onChange }) => (
    <div className="relative">
      <input
        type="date"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span 
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setCurrentView('list')}
            >
              Campaigns
            </span>
            <span>›</span>
            <span className="text-gray-900">create</span>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <DropdownField
                    value={formData.type}
                    options={typeOptions}
                    onChange={(value) => handleInputChange('type', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      USD
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Target Lists
                    <Info className="w-4 h-4 text-gray-400 ml-1" />
                  </label>
                  <div className="relative">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.targetLists}
                        onChange={(e) => handleInputChange('targetLists', e.target.value)}
                        placeholder="Select"
                      />
                      <ChevronDown className="w-4 h-4 text-gray-500 mx-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <DropdownField
                    value={formData.status}
                    options={statusOptions}
                    onChange={(value) => handleInputChange('status', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <DateField
                    value={formData.startDate}
                    onChange={(value) => handleInputChange('startDate', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <DateField
                    value={formData.endDate}
                    onChange={(value) => handleInputChange('endDate', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned User</label>
                  <SelectField
                    value={formData.assignedUser}
                    onChange={(value) => handleInputChange('assignedUser', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    Excluding Target Lists
                    <Info className="w-4 h-4 text-gray-400 ml-1" />
                  </label>
                  <div className="relative">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.excludingTargetLists}
                        onChange={(e) => handleInputChange('excludingTargetLists', e.target.value)}
                        placeholder="Select"
                      />
                      <ChevronDown className="w-4 h-4 text-gray-500 mx-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Campaigns</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentView('create')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
            <Link
  to="/targetlist"
  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block text-center"
>
  Target Lists
</Link>

            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All</option>
                <option>Planning</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Complete</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=""
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center text-gray-500">
              <p className="text-lg">No Data</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned User</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {campaign.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                          campaign.status === 'Complete' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.budget ? `$${campaign.budget}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.assignedUser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {campaigns.length === 0 ? '0 / 0' : `1 / ${campaigns.length}`}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled={campaigns.length === 0}>
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled={campaigns.length === 0}>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;