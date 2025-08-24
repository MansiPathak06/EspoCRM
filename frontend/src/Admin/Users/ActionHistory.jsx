import React from 'react';
import { Search, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const ActionHistory = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        {/* Search and Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder=""
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>User</span>
                      <ChevronLeft className="w-3 h-3 rotate-90" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Empty state - no entries */}
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm">No action history records found</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            1-20
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default ActionHistory;