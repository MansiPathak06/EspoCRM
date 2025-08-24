import React, { useState } from 'react';
import { Search, Plus, X, Eye, EyeOff } from 'lucide-react';

const PortalUsers = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Not Set',
    type: 'Portal',
    active: true,
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const contactFields = [
    'Assigned User', 'Teams', 'Created At', 'Created By', 'Modified At',
    'Stream Updated At', 'Accounts', 'Address', 'Email', 'Phone',
    'Account Title', 'Target Lists', 'Campaign'
  ];

  const handleCreatePortalUser = () => {
    setShowContactModal(true);
  };

  const handleProceedWithoutContact = () => {
    setShowContactModal(false);
    setShowCreateForm(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    setFormData({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Not Set',
      type: 'Portal',
      active: true,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password, confirmPassword: password }));
  };

  const togglePasswordVisibility = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <nav className="text-sm text-gray-600 mb-4">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Portal Users</span>
              <span className="mx-2">›</span>
              <span>create</span>
            </nav>
            
            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleCloseCreateForm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={handleCloseCreateForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button className="px-2 py-2 text-gray-500 hover:text-gray-700">
                ⋯
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>--</option>
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Mrs.</option>
                        <option>Dr.</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-3 py-2 border-t border-r border-b border-gray-300 text-gray-500 hover:text-gray-700">
                        📞
                      </button>
                      <button className="px-3 py-2 border-t border-r border-b border-gray-300 rounded-r text-gray-500 hover:text-gray-700">
                        ✉️
                      </button>
                    </div>
                    <button className="mt-2 text-blue-500 hover:text-blue-700 text-sm">+</button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex">
                      <select className="px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Mobile</option>
                        <option>Home</option>
                        <option>Work</option>
                      </select>
                      <select className="px-2 py-2 border-t border-b border-gray-300 text-sm">
                        <option>+1</option>
                        <option>+91</option>
                        <option>+44</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="000-000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-3 py-2 border-t border-r border-b border-gray-300 text-gray-500 hover:text-gray-700">
                        📞
                      </button>
                      <button className="px-3 py-2 border-t border-r border-b border-gray-300 rounded-r text-gray-500 hover:text-gray-700">
                        ✉️
                      </button>
                    </div>
                    <button className="mt-2 text-blue-500 hover:text-blue-700 text-sm">+</button>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Not Set</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Teams and Access Control */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Teams and Access Control</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value="Portal"
                            checked={formData.type === 'Portal'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Portal
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="active"
                          checked={formData.active}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Active</span>
                        <span className="ml-1 text-gray-400">ℹ️</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Portal</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Portals <span className="text-gray-400">ℹ️</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accounts</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Portal Roles <span className="text-gray-400">ℹ️</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                      <div className="flex">
                        <select className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Select</option>
                        </select>
                        <button className="px-3 py-2 border-t border-r border-b border-gray-300 rounded-r text-gray-500 hover:text-gray-700">
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Misc */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Misc</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Template</label>
                    <div className="flex">
                      <select className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select</option>
                      </select>
                      <button className="px-3 py-2 border-t border-r border-b border-gray-300 rounded-r text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="flex">
                        <input
                          type={formData.showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('showPassword')}
                          className="px-3 py-2 border-t border-b border-gray-300 text-gray-500 hover:text-gray-700"
                        >
                          {formData.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                          type="button"
                          onClick={generatePassword}
                          className="px-3 py-2 border border-gray-300 rounded-r bg-gray-50 text-sm text-blue-600 hover:bg-gray-100"
                        >
                          Generate
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className="flex">
                        <input
                          type={formData.showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('showConfirmPassword')}
                          className="px-3 py-2 border-t border-r border-b border-gray-300 rounded-r text-gray-500 hover:text-gray-700"
                        >
                          {formData.showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    You need to setup <span className="text-blue-600 hover:underline cursor-pointer">SMTP settings</span> to make the system be able to send password in email.
                  </div>
                </div>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Avatar</h3>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">📷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Portal Users</h1>
          <button
            onClick={handleCreatePortalUser}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            Create Portal User
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex">
              <select className="px-3 py-2 border border-gray-300 rounded-l bg-white">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-3 py-2 border border-gray-300 rounded-r bg-gray-50 hover:bg-gray-100">
                <Search size={16} />
              </button>
            </div>
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
              ⋯
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center text-gray-500">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">No Data</h3>
            <p className="text-sm">No portal users found. Create your first portal user to get started.</p>
          </div>
        </div>
      </div>

      {/* Contact Selection Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Select • Contacts</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleProceedWithoutContact}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Proceed w/o Contact
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Search */}
                <div className="lg:col-span-2">
                  <div className="flex gap-2 mb-4">
                    <select className="px-3 py-2 border border-gray-300 rounded bg-white">
                      <option>Not Portal Users</option>
                      <option>All Contacts</option>
                    </select>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="px-3 py-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100">
                      <Search size={16} />
                    </button>
                    <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                      ⋯
                    </button>
                  </div>

                  <div className="border border-gray-300 rounded p-4 min-h-[200px] flex items-center justify-center">
                    <span className="text-gray-500">No Data</span>
                  </div>
                </div>

                {/* Right Column - Add Field */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Add Field</h3>
                    <input
                      type="text"
                      placeholder="Search fields..."
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1 max-h-[300px] overflow-y-auto">
                    {contactFields.map((field, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {field}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalUsers;