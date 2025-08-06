import React, { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AccountsPage = () => {
  const [view, setView] = useState("list"); // 'list' or 'create'
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.name) {
      setAccounts([...accounts, formData]);
      setFormData({
        name: "",
        website: "",
        email: "",
        phone: "",
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
      email: "",
      phone: "",
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
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="text-orange-400">📁</span>
            <span className="ml-2">Accounts</span>
            <span className="mx-2">›</span>
            <span>create</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main Form */}
          <div className="flex-1 p-6">
            <div className="bg-white rounded shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-6">Overview</h3>

                {/* Name and Website Row */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
                        <Search size={16} />
                      </button>
                    </div>
                    <button className="mt-2 text-gray-400">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="flex">
                      <select className="border border-gray-300 rounded-l px-3 py-2 bg-white">
                        <option>Office</option>
                      </select>
                      <span className="border-t border-b border-gray-300 px-2 py-2 bg-gray-50 text-sm">
                        +1
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="000-000-0000"
                        className="flex-1 border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="mt-2 text-gray-400">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Address Section */}
                <div className="grid grid-cols-2 gap-6 mb-6">
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
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="billingPostalCode"
                        value={formData.billingPostalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="text"
                      name="billingCountry"
                      value={formData.billingCountry}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="text"
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4 mt-8">Details</h3>

                {/* Type and Industry */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="customer">Customer</option>
                      <option value="partner">Partner</option>
                      <option value="vendor">Vendor</option>
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
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
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
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 p-6">
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned User
              </label>
              <div className="flex">
                <select
                  name="assignedUser"
                  value={formData.assignedUser}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
                <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
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
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="sales">Sales Team</option>
                  <option value="marketing">Marketing Team</option>
                </select>
                <button className="border border-l-0 border-gray-300 rounded-r px-3 py-2 bg-gray-50">
                  <ChevronDown size={16} />
                </button>
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
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-orange-400 text-xl mr-2">📁</span>
            <h1 className="text-xl font-medium">Accounts</h1>
          </div>
          <button
            onClick={() => setView("create")}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Create Account
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center">
          <select className="border border-gray-300 rounded-l px-3 py-2 bg-white text-sm">
            <option>All</option>
          </select>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border-t border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="border border-gray-300 rounded-r px-3 py-2 bg-gray-50">
            <Search size={16} />
          </button>
          <button className="ml-2 text-gray-400">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {accounts.length === 0 ? (
          <div className="bg-white rounded shadow-sm">
            <div className="p-8 text-center text-gray-500">No Data</div>
          </div>
        ) : (
          <div className="bg-white rounded shadow-sm">
            <div className="overflow-x-auto overflow-visible relative">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Industry</th>
                    <th className="px-4 py-3 text-right">⋯</th>{" "}
                    {/* For dropdown */}
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
                      <td className="py-3 px-4 text-gray-700">
                        {account.email}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
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
            <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
              <div className="text-sm text-gray-500">
                {accounts.length} / {accounts.length}
              </div>
              <div className="flex items-center space-x-1">
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
