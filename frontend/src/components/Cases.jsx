import React, { useState, useRef } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  X,
  MoreHorizontal,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

const Cases = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'create'
  const [cases, setCases] = useState([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showCreateContactModal, setShowCreateContactModal] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    status: "New",
    priority: "Normal",
    type: "",
    account: "",
    contacts: "",
    assignedUser: "",
    teams: "",
    description: "",
    hiddenFromPortal: false,
  });

  const [accountFormData, setAccountFormData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    type: "",
    industry: "",
    description: "",
    assignedUser: "",
    teams: "",
  });

  const [contactFormData, setContactFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    accounts: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    description: "",
    assignedUser: "",
    teams: "",
  });

  const statusOptions = [
    { value: "New", color: "bg-blue-100 text-blue-800" },
    { value: "Assigned", color: "bg-sky-100 text-sky-800" },
    { value: "Pending", color: "bg-red-100 text-red-800" },
    { value: "Closed", color: "bg-green-100 text-green-800" },
    { value: "Rejected", color: "bg-purple-100 text-purple-800" },
    { value: "Duplicate", color: "bg-purple-100 text-purple-800" },
  ];

  const priorityOptions = [
    { value: "Low", color: "bg-gray-100 text-gray-800" },
    { value: "Normal", color: "bg-blue-100 text-blue-800" },
    { value: "High", color: "bg-orange-100 text-orange-800" },
    { value: "Urgent", color: "bg-red-100 text-red-800" },
  ];

  const typeOptions = ["Question", "Incident", "Problem"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAccountFormChange = (field, value) => {
    setAccountFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactFormChange = (field, value) => {
    setContactFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      const newCase = {
        id: Date.now(),
        ...formData,
        createdDate: new Date().toISOString(),
      };
      setCases((prev) => [newCase, ...prev]);
      setFormData({
        name: "",
        status: "New",
        priority: "Normal",
        type: "",
        account: "",
        contacts: "",
        assignedUser: "",
        teams: "",
        description: "",
        hiddenFromPortal: false,
      });
      setCurrentView("list");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      status: "New",
      priority: "Normal",
      type: "",
      account: "",
      contacts: "",
      assignedUser: "",
      teams: "",
      description: "",
      hiddenFromPortal: false,
    });
    setCurrentView("list");
    setAttachments([]);
  };
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event) => {
  const files = Array.from(event.target.files || []);
  const newAttachments = files.map(file => ({
    id: Date.now() + Math.random(), // Better unique ID
    file,
    name: file.name,
    size: file.size,
    type: file.type
  }));
  
  setAttachments(prev => [...prev, ...newAttachments]);
  
  // Reset input
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };
  const handleCreateAccount = () => {
    // Logic to create account would go here
    setShowCreateAccountModal(false);
    setAccountFormData({
      name: "",
      website: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      type: "",
      industry: "",
      description: "",
      assignedUser: "",
      teams: "",
    });
  };

  const handleCreateContact = () => {
    // Logic to create contact would go here
    setShowCreateContactModal(false);
    setContactFormData({
      salutation: "",
      firstName: "",
      lastName: "",
      accounts: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      description: "",
      assignedUser: "",
      teams: "",
    });
  };

  const DropdownField = ({
    value,
    options,
    onChange,
    placeholder = "Select",
  }) => (
    <div className="relative">
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={typeof option === "string" ? option : option.value}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.value}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
  const handleSend = () => {
    console.log("Attachments:", attachments);
  };

  const SelectField = ({
    value,
    onChange,
    placeholder = "Select",
    onArrowClick,
  }) => (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly
        />
        <div className="flex items-center px-2 space-x-1">
          <ChevronUp
            className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onArrowClick}
          />
          {value && (
            <X
              className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => onChange("")}
            />
          )}
        </div>
      </div>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <span className="text-gray-400">−</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorityOptions.find((p) => p.value === priority);
    return priorityObj ? priorityObj.color : "bg-gray-100 text-gray-800";
  };

  if (currentView === "create") {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <span
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setCurrentView("list")}
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
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <DropdownField
                      value={formData.status}
                      options={statusOptions}
                      onChange={(value) => handleInputChange("status", value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <DropdownField
                      value={formData.priority}
                      options={priorityOptions}
                      onChange={(value) => handleInputChange("priority", value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <DropdownField
                      value={formData.type}
                      options={typeOptions}
                      onChange={(value) => handleInputChange("type", value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments
                    </label>

                    <button
                      onClick={handleFileSelect}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="Attach file"
                    >
                      <Paperclip className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* YE LINE ADD KARIYE - Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                    />

                    {/* Attachments display karne ke liye */}
                    {attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                          >
                            <span className="text-sm text-gray-700">
                              {attachment.name}
                            </span>
                            <button
                              onClick={() => removeAttachment(attachment.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned User
                    </label>
                    <SelectField
                      value={formData.assignedUser}
                      onChange={(value) =>
                        handleInputChange("assignedUser", value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account
                    </label>
                    <SelectField
                      value={formData.account}
                      onChange={(value) => handleInputChange("account", value)}
                      onArrowClick={() => setShowAccountModal(true)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teams
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contacts
                    </label>
                    <SelectField
                      value={formData.contacts}
                      onChange={(value) => handleInputChange("contacts", value)}
                      onArrowClick={() => setShowContactModal(true)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hiddenFromPortal"
                      className="rounded border-gray-300"
                      checked={formData.hiddenFromPortal}
                      onChange={(e) =>
                        handleInputChange("hiddenFromPortal", e.target.checked)
                      }
                    />
                    <label
                      htmlFor="hiddenFromPortal"
                      className="text-sm text-gray-700"
                    >
                      Hidden from Portal
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Selection Modal */}
        <Modal
          isOpen={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          title="Select · Accounts"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAccountModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateAccountModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                  <option>All</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-6 text-center text-gray-500">No Data</div>
        </Modal>

        {/* Contact Selection Modal */}
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title="Select · Contacts"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  onClick={() => setShowContactModal(false)}
                >
                  Select
                </button>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateContactModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                  <option>All</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-6 text-center text-gray-500">No Data</div>
        </Modal>

        {/* Create Account Modal */}
        <Modal
          isOpen={showCreateAccountModal}
          onClose={() => setShowCreateAccountModal(false)}
          title="Create Account"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCreateAccount}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowCreateAccountModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={accountFormData.name}
                    onChange={(e) =>
                      handleAccountFormChange("name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={accountFormData.website}
                    onChange={(e) =>
                      handleAccountFormChange("website", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={accountFormData.email}
                      onChange={(e) =>
                        handleAccountFormChange("email", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2 border-t border-r border-b border-gray-300 rounded-r-md">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="px-3 py-2 border border-gray-300 rounded-l-md bg-white">
                      <option>Office</option>
                      <option>Mobile</option>
                    </select>
                    <input
                      type="text"
                      className="px-2 py-2 border-t border-b border-gray-300 w-16"
                      placeholder="+1"
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border-t border-b border-gray-300"
                      placeholder="000-000-0000"
                      value={accountFormData.phone}
                      onChange={(e) =>
                        handleAccountFormChange("phone", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2 border-t border-r border-b border-gray-300 rounded-r-md">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={accountFormData.city}
                      onChange={(e) =>
                        handleAccountFormChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={accountFormData.country}
                      onChange={(e) =>
                        handleAccountFormChange("country", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                      <option></option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                      <option></option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    value={accountFormData.description}
                    onChange={(e) =>
                      handleAccountFormChange("description", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned User
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select"
                      value={accountFormData.assignedUser}
                      onChange={(e) =>
                        handleAccountFormChange("assignedUser", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                      <X className="w-4 h-4 text-gray-500 ml-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teams
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select"
                      value={accountFormData.teams}
                      onChange={(e) =>
                        handleAccountFormChange("teams", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Create Contact Modal */}
        <Modal
          isOpen={showCreateContactModal}
          onClose={() => setShowCreateContactModal(false)}
          title="Create Contact"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCreateContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowCreateContactModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md bg-white">
                      <option></option>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                      <option>Dr.</option>
                    </select>
                    <input
                      type="text"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First Name"
                      value={contactFormData.firstName}
                      onChange={(e) =>
                        handleContactFormChange("firstName", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last Name"
                      value={contactFormData.lastName}
                      onChange={(e) =>
                        handleContactFormChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accounts
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select"
                      value={contactFormData.accounts}
                      onChange={(e) =>
                        handleContactFormChange("accounts", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2">
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactFormData.email}
                      onChange={(e) =>
                        handleContactFormChange("email", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2 border-t border-r border-b border-gray-300 rounded-r-md">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="px-3 py-2 border border-gray-300 rounded-l-md bg-white">
                      <option>Mobile</option>
                      <option>Office</option>
                    </select>
                    <input
                      type="text"
                      className="px-2 py-2 border-t border-b border-gray-300 w-16"
                      placeholder="+1"
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border-t border-b border-gray-300"
                      placeholder="000-000-0000"
                      value={contactFormData.phone}
                      onChange={(e) =>
                        handleContactFormChange("phone", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2 border-t border-r border-b border-gray-300 rounded-r-md">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactFormData.city}
                      onChange={(e) =>
                        handleContactFormChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactFormData.country}
                      onChange={(e) =>
                        handleContactFormChange("country", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    value={contactFormData.description}
                    onChange={(e) =>
                      handleContactFormChange("description", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned User
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select"
                      value={contactFormData.assignedUser}
                      onChange={(e) =>
                        handleContactFormChange("assignedUser", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                      <X className="w-4 h-4 text-gray-500 ml-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teams
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select"
                      value={contactFormData.teams}
                      onChange={(e) =>
                        handleContactFormChange("teams", e.target.value)
                      }
                    />
                    <div className="flex items-center px-2">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Cases</h1>
          <button
            onClick={() => setCurrentView("create")}
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
                <option>Assigned</option>
                <option>Pending</option>
                <option>Closed</option>
                <option>Rejected</option>
                <option>Duplicate</option>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {caseItem.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            caseItem.status
                          )}`}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                            caseItem.priority
                          )}`}
                        >
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.account}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.assignedUser}
                      </td>
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
            {cases.length === 0 ? "0 / 0" : `1 / ${cases.length}`}
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              disabled={cases.length === 0}
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              disabled={cases.length === 0}
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
