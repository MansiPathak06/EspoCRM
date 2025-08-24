import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, X, Minimize2, Maximize2 } from 'lucide-react';

const GroupEmailFolders = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedTeams, setSelectedTeams] = useState('');
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState(false);

  const teams = ['Sales Team', 'Marketing Team', 'Support Team', 'Development Team', 'HR Team'];

  const handleAdminClick = () => {
    // Navigate to /admin
    console.log('Navigating to /admin');
    // In a real app, you'd use React Router: navigate('/admin');
  };

  const handleCreateFolder = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setIsFullScreen(false);
    setFolderName('');
    setSelectedTeams('');
    setIsTeamsDropdownOpen(false);
  };

  const handleSave = () => {
    console.log('Saving folder:', { name: folderName, teams: selectedTeams });
    // Handle save logic here
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleFullForm = () => {
    setIsFullScreen(true);
  };

  const handleMinimize = () => {
    setIsFullScreen(false);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeams(team);
    setIsTeamsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button
            onClick={handleAdminClick}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Administration
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Group Email Folders</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Group Email Folders</h1>
          <button
            onClick={handleCreateFolder}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Folder
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-8 text-center">
            <div className="text-gray-500 text-lg">No Data</div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            0 / 0
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Folder Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white rounded-lg shadow-xl ${isFullScreen ? 'w-full h-full' : 'w-full max-w-md'} relative`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create Folder</h2>
              <div className="flex items-center space-x-2">
                {!isFullScreen ? (
                  <button
                    onClick={handleFullForm}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleMinimize}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleCloseModal}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className={`p-6 ${isFullScreen ? 'flex-1 overflow-y-auto' : ''}`}>
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter folder name"
                  />
                </div>

                {/* Teams Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teams
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setIsTeamsDropdownOpen(!isTeamsDropdownOpen)}
                      className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <span className={selectedTeams ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedTeams || 'Select'}
                      </span>
                      <ChevronRight className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${isTeamsDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {isTeamsDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        {teams.map((team) => (
                          <button
                            key={team}
                            onClick={() => handleTeamSelect(team)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {team}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save
              </button>
              <button
                onClick={handleFullForm}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Full Form
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupEmailFolders;