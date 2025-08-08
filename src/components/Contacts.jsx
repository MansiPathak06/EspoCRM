import React, { useState } from 'react';
import { 
  Users, 
  Search,
  Plus,
  Bell,
  MoreHorizontal,
  ChevronDown,
  X
} from 'lucide-react';

const Contacts = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    description: '',
    account: '',
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
      const newContact = {
        id: Date.now(),
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`.trim()
      };
      setContacts([...contacts, newContact]);
      setFormData({
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        mobile: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        description: '',
        account: '',
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
      email: '',
      phone: '',
      mobile: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      description: '',
      account: '',
      assignedUser: '',
      teams: ''
    });
    setCurrentView('list');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">
              Contacts
              {currentView === 'create' && (
                <>
                  <span className="mx-2 text-gray-400">›</span>
                  <span className="text-gray-600">create</span>
                </>
              )}
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              />
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6">
        {currentView === 'list' ? (
          // Contacts List View
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
                    <option>All</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 self-start sm:self-auto">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => setCurrentView('create')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Contact
              </button>
            </div>

            {/* Contacts Display */}
            {contacts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-20">
                <div className="text-center text-gray-500 text-lg">No Data</div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Mobile Card View */}
                <div className="block md:hidden">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border-b p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-blue-600 font-medium text-lg">{contact.fullName}</h3>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        {contact.email && (
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span>{contact.email}</span>
                          </div>
                        )}
                        {(contact.mobile || contact.phone) && (
                          <div className="flex justify-between">
                            <span className="font-medium">Phone:</span>
                            <span>{contact.mobile || contact.phone}</span>
                          </div>
                        )}
                        {contact.account && (
                          <div className="flex justify-between">
                            <span className="font-medium">Account:</span>
                            <span>{contact.account}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Account
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {contact.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.mobile || contact.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.account}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2">
              <span className="text-sm text-gray-500 text-center sm:text-left">
                {contacts.length} / {contacts.length}
              </span>
              <div className="flex space-x-2 justify-center">
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                  ‹
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                  ›
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Create Contact Form
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start mb-6 space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button className="text-gray-400 hover:text-gray-600 self-center sm:self-auto">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <select
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleInputChange}
                      className="w-full sm:w-16 border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">-</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-400 text-sm flex-shrink-0">
                      📞
                    </button>
                    <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-gray-400 text-sm flex-shrink-0">
                      ℹ️
                    </button>
                  </div>
                  <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">+</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Street"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounts</label>
                  <div className="relative">
                    <select
                      name="account"
                      value={formData.account}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Company A">Company A</option>
                      <option value="Company B">Company B</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex flex-1">
                      <select className="w-20 border border-gray-300 rounded-l sm:rounded-l px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                        <option>Mobile</option>
                        <option>Work</option>
                        <option>Home</option>
                      </select>
                      <div className="flex items-center border border-l-0 border-gray-300 px-2 bg-gray-50 text-sm flex-shrink-0">
                        +1
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="000-000-0000"
                        className="flex-1 border border-l-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:rounded-none"
                      />
                    </div>
                    <div className="flex sm:inline-flex">
                      <button className="px-3 py-2 border border-l-0 sm:border-l-0 border-t-0 sm:border-t border-gray-300 bg-gray-50 text-gray-400 text-sm flex-1 sm:flex-none">
                        📞
                      </button>
                      <button className="px-3 py-2 border border-l-0 border-t-0 sm:border-t border-gray-300 rounded-r bg-gray-50 text-gray-400 text-sm flex-1 sm:flex-none">
                        ℹ️
                      </button>
                    </div>
                  </div>
                  <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">+</button>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned User</label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <select
                        name="assignedUser"
                        value={formData.assignedUser}
                        onChange={handleInputChange}
                        className="w-full appearance-none border border-gray-300 rounded-l px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-gray-400 hover:text-gray-600 flex-shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
                  <div className="relative">
                    <select
                      name="teams"
                      value={formData.teams}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Sales Team">Sales Team</option>
                      <option value="Marketing Team">Marketing Team</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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

export default Contacts;