import React from 'react';
import { X } from 'lucide-react';

const LastViewed = ({ isOpen, onClose }) => {
  const lastViewedItems = [
    {
      id: 1,
      type: 'User',
      name: 'Admin',
      date: '07:37:40'
    },
    {
      id: 2,
      type: 'Account',
      name: 'Mansi',
      date: '5 Aug',
      hasIndicator: true
    },
    {
      id: 3,
      type: 'Call',
      name: 'Abc',
      date: '2 Aug'
    },
    {
      id: 4,
      type: 'Call',
      name: 'xyz user',
      date: '28 Jul'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-start justify-end pt-16 pr-4">
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Last Viewed</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-80 overflow-y-auto">
          {lastViewedItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No recent items
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {lastViewedItems.map((item) => (
                <div 
                  key={item.id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600">
                          {item.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          {item.hasIndicator && (
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          )}
                          <span className="text-sm text-gray-900 truncate">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastViewed;