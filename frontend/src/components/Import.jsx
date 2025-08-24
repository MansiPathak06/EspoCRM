import React, { useState } from 'react';
import { ChevronLeft, Upload, Info } from 'lucide-react';

const Import = () => {
  const [currentView, setCurrentView] = useState('import'); // 'import' or 'results'
  const [selectedFile, setSelectedFile] = useState(null);
  const [entityType, setEntityType] = useState('');
  const [importCreated, setImportCreated] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCreateImport = () => {
    if (selectedFile && entityType) {
      setImportCreated(true);
      // Here you would typically process the import
    }
  };

  const ImportForm = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-medium text-gray-900">Import</h1>
          </div>
          <button
            onClick={() => setCurrentView('results')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Import Results
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Step 1 Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Step 1</h2>
          </div>

          <div className="p-6 space-y-8">
            {/* What to Import Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">What to Import?</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entity Type
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value)}
                  >
                    <option value="">Select...</option>
                        <option value="Account">Account</option>
                        <option value="Contact">Contact</option>
                        <option value="Lead">Lead</option>
                        <option value="Opportunity">Opportunity</option>
                        <option value="Call">Call</option>
                        <option value="Campaign">Campaign</option>
                        <option value="Case">Case</option>
                        <option value="Document">Document</option>
                        <option value="Email">Email</option>
                        <option value="knowledgeBaseArticle">Knowledge Base Article</option>
                        <option value="Meeting">Meeting</option>
                        <option value="targetList">Target List</option>
                        <option value="Task">Task</option>
                        <option value="User">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File (CSV)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <Upload className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedFile ? selectedFile.name : 'Choose file...'}
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Should be UTF-8 encoded</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What to do?
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Create Only</option>
                    <option>Create & Update</option>
                    <option>Update Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Properties</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Header Row</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field Delimiter
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>,</option>
                      <option>;</option>
                      <option>|</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Qualifier
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Double Quote</option>
                      <option>Single Quote</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Person Name Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>First Last</option>
                      <option>Last First</option>
                      <option>Last, First</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>YYYY-MM-DD : 2021-12-27</option>
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>HH:mm:ss : 23:00:00</option>
                      <option>HH:mm</option>
                      <option>h:mm A</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Properties Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Decimal Mark
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>.</option>
                    <option>,</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telephone country code
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select...</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+91</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Execute in Idle (for big data; via cron)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex items-center">
                      Run Manually 
                      <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </span>
                  </label>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Skip searching for duplicates</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex items-center">
                      Silent Mode 
                      <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
              <div className="bg-gray-50 rounded-md p-4 text-center text-gray-500">
                No Data
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleCreateImport}
                disabled={!selectedFile || !entityType}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Create Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ImportResults = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('import')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-medium text-gray-900">Import</h1>
          </div>
          <button
            onClick={() => setCurrentView('import')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + New Import
          </button>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96 flex items-center justify-center">
          {importCreated ? (
            <div className="text-center">
              <div className="text-green-600 text-lg font-medium mb-2">Import Created Successfully!</div>
              <p className="text-gray-600">Your import is being processed...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-gray-400 text-lg font-medium mb-2">0 / 0</div>
              <p className="text-gray-500">No Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return currentView === 'import' ? <ImportForm /> : <ImportResults />;
};

export default Import;