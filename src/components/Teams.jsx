import React, { useState } from 'react';
import { Search, Plus, ChevronDown, MoreHorizontal, Edit, Eye, X, Info } from 'lucide-react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'view', 'edit'
  const [currentTeam, setCurrentTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    roles: [],
    positionList: [],
    layoutSet: '',
    workingTimeCalendar: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      roles: [],
      positionList: [],
      layoutSet: '',
      workingTimeCalendar: ''
    });
  };

  const handleCreateTeam = () => {
    setModalMode('create');
    setCurrentTeam(null);
    resetForm();
    setShowModal(true);
  };

  const handleViewTeam = (team) => {
    setModalMode('view');
    setCurrentTeam(team);
    setFormData({ ...team });
    setShowModal(true);
  };

  const handleEditTeam = (team) => {
    setModalMode('edit');
    setCurrentTeam(team);
    setFormData({ ...team });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newTeam = {
        id: teams.length + 1,
        ...formData
      };
      setTeams([...teams, newTeam]);
    } else if (modalMode === 'edit') {
      setTeams(teams.map(team => 
        team.id === currentTeam.id 
          ? { ...team, ...formData }
          : team
      ));
    }
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPositionItem = () => {
    const newPosition = prompt('Enter position name:');
    if (newPosition && newPosition.trim()) {
      setFormData(prev => ({
        ...prev,
        positionList: [...prev.positionList, newPosition.trim()]
      }));
    }
  };

  const removePositionItem = (index) => {
    setFormData(prev => ({
      ...prev,
      positionList: prev.positionList.filter((_, i) => i !== index)
    }));
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
          <button
            onClick={handleCreateTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Create Team
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

      {/* Teams List */}
      <div className="px-6">
        {teams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Data</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase">
                <div className="col-span-6">Name</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {filteredTeams.map((team) => (
              <div key={team.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 group">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <span className="text-sm font-medium text-gray-900">{team.name}</span>
                  </div>
                  <div className="col-span-5 text-sm text-gray-600">
                    {team.description || ''}
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                      <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronDown size={16} />
                      </button>
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 min-w-24 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                        <button
                          onClick={() => handleViewTeam(team)}
                          className="w-full px-3 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => handleEditTeam(team)}
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
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-gray-500">{teams.length}/0</span>
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
                <span className="text-blue-500">Teams</span>
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

            {/* Modal Actions */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={modalMode === 'view'}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  {/* Roles Field */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                      Roles
                      <Info size={12} className="text-gray-400" />
                    </label>
                    <div className="relative">
                      <select
                        disabled={modalMode === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 appearance-none"
                      >
                        <option>Select</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Layout Set Field */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                      Layout Set
                      <Info size={12} className="text-gray-400" />
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <select
                          value={formData.layoutSet}
                          onChange={(e) => handleInputChange('layoutSet', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 appearance-none"
                        >
                          <option>Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                      {modalMode !== 'view' && (
                        <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Position List Field */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                      Position List
                      <Info size={12} className="text-gray-400" />
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type & press enter"
                        disabled={modalMode === 'view'}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = e.target.value.trim();
                            if (value) {
                              setFormData(prev => ({
                                ...prev,
                                positionList: [...prev.positionList, value]
                              }));
                              e.target.value = '';
                            }
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                      {modalMode !== 'view' && (
                        <button
                          onClick={addPositionItem}
                          className="p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      )}
                    </div>
                    
                    {/* Position List Items */}
                    {formData.positionList && formData.positionList.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {formData.positionList.map((position, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                            <span className="text-sm text-gray-700">{position}</span>
                            {modalMode !== 'view' && (
                              <button
                                onClick={() => removePositionItem(index)}
                                className="p-1 text-gray-400 hover:text-red-600"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Working Time Calendar Field */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                      Working Time Calendar
                      <Info size={12} className="text-gray-400" />
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <select
                          value={formData.workingTimeCalendar}
                          onChange={(e) => handleInputChange('workingTimeCalendar', e.target.value)}
                          disabled={modalMode === 'view'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 appearance-none"
                        >
                          <option>Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                      {modalMode !== 'view' && (
                        <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;