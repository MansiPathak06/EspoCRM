import React, { useState } from 'react';
import { ChevronRight, Info, X } from 'lucide-react';

const Currency = () => {
  const [formData, setFormData] = useState({
    defaultCurrency: 'INR',
    currencyFormat: '₹10',
    currencyDecimalPlaces: '2',
    baseCurrency: 'INR'
  });

  const [currencyList, setCurrencyList] = useState([
    { id: 1, code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { id: 2, code: 'USD', name: 'US Dollar', symbol: '$' },
    { id: 3, code: 'EUR', name: 'Euro', symbol: '€' },
    { id: 4, code: 'GBP', name: 'British Pound', symbol: '£' }
  ]);

  const currencyFormats = [
    '₹10',
    '₹ 10',
    '10₹',
    '10 ₹',
    'INR 10',
    '10 INR'
  ];

  const availableCurrencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving currency configuration:', formData);
    console.log('Currency list:', currencyList);
    alert('Currency configuration saved successfully!');
  };

  const handleCancel = () => {
    console.log('Canceling changes');
    // Reset form or navigate away
  };

  const navigateToAdmin = () => {
    window.location.href = '/admin';
  };

  const removeCurrencyFromList = (id) => {
    setCurrencyList(prev => prev.filter(currency => currency.id !== id));
  };

  const addCurrencyToList = (currencyCode) => {
    const currency = availableCurrencies.find(c => c.code === currencyCode);
    if (currency && !currencyList.find(c => c.code === currencyCode)) {
      const newCurrency = {
        id: Date.now(),
        code: currency.code,
        name: currency.name,
        symbol: currency.symbol
      };
      setCurrencyList(prev => [...prev, newCurrency]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center text-sm text-gray-600">
          <button 
            onClick={navigateToAdmin}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            Administration
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">Currency</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto">
        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Currency Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Currency Settings</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency *
                </label>
                <select 
                  value={formData.defaultCurrency}
                  onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableCurrencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency List *
                  <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                </label>
                <div className="space-y-2">
                  {currencyList.map((currency) => (
                    <div key={currency.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded border">
                      <span className="text-sm font-medium">
                        {currency.code} - {currency.name}
                      </span>
                      <button
                        onClick={() => removeCurrencyFromList(currency.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove currency"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="mt-3">
                    <select 
                      onChange={(e) => {
                        if (e.target.value) {
                          addCurrencyToList(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Add Currency...</option>
                      {availableCurrencies
                        .filter(currency => !currencyList.find(c => c.code === currency.code))
                        .map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency Format
                </label>
                <select 
                  value={formData.currencyFormat}
                  onChange={(e) => handleInputChange('currencyFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencyFormats.map(format => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency Decimal Places
                  <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                </label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={formData.currencyDecimalPlaces}
                  onChange={(e) => handleInputChange('currencyDecimalPlaces', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Currency Rates Section */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Currency Rates</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Currency *
                </label>
                <select 
                  value={formData.baseCurrency}
                  onChange={(e) => handleInputChange('baseCurrency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencyList.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {/* Empty space for layout consistency */}
              </div>
            </div>

            {/* Exchange Rates Table */}
            {currencyList.length > 1 && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Exchange Rates (Base: {formData.baseCurrency})</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Currency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate (1 {formData.baseCurrency} =)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currencyList
                        .filter(currency => currency.code !== formData.baseCurrency)
                        .map(currency => (
                          <tr key={currency.code}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {currency.code} - {currency.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                step="0.0001"
                                placeholder="Enter rate"
                                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Currency Format Preview:</p>
              <p className="text-xl font-semibold text-gray-800">
                {formData.currencyFormat.replace('10', '1234.56')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;