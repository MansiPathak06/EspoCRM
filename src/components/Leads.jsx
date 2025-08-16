import React, { useState } from 'react';
import { 
  UserPlus, 
  Search,
  Plus,
  Bell,
  MoreHorizontal,
  ChevronDown,
  X,
  Menu
} from 'lucide-react';

const Leads = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [leads, setLeads] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    accountName: '',
    email: '',
    phone: '',
    mobile: '',
    title: '',
    website: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    status: 'New',
    source: '',
    opportunityAmount: '',
    campaign: '',
    industry: '',
    description: '',
    assignedUser: '',
    teams: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (formData.firstName || formData.lastName) {
      const newLead = {
        id: Date.now(),
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`.trim()
      };
      setLeads([...leads, newLead]);
      setFormData({
        salutation: '',
        firstName: '',
        lastName: '',
        accountName: '',
        email: '',
        phone: '',
        mobile: '',
        title: '',
        website: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        status: 'New',
        source: '',
        opportunityAmount: '',
        campaign: '',
        industry: '',
        description: '',
        assignedUser: '',
        teams: ''
      });
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({
      salutation: '',
      firstName: '',
      lastName: '',
      accountName: '',
      email: '',
      phone: '',
      mobile: '',
      title: '',
      website: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      status: 'New',
      source: '',
      opportunityAmount: '',
      campaign: '',
      industry: '',
      description: '',
      assignedUser: '',
      teams: ''
    });
    setCurrentView('list');
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'New' ? 'bg-blue-100 text-blue-800' :
      status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' :
      status === 'In Process' ? 'bg-orange-100 text-orange-800' :
      status === 'Converted' ? 'bg-green-100 text-green-800' :
      'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fully responsive */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            <UserPlus className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              Leads
              {currentView === 'create' && (
                <>
                  <span className="mx-2 text-gray-400">›</span>
                  <span className="text-gray-600">create</span>
                </>
              )}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Desktop search */}
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 w-64"
              />
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Desktop action buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 lg:p-6">
        {currentView === 'list' ? (
          // Leads List View
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
                    <option>All</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search leads..."
                  />
                </div>
                
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setCurrentView('create')}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Lead
              </button>
            </div>

            {/* Leads Display */}
            {leads.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-16 sm:py-20">
                <div className="text-center text-gray-500 text-lg">No Data</div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Account Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {lead.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.accountName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.mobile || lead.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <StatusBadge status={lead.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tablet View */}
                <div className="hidden sm:block lg:hidden">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="font-medium text-gray-900">{lead.fullName}</div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                            {lead.accountName && (
                              <div><span className="font-medium">Account:</span> {lead.accountName}</div>
                            )}
                            {lead.email && (
                              <div><span className="font-medium">Email:</span> {lead.email}</div>
                            )}
                            {(lead.mobile || lead.phone) && (
                              <div><span className="font-medium">Phone:</span> {lead.mobile || lead.phone}</div>
                            )}
                            {lead.title && (
                              <div><span className="font-medium">Title:</span> {lead.title}</div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <StatusBadge status={lead.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 border-b border-gray-200 last:border-b-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900 text-base">{lead.fullName}</div>
                          <StatusBadge status={lead.status} />
                        </div>
                        
                        <div className="space-y-2">
                          {lead.accountName && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Account:</span> {lead.accountName}
                            </div>
                          )}
                          {lead.email && (
                            <div className="text-sm text-gray-600 break-all">
                              <span className="font-medium text-gray-900">Email:</span> {lead.email}
                            </div>
                          )}
                          {(lead.mobile || lead.phone) && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Phone:</span> {lead.mobile || lead.phone}
                            </div>
                          )}
                          {lead.title && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Title:</span> {lead.title}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {leads.length > 0 ? `${leads.length} / ${leads.length}` : '0 / 0'}
              </span>
              <div className="flex space-x-1">
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded-md hover:bg-gray-100" disabled>
                  ‹
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded-md hover:bg-gray-100" disabled>
                  ›
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Create Lead Form
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start mb-6 space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex w-full sm:w-auto space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <button className="text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 p-2">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Overview */}
              <div className="space-y-6">
                <div className="text-lg font-semibold text-gray-800 mb-4">Overview</div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col space-y-2">
                    <select
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleInputChange}
                      className="w-full sm:w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">-</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-400 text-sm hover:bg-gray-100">
                      📞
                    </button>
                    <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-gray-400 text-sm hover:bg-gray-100">
                      ℹ️
                    </button>
                  </div>
                  <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">+</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <select className="w-20 border border-gray-300 rounded-l px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-white">
                        <option>Mobile</option>
                        <option>Work</option>
                        <option>Home</option>
                      </select>
                      <div className="flex items-center border border-l-0 border-gray-300 px-2 bg-gray-50 text-sm">
                        +1
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="000-000-0000"
                        className="flex-1 border border-l-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-400 text-sm hover:bg-gray-100">
                        📞
                      </button>
                      <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-gray-400 text-sm hover:bg-gray-100">
                        ℹ️
                      </button>
                    </div>
                  </div>
                  <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">+</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Street"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Middle Column - Details */}
              <div className="space-y-6">
                <div className="text-lg font-semibold text-gray-800 mb-4">Details</div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Process">In Process</option>
                      <option value="Converted">Converted</option>
                      <option value="Recycled">Recycled</option>
                      <option value="Dead">Dead</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <div className="relative">
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">-</option>
                      <option value="Website">Website</option>
                      <option value="Call">Call</option>
                      <option value="Email">Email</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Trade Show">Trade Show</option>
                      <option value="Referral">Referral</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Opportunity Amount</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="opportunityAmount"
                      value={formData.opportunityAmount}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex items-center border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50 text-sm">
                      USD
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <select
                        name="campaign"
                        value={formData.campaign}
                        onChange={handleInputChange}
                        className="w-full appearance-none border border-gray-300 rounded-l px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="Email Campaign">Email Campaign</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Google Ads">Google Ads</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                      🔍
                    </button>
                    <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Right Column - Assignment */}
              <div className="space-y-6">
                <div className="text-lg font-semibold text-gray-800 mb-4">Assignment</div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned User</label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <select
                        name="assignedUser"
                        value={formData.assignedUser}
                        onChange={handleInputChange}
                        className="w-full appearance-none border border-gray-300 rounded-l px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
                  <div className="relative">
                    <select
                      name="teams"
                      value={formData.teams}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Sales Team">Sales Team</option>
                      <option value="Marketing Team">Marketing Team</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Additional fields for better mobile layout */}
                <div className="xl:hidden">
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h4>
                    <div className="text-sm text-gray-500 space-y-2">
                      <p>• All fields marked with * are required</p>
                      <p>• Lead status will be set to 'New' by default</p>
                      <p>• You can assign the lead to a team member after creation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-specific bottom actions */}
            <div className="xl:hidden mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={handleCancel}
                  className="order-2 sm:order-1 w-full sm:w-auto bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="order-1 sm:order-2 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Save Lead
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;