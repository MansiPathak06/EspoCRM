import React, { useState } from 'react';
import { Search, Plus, ChevronDown, MoreHorizontal, Edit, Eye, X } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin',
      userName: 'admin',
      title: '',
      email: '',
      isActive: true,
      type: 'Regular',
      firstName: 'Admin',
      lastName: '',
      phone: '',
      mobile: '',
      avatar: null
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'view', 'edit'
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    mobile: '',
    type: 'Regular',
    isActive: true,
    teams: [],
    defaultTeam: '',
    roles: [],
    workingTimeCalendar: '',
    layoutSet: '',
    password: '',
    confirmPassword: ''
  });

  const resetForm = () => {
    setFormData({
      userName: '',
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      mobile: '',
      type: 'Regular',
      isActive: true,
      teams: [],
      defaultTeam: '',
      roles: [],
      workingTimeCalendar: '',
      layoutSet: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleCreateUser = () => {
    setModalMode('create');
    setCurrentUser(null);
    resetForm();
    setShowModal(true);
  };

  const handleViewUser = (user) => {
    setModalMode('view');
    setCurrentUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setCurrentUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newUser = {
        id: users.length + 1,
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.userName
      };
      setUsers([...users, newUser]);
    } else if (modalMode === 'edit') {
      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { ...user, ...formData, name: `${formData.firstName} ${formData.lastName}`.trim() || formData.userName }
          : user
      ));
    }
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password, confirmPassword: password }));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <button
            onClick={handleCreateUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Create User
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm appearance-none">
              <option>All</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Search size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="px-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">User Name</div>
              <div className="col-span-2">Title</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-1">Is Active</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {filteredUsers.map((user) => (
            <div key={user.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 group">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-600">{user.userName}</div>
                <div className="col-span-2 text-sm text-gray-600">{user.title}</div>
                <div className="col-span-3 text-sm text-gray-600">{user.email}</div>
                <div className="col-span-1">
                  {user.isActive && (
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <div className="col-span-1">
                  <div className="relative">
                    <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronDown size={16} />
                    </button>
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 min-w-24 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="w-full px-3 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="w-full px-3 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-gray-500">1-1 / 1</span>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400">
              <ChevronDown className="rotate-90" size={16} />
            </button>
            <button className="p-1 text-gray-400">
              <ChevronDown className="-rotate-90" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">Users</span>
                <span className="text-gray-400">›</span>
                <span className="text-gray-600">
                  {modalMode === 'create' ? 'create' : modalMode === 'view' ? 'view' : 'edit'}
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Mobile"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                        <input
                          type="text"
                          placeholder="000-000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teams and Access Control */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Teams and Access Control</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => handleInputChange('type', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option>Regular</option>
                          <option>Admin</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => handleInputChange('isActive', e.target.checked)}
                          disabled={modalMode === 'view'}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                        />
                        <label htmlFor="isActive" className="text-sm text-gray-700">
                          Is Active
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  {modalMode !== 'view' && (
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="password"
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={generatePassword}
                              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        You need to setup SMTP settings to make the system be able to send password in email.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column - Avatar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-2"></div>
                    {modalMode !== 'view' && (
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {modalMode !== 'view' && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div></div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;