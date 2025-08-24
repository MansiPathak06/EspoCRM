import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Bell,
  MoreHorizontal,
  ChevronDown,
  X,
  Phone,
  Info,
  Mail,
} from "lucide-react";

const Contacts = () => {
  const [currentView, setCurrentView] = useState("list");
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    emails: [{ value: "", type: "office" }],
    phones: [{ value: "", type: "mobile", countryCode: "+1" }],
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    description: "",
    account: "",
    assignedUser: "",
    teams: "",
  });

  const emailTypes = ["office", "home", "personal", "work", "other"];
  const phoneTypes = ["mobile", "office", "home", "work", "fax", "other"];
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      phones: [
        ...formData.phones,
        { value: "", type: "mobile", countryCode: "+1" },
      ],
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
    if (formData.firstName || formData.lastName) {
      const newContact = {
        id: Date.now(),
        ...formData,
        fullName:
          `${formData.salutation} ${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.emails
          .filter((e) => e.value)
          .map((e) => `${e.value} (${e.type})`)
          .join(", "),
        phone: formData.phones
          .filter((p) => p.value)
          .map((p) => `${p.countryCode} ${p.value} (${p.type})`)
          .join(", "),
      };
      setContacts([...contacts, newContact]);
      setFormData({
        salutation: "",
        firstName: "",
        lastName: "",
        emails: [{ value: "", type: "office" }],
        phones: [{ value: "", type: "mobile", countryCode: "+1" }],
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        description: "",
        account: "",
        assignedUser: "",
        teams: "",
      });
      setCurrentView("list");
    }
  };

  const handleCancel = () => {
    setFormData({
      salutation: "",
      firstName: "",
      lastName: "",
      emails: [{ value: "", type: "office" }],
      phones: [{ value: "", type: "mobile", countryCode: "+1" }],
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      description: "",
      account: "",
      assignedUser: "",
      teams: "",
    });
    setCurrentView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        {currentView === "list" ? (
          // Contacts List View
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-semibold text-gray-900">
                  Contacts
                </h1>
              </div>
              <button
                onClick={() => setCurrentView("create")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
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
                        <h3 className="text-blue-600 font-medium text-lg">
                          {contact.fullName}
                        </h3>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setContacts(
                                contacts.map((c) =>
                                  c.id === contact.id
                                    ? { ...c, showMenu: !c.showMenu }
                                    : { ...c, showMenu: false }
                                )
                              )
                            }
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          {contact.showMenu && (
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
                                      `Delete contact "${contact.fullName}"?`
                                    );
                                    if (confirmDelete) {
                                      const newList = contacts.filter(
                                        (c) => c.id !== contact.id
                                      );
                                      setContacts(newList);
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
                        {contact.email && (
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span className="text-right truncate">
                              {contact.email}
                            </span>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex justify-between">
                            <span className="font-medium">Phone:</span>
                            <span className="text-right truncate">
                              {contact.phone}
                            </span>
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
                <div className="hidden md:block overflow-x-auto">
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
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ⋯
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                            {contact.fullName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {contact.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {contact.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.account}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="relative inline-block text-left">
                              <button
                                onClick={() =>
                                  setContacts(
                                    contacts.map((c) =>
                                      c.id === contact.id
                                        ? { ...c, showMenu: !c.showMenu }
                                        : { ...c, showMenu: false }
                                    )
                                  )
                                }
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              {contact.showMenu && (
                                <div className="absolute top-full right-0 mt-2 w-28 bg-white border rounded-md shadow z-50">
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
                                          `Delete contact "${contact.fullName}"?`
                                        );
                                        if (confirmDelete) {
                                          const newList = contacts.filter(
                                            (c) => c.id !== contact.id
                                          );
                                          setContacts(newList);
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
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {contacts.length} / {contacts.length}
              </span>
              <div className="flex space-x-2">
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  disabled
                >
                  ‹
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  disabled
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Create Contact Form
          <div>
            {/* Header with breadcrumb */}
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Contacts
                <span className="mx-2 text-gray-400">›</span>
                <span className="text-gray-600">create</span>
              </h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Action buttons */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Form content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-3">
                          <select
                            name="salutation"
                            value={formData.salutation}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="">-</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Dr.">Dr.</option>
                            <option value="Prof.">Prof.</option>
                          </select>
                        </div>
                        <div className="col-span-4">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-5">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      {formData.emails.map((email, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex rounded border border-gray-300 overflow-hidden">
                            <select
                              value={email.type}
                              onChange={(e) =>
                                handleEmailChange(index, "type", e.target.value)
                              }
                              className="border-0 px-3 py-2 bg-white text-sm focus:outline-none focus:ring-0 min-w-[80px]"
                            >
                              {emailTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                              ))}
                            </select>
                            <input
                              type="email"
                              value={email.value}
                              onChange={(e) =>
                                handleEmailChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="flex-1 border-0 border-l border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-3 py-2 bg-gray-50 text-gray-400 border-l border-gray-300 hover:text-gray-600">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="px-1 py-2 bg-gray-50 text-gray-400 border-l border-gray-300 hover:text-gray-600 min-w-[40px]">
                              <Info className="w-4 h-4" />
                            </button>
                            {formData.emails.length > 1 && (
                              <button
                                onClick={() => removeEmail(index)}
                                className="px-3 py-2 bg-red-50 text-red-500 hover:bg-red-100 border-l border-gray-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addEmail}
                        className="text-blue-600 text-sm hover:text-blue-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Email
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
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
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accounts
                      </label>
                      <div className="relative">
                        <select
                          name="account"
                          value={formData.account}
                          onChange={handleInputChange}
                          className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Select Account</option>
                          <option value="TechCorp Solutions">
                            TechCorp Solutions
                          </option>
                          <option value="Global Industries">
                            Global Industries
                          </option>
                          <option value="Innovate Ltd">Innovate Ltd</option>
                          <option value="Enterprise Systems">
                            Enterprise Systems
                          </option>
                          <option value="Digital Dynamics">
                            Digital Dynamics
                          </option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Phone Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      {formData.phones.map((phone, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex rounded border border-gray-300 overflow-hidden">
                            <select
                              value={phone.type}
                              onChange={(e) =>
                                handlePhoneChange(index, "type", e.target.value)
                              }
                              className="border-0 px-3 py-2 bg-white text-sm focus:outline-none focus:ring-0 min-w-[80px]"
                            >
                              {phoneTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                              ))}
                            </select>
                            <select
                              value={phone.countryCode}
                              onChange={(e) =>
                                handlePhoneChange(
                                  index,
                                  "countryCode",
                                  e.target.value
                                )
                              }
                              className="border-0 border-l border-gray-300 px-2 py-2 bg-white text-sm focus:outline-none focus:ring-0"
                            >
                              {countryCodes.map((cc) => (
                                <option key={cc.code} value={cc.code}>
                                  {cc.code}
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              value={phone.value}
                              onChange={(e) =>
                                handlePhoneChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                                
                              }
                              placeholder="000-000-0000"
                             className="flex-1 border-0 border-l border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-3 py-2 bg-gray-50 text-gray-400 border-l border-gray-300 hover:text-gray-600">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="px-1 py-2 bg-gray-50 text-gray-400 border-l border-gray-300 hover:text-gray-600 min-w-[40px]">
                              <Info className="w-4 h-4" />
                            </button>

                            {formData.phones.length > 1 && (
                              <button
                                onClick={() => removePhone(index)}
                                className="px-3 py-2 bg-red-50 text-red-500 hover:bg-red-100 border-l border-gray-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addPhone}
                        className="text-blue-600 text-sm hover:text-blue-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Phone
                      </button>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assigned User
                      </label>
                      <div className="flex rounded border border-gray-300 overflow-hidden">
                        <div className="relative flex-1">
                          <select
                            name="assignedUser"
                            value={formData.assignedUser}
                            onChange={handleInputChange}
                            className="w-full appearance-none border-0 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">Select User</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Jane Smith">Jane Smith</option>
                            <option value="Mike Johnson">Mike Johnson</option>
                            <option value="Sarah Wilson">Sarah Wilson</option>
                            <option value="David Brown">David Brown</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <button className="px-3 py-2 bg-gray-50 text-gray-400 hover:text-gray-600 border-l border-gray-300">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teams
                      </label>
                      <div className="relative">
                        <select
                          name="teams"
                          value={formData.teams}
                          onChange={handleInputChange}
                          className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Select Team</option>
                          <option value="Sales Team">Sales Team</option>
                          <option value="Marketing Team">Marketing Team</option>
                          <option value="Support Team">Support Team</option>
                          <option value="Development Team">
                            Development Team
                          </option>
                          <option value="Operations Team">
                            Operations Team
                          </option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
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
