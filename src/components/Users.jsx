import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  MoreHorizontal,
  Check,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  Ban,
  AlertTriangle,
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin",
      userName: "admin",
      title: "",
      email: "",
      isActive: true,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  // Form state
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    emailOptedOut: false,
    emailInvalid: false,
    phone: "",
    phoneOptedOut: false,
    phoneInvalid: false,
    gender: "Not Set",
    type: "Regular",
    isActive: true,
    teams: [],
    defaultTeam: "",
    roles: [],
    workingTimeCalendar: "",
    layoutSet: "",
    password: "",
    confirmPassword: "",
  });

  // Modal states
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [showDefaultTeamModal, setShowDefaultTeamModal] = useState(false);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [showWorkingTimeModal, setShowWorkingTimeModal] = useState(false);
  const [showLayoutModal, setShowLayoutModal] = useState(false);

  // Sample data
  const teams = [
    "Sales Team",
    "Marketing Team",
    "Support Team",
    "Development Team",
  ];
  const roles = [
    "Administrator",
    "Manager",
    "Sales Representative",
    "Support Agent",
  ];
  const workingTimeCalendars = ["Standard", "Flexible", "Part-time", "Remote"];
  const layoutSets = ["Default", "Compact", "Extended", "Mobile"];
  const genderOptions = ["Not Set", "Male", "Female", "Other"];
  const typeOptions = ["Regular", "Admin", "Portal", "System"];

  const generatePassword = () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData((prev) => ({ ...prev, password, confirmPassword: password }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name:
        `${formData.firstName} ${formData.lastName}`.trim() ||
        formData.userName,
      userName: formData.userName,
      title: formData.title,
      email: formData.email,
      isActive: formData.isActive,
    };

    setUsers([...users, newUser]);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      emailOptedOut: false,
      emailInvalid: false,
      phone: "",
      phoneOptedOut: false,
      phoneInvalid: false,
      gender: "Not Set",
      type: "Regular",
      isActive: true,
      teams: [],
      defaultTeam: "",
      roles: [],
      workingTimeCalendar: "",
      layoutSet: "",
      password: "",
      confirmPassword: "",
    });
    setAvatar(null);
  };
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const SelectModal = ({
    show,
    onClose,
    title,
    options,
    selected,
    onToggle,
    single = false,
  }) => (
    <Modal show={show} onClose={onClose} title={title}>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <input
              type={single ? "radio" : "checkbox"}
              checked={single ? selected === option : selected.includes(option)}
              onChange={() => onToggle(option)}
              className="rounded"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Done
        </button>
      </div>
    </Modal>
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Users</span>
                <ChevronDown size={16} className="text-gray-400" />
                <span className="text-blue-500">create</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button className="px-2 py-2 text-gray-500 hover:text-gray-700">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Name *
                  </label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) =>
                      handleInputChange("userName", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex border-t border-b border-r border-gray-300 rounded-r">
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "emailOptedOut",
                            !formData.emailOptedOut
                          )
                        }
                        className={`px-2 py-2 ${
                          formData.emailOptedOut
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-50 text-gray-400"
                        } hover:bg-gray-100`}
                        title="Opted Out"
                      >
                        <Ban size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "emailInvalid",
                            !formData.emailInvalid
                          )
                        }
                        className={`px-2 py-2 rounded-r ${
                          formData.emailInvalid
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-50 text-gray-400"
                        } hover:bg-gray-100`}
                        title="Invalid"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="border border-gray-300 rounded-l px-3 py-2 bg-white">
                      <option>Mobile</option>
                      <option>Office</option>
                      <option>Home</option>
                    </select>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 000-000-0000"
                      className="flex-1 border-t border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex border-t border-b border-r border-gray-300 rounded-r">
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "phoneOptedOut",
                            !formData.phoneOptedOut
                          )
                        }
                        className={`px-2 py-2 ${
                          formData.phoneOptedOut
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-50 text-gray-400"
                        } hover:bg-gray-100`}
                        title="Opted Out"
                      >
                        <Ban size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "phoneInvalid",
                            !formData.phoneInvalid
                          )
                        }
                        className={`px-2 py-2 rounded-r ${
                          formData.phoneInvalid
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-50 text-gray-400"
                        } hover:bg-gray-100`}
                        title="Invalid"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teams and Access Control */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Teams and Access Control
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {typeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) =>
                          handleInputChange("isActive", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="isActive"
                        className="text-sm font-medium text-gray-700"
                      >
                        Is Active
                      </label>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teams
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowTeamsModal(true)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                    >
                      <span className="text-gray-500">
                        {formData.teams.length > 0
                          ? `${formData.teams.length} selected`
                          : "Select"}
                      </span>
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  {/* Default Team */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Team
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowDefaultTeamModal(true)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                    >
                      <span
                        className={
                          formData.defaultTeam
                            ? "text-gray-900"
                            : "text-gray-500"
                        }
                      >
                        {formData.defaultTeam || "Select"}
                      </span>
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  {/* Roles */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Roles
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRolesModal(true)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                    >
                      <span className="text-gray-500">
                        {formData.roles.length > 0
                          ? `${formData.roles.length} selected`
                          : "Select"}
                      </span>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>

                {/* Misc */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Misc
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Working Time Calendar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Working Time Calendar
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowWorkingTimeModal(true)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span
                          className={
                            formData.workingTimeCalendar
                              ? "text-gray-900"
                              : "text-gray-500"
                          }
                        >
                          {formData.workingTimeCalendar || "Select"}
                        </span>
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    {/* Layout Set */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Layout Set
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowLayoutModal(true)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span
                          className={
                            formData.layoutSet
                              ? "text-gray-900"
                              : "text-gray-500"
                          }
                        >
                          {formData.layoutSet || "Select"}
                        </span>
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Password
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="relative flex-1">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-l px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={generatePassword}
                          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 flex items-center space-x-1"
                        >
                          <RefreshCw size={16} />
                          <span className="hidden sm:inline">Generate</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Avatar */}
              {/* Right Column - Avatar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-lg">No Image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
                  >
                    Upload Avatar
                  </label>
                </div>
              </div>
            </div>
          </form>

          {/* Modals */}
          <SelectModal
            show={showTeamsModal}
            onClose={() => setShowTeamsModal(false)}
            title="Select Teams"
            options={teams}
            selected={formData.teams}
            onToggle={(team) => toggleSelection("teams", team)}
          />

          <SelectModal
            show={showDefaultTeamModal}
            onClose={() => setShowDefaultTeamModal(false)}
            title="Select Default Team"
            options={teams}
            selected={formData.defaultTeam}
            onToggle={(team) => handleInputChange("defaultTeam", team)}
            single={true}
          />

          <SelectModal
            show={showRolesModal}
            onClose={() => setShowRolesModal(false)}
            title="Select Roles"
            options={roles}
            selected={formData.roles}
            onToggle={(role) => toggleSelection("roles", role)}
          />

          <SelectModal
            show={showWorkingTimeModal}
            onClose={() => setShowWorkingTimeModal(false)}
            title="Select Working Time Calendar"
            options={workingTimeCalendars}
            selected={formData.workingTimeCalendar}
            onToggle={(calendar) =>
              handleInputChange("workingTimeCalendar", calendar)
            }
            single={true}
          />

          <SelectModal
            show={showLayoutModal}
            onClose={() => setShowLayoutModal(false)}
            title="Select Layout Set"
            options={layoutSets}
            selected={formData.layoutSet}
            onToggle={(layout) => handleInputChange("layoutSet", layout)}
            single={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Plus size={16} />
              <span>Create User</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded bg-white">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Name</span>
                    {sortOrder === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Is Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-yellow-600 text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isActive ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <X size={16} className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing 1-{filteredUsers.length} of {filteredUsers.length}
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                1
              </span>
              <button
                disabled={filteredUsers.length < 10}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
