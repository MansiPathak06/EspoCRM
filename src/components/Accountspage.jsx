import React, { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const AccountsPage = () => {
  const [view, setView] = useState("list"); // 'list' or 'create'
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    emails: [{ value: "", type: "office" }],
    phones: [{ value: "", type: "office", countryCode: "+1" }],
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingPostalCode: "",
    shippingCountry: "",
    type: "",
    industry: "",
    description: "",
    assignedUser: "",
    teams: "",
  });

  const emailTypes = ["office", "home", "personal", "work", "other"];
  const phoneTypes = ["office", "home", "mobile", "work", "fax", "other"];
  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (index, field, value) => {
    const newEmails = [...formData.emails];
    newEmails[index] = { ...newEmails[index], [field]: value };
    setFormData({ ...formData, emails: newEmails });
  };

  const handlePhoneChange = (index, field, value) => {
    const newPhones = [...formData.phones];
    newPhones[index] = { ...newPhones[index], [field]: value };
    setFormData({ ...formData, phones: newPhones });
  };

  const addEmail = () => {
    setFormData({
      ...formData,
      emails: [...formData.emails, { value: "", type: "office" }],
    });
  };

  const addPhone = () => {
    setFormData({
      ...formData,
      phones: [...formData.phones, { value: "", type: "office", countryCode: "+1" }],
    });
  };

  const removeEmail = (index) => {
    if (formData.emails.length > 1) {
      const newEmails = formData.emails.filter((_, i) => i !== index);
      setFormData({ ...formData, emails: newEmails });
    }
  };

  const removePhone = (index) => {
    if (formData.phones.length > 1) {
      const newPhones = formData.phones.filter((_, i) => i !== index);
      setFormData({ ...formData, phones: newPhones });
    }
  };

  const handleSave = () => {
    if (formData.name) {
      const accountData = {
        ...formData,
        // Format emails and phones for display
        email: formData.emails.filter(e => e.value).map(e => `${e.value} (${e.type})`).join(', '),
        phone: formData.phones.filter(p => p.value).map(p => `${p.countryCode} ${p.value} (${p.type})`).join(', ')
      };
      setAccounts([...accounts, accountData]);
      
      // Reset form
      setFormData({
        name: "",
        website: "",
        emails: [{ value: "", type: "office" }],
        phones: [{ value: "", type: "office", countryCode: "+1" }],
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingPostalCode: "",
        billingCountry: "",
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingPostalCode: "",
        shippingCountry: "",
        type: "",
        industry: "",
        description: "",
        assignedUser: "",
        teams: "",
      });
      setView("list");
    }
  };

  const handleCancel = () => {
    setView("list");
    setFormData({
      name: "",
      website: "",
      emails: [{ value: "", type: "office" }],
      phones: [{ value: "", type: "office", countryCode: "+1" }],
      billingStreet: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "",
      shippingStreet: "",
      shippingCity: "",
      shippingState: "",
      shippingPostalCode: "",
      shippingCountry: "",
      type: "",
      industry: "",
      description: "",
      assignedUser: "",
      teams: "",
    });
  };

  if (view === "create") {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b px-4 sm:px-6 py-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="text-orange-400">📁</span>
            <span className="ml-2">Accounts</span>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 w-full sm:w-auto"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm w-full sm:w-auto flex justify-center">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Form */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="bg-white rounded shadow-sm">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium mb-6">Overview</h3>

                {/* Name and Website Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {/* Email Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {formData.emails.map((email, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex">
                          <select
                            value={email.type}
                            onChange={(e) => handleEmailChange(index, "type", e.target.value)}
                            className="border border-gray-300 rounded-l px-2 py-2 bg-white text-sm flex-shrink-0"
                          >
                            {emailTypes.map(type => (
                              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            ))}
                          </select>
                          <input
                            type="email"
                            value={email.value}
                            onChange={(e) => handleEmailChange(index, "value", e.target.value)}
                            className="flex-1 border-t border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          />
                          <button className="border border-l-0 border-gray-300 px-3 py-2 bg-gray-50 flex-shrink-0">
                            <Search size={16} />
                          </button>
                          {formData.emails.length > 1 && (
                            <button
                              onClick={() => removeEmail(index)}
                              className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-red-50 text-red-500 hover:bg-red-100 flex-shrink-0"
                            >
                              <X size={16} />
                            </button>
                          )}
                          {formData.emails.length === 1 && (
                            <div className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50"></div>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addEmail}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Email
                    </button>
                  </div>

                  {/* Phone Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {formData.phones.map((phone, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex">
                          <select
                            value={phone.type}
                            onChange={(e) => handlePhoneChange(index, "type", e.target.value)}
                            className="border border-gray-300 rounded-l px-2 py-2 bg-white text-sm flex-shrink-0"
                          >
                            {phoneTypes.map(type => (
                              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            ))}
                          </select>
                          <select
                            value={phone.countryCode}
                            onChange={(e) => handlePhoneChange(index, "countryCode", e.target.value)}
                            className="border-t border-b border-gray-300 px-2 py-2 bg-white text-sm flex-shrink-0"
                          >
                            {countryCodes.map(cc => (
                              <option key={cc.code} value={cc.code}>{cc.code}</option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            value={phone.value}
                            onChange={(e) => handlePhoneChange(index, "value", e.target.value)}
                            placeholder="000-000-0000"
                            className="flex-1 border-t border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base min-w-0"
                          />
                          {formData.phones.length > 1 && (
                            <button
                              onClick={() => removePhone(index)}
                              className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-red-50 text-red-500 hover:bg-red-100 flex-shrink-0"
                            >
                              <X size={16} />
                            </button>
                          )}
                          {formData.phones.length === 1 && (
                            <div className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50"></div>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addPhone}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Phone
                    </button>
                  </div>
                </div>

                {/* Address Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      name="billingStreet"
                      value={formData.billingStreet}
                      onChange={handleInputChange}
                      placeholder="Street"
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        name="billingPostalCode"
                        value={formData.billingPostalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                    </div>
                    <input
                      type="text"
                      name="billingCountry"
                      value={formData.billingCountry}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      name="shippingStreet"
                      value={formData.shippingStreet}
                      onChange={handleInputChange}
                      placeholder="Street"
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        name="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                    </div>
                    <input
                      type="text"
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4 mt-8">Details</h3>

                {/* Type and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    >
                      <option value="">Select Type</option>
                      <option value="customer">Customer</option>
                      <option value="partner">Partner</option>
                      <option value="vendor">Vendor</option>
                      <option value="prospect">Prospect</option>
                      <option value="competitor">Competitor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="consulting">Consulting</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-white rounded shadow-sm p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned User
                </label>
                <div className="flex">
                  <select
                    name="assignedUser"
                    value={formData.assignedUser}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select</option>
                    <option value="user1">John Doe</option>
                    <option value="user2">Jane Smith</option>
                    <option value="user3">Mike Johnson</option>
                    <option value="user4">Sarah Wilson</option>
                  </select>
                  <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50 flex-shrink-0">
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded shadow-sm p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teams
                </label>
                <div className="flex">
                  <select
                    name="teams"
                    value={formData.teams}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select</option>
                    <option value="sales">Sales Team</option>
                    <option value="marketing">Marketing Team</option>
                    <option value="support">Support Team</option>
                    <option value="development">Development Team</option>
                  </select>
                  <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50 flex-shrink-0">
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center">
            <span className="text-orange-400 text-xl mr-2">📁</span>
            <h1 className="text-xl font-medium">Accounts</h1>
          </div>
          <button
            onClick={() => setView("create")}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center justify-center w-full sm:w-auto"
          >
            <Plus size={16} className="mr-1" />
            Create Account
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6">
        {accounts.length === 0 ? (
          <div className="bg-white rounded shadow-sm">
            <div className="p-8 text-center text-gray-500">No Data</div>
          </div>
        ) : (
          <div className="bg-white rounded shadow-sm">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              {accounts.map((account, index) => (
                <div key={index} className="border-b p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-blue-600 font-medium text-lg">{account.name}</h3>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setAccounts(
                            accounts.map((a, i) =>
                              i === index
                                ? { ...a, showMenu: !a.showMenu }
                                : { ...a, showMenu: false }
                            )
                          )
                        }
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {account.showMenu && (
                        <div className="absolute top-full right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-50">
                          <div className="py-1 text-sm text-gray-700">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                              View
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                const confirmDelete = confirm(
                                  `Delete account "${account.name}"?`
                                );
                                if (confirmDelete) {
                                  const newList = accounts.filter(
                                    (_, i) => i !== index
                                  );
                                  setAccounts(newList);
                                }
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {account.email && (
                      <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span className="text-right">{account.email}</span>
                      </div>
                    )}
                    {account.phone && (
                      <div className="flex justify-between">
                        <span className="font-medium">Phone:</span>
                        <span className="text-right">{account.phone}</span>
                      </div>
                    )}
                    {account.type && (
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <span>{account.type}</span>
                      </div>
                    )}
                    {account.industry && (
                      <div className="flex justify-between">
                        <span className="font-medium">Industry:</span>
                        <span>{account.industry}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto overflow-visible relative">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Industry</th>
                    <th className="px-4 py-3 text-right">⋯</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 relative group"
                    >
                      <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">
                        {account.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                        {account.email}
                      </td>
                      <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                        {account.phone}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {account.type}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {account.industry}
                      </td>

                      {/* Dropdown toggle */}
                      <td className="px-4 py-3 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setAccounts(
                                accounts.map((a, i) =>
                                  i === index
                                    ? { ...a, showMenu: !a.showMenu }
                                    : { ...a, showMenu: false }
                                )
                              )
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreHorizontal size={16} />
                          </button>

                          {/* Dropdown Menu */}
                          {account.showMenu && (
                            <div className="absolute top-full right-0 mt-2 w-28 bg-white border rounded-md shadow z-50 overflow-visible">
                              <div className="py-1 text-sm text-gray-700">
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                  View
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    const confirmDelete = confirm(
                                      `Delete account "${account.name}"?`
                                    );
                                    if (confirmDelete) {
                                      const newList = accounts.filter(
                                        (_, i) => i !== index
                                      );
                                      setAccounts(newList);
                                    }
                                  }}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 border-t bg-gray-50 gap-2">
              <div className="text-sm text-gray-500 text-center sm:text-left">
                {accounts.length} / {accounts.length}
              </div>
              <div className="flex items-center justify-center space-x-1">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;