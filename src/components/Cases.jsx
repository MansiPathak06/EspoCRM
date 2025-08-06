import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  X, 
  MoreHorizontal, 
  Paperclip,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Cases = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [cases, setCases] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    status: 'New',
    priority: 'Normal',
    type: '',
    account: '',
    contacts: '',
    assignedUser: '',
    teams: '',
    description: '',
    hiddenFromPortal: false
  });

  const statusOptions = ['New', 'In Progress', 'Closed', 'On Hold'];
  const priorityOptions = ['Low', 'Normal', 'High', 'Urgent'];
  const typeOptions = ['Technical', 'Billing', 'General Inquiry', 'Complaint', 'Feature Request'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      const newCase = {
        id: Date.now(),
        ...formData,
        createdDate: new Date().toISOString()
      };
      setCases(prev => [newCase, ...prev]);
      setFormData({
        name: '',
        status: 'New',
        priority: 'Normal',
        type: '',
        account: '',
        contacts: '',
        assignedUser: '',
        teams: '',
        description: '',
        hiddenFromPortal: false
      });
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      status: 'New',
      priority: 'Normal',
      type: '',
      account: '',
      contacts: '',
      assignedUser: '',
      teams: '',
      description: '',
      hiddenFromPortal: false
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
              Cases
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <DropdownField
                    value={formData.status}
                    options={statusOptions}
                    onChange={(value) => handleInputChange('status', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <DropdownField
                    value={formData.priority}
                    options={priorityOptions}
                    onChange={(value) => handleInputChange('priority', value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Paperclip className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned User</label>
                  <SelectField
                    value={formData.assignedUser}
                    onChange={(value) => handleInputChange('assignedUser', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
                  <SelectField
                    value={formData.account}
                    onChange={(value) => handleInputChange('account', value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contacts</label>
                  <div className="relative">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Select"
                      />
                      <ChevronDown className="w-4 h-4 text-gray-500 mx-2" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hiddenFromPortal"
                    className="rounded border-gray-300"
                    checked={formData.hiddenFromPortal}
                    onChange={(e) => handleInputChange('hiddenFromPortal', e.target.checked)}
                  />
                  <label htmlFor="hiddenFromPortal" className="text-sm text-gray-700">
                    Hidden from Portal
                  </label>
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
          <h1 className="text-xl font-semibold text-gray-900">Cases</h1>
          <button 
            onClick={() => setCurrentView('create')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4" />
            <span>Create Case</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All</option>
                <option>New</option>
                <option>In Progress</option>
                <option>Closed</option>
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
        {cases.length === 0 ? (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {caseItem.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          caseItem.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          caseItem.status === 'Closed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                          caseItem.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          caseItem.priority === 'Normal' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.account}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.assignedUser}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(caseItem.createdDate).toLocaleDateString()}
                      </td>
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
            {cases.length === 0 ? '0 / 0' : `1 / ${cases.length}`}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled={cases.length === 0}>
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled={cases.length === 0}>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;