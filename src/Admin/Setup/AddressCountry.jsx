import React, { useState } from 'react';
import { ChevronRight, Search, Plus, MoreVertical, Info, ChevronLeft } from 'lucide-react';

const AddressCountry = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreferred, setIsPreferred] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });

  const handleNavigateToAdmin = () => {
    // In a real app, you would use React Router
    window.location.href = '/admin';
  };

  const handleCreateCountry = () => {
    setCurrentView('create');
  };

  const handleSave = () => {
    if (formData.name && formData.code) {
      const newCountry = {
        id: Date.now(),
        ...formData,
        isPreferred: isPreferred,
        createdAt: new Date().toISOString()
      };
      setCountries([...countries, newCountry]);
      
      // Reset form
      setFormData({ name: '', code: '' });
      setIsPreferred(false);
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', code: '' });
    setIsPreferred(false);
    setCurrentView('list');
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={handleNavigateToAdmin}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Administration
              </button>
              <ChevronRight className="w-4 h-4" />
              <span 
                className="text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
                onClick={() => setCurrentView('list')}
              >
                Address Countries
              </span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-800 font-medium">create</span>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="text-gray-600 hover:text-gray-800 p-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter country name"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">Is Preferred</span>
                      <Info className="w-4 h-4 text-gray-400" />
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isPreferred}
                        onChange={(e) => setIsPreferred(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Mark as preferred country</span>
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Code <span className="text-red-500">*</span>
                      </span>
                      <Info className="w-4 h-4 text-gray-400" />
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter country code (e.g., US, IN, UK)"
                      maxLength={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use ISO 3166-1 alpha-2 or alpha-3 country codes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={handleNavigateToAdmin}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Administration
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">Address Countries</span>
          </nav>
        </div>

        {/* Header with Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Address Countries</h1>
          <button
            onClick={handleCreateCountry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Address Country
          </button>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="text-gray-600 hover:text-gray-800 p-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {filteredCountries.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No Data</div>
                <p className="text-gray-400 mt-2">
                  {searchTerm ? 'No countries found matching your search.' : 'No address countries have been created yet.'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateCountry}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create your first address country
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Code</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Preferred</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCountries.map((country) => (
                      <tr key={country.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-medium">{country.name}</td>
                        <td className="py-3 px-4">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                            {country.code}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {country.isPreferred ? (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                              Yes
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">No</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {new Date(country.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredCountries.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {filteredCountries.length} / {filteredCountries.length}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCountry;