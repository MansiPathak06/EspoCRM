import React, { useState } from 'react';
import { X, Paperclip, ChevronDown } from 'lucide-react';

export default function Post() {
  const [message, setMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('Self');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const recipients = ['Self', 'Team', 'All Users', 'Followers'];

  const handlePost = () => {
    if (message.trim()) {
      console.log('Posting:', { message, to: selectedRecipient });
      setMessage('');
    }
  };

  const handleCancel = () => {
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-normal text-gray-700">Stream</h1>
            <div className="flex space-x-6">
              <button className="text-gray-600 hover:text-gray-800 border-b-2 border-blue-500 pb-2">
                All
              </button>
              <button className="text-gray-500 hover:text-gray-700 pb-2">
                Posts
              </button>
              <button className="text-gray-500 hover:text-gray-700 pb-2">
                Updates
              </button>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            + Create Post
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Create Post Modal Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Create Post</h2>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Message Input */}
              <div className="mb-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here"
                  className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                {/* Attachment Icon */}
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip size={20} />
                  </button>
                </div>

                {/* To Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">To</span>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm text-gray-700">{selectedRecipient}</span>
                      <ChevronDown size={16} className="text-gray-500" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                        {recipients.map((recipient) => (
                          <button
                            key={recipient}
                            onClick={() => {
                              setSelectedRecipient(recipient);
                              setIsDropdownOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {recipient}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Background Stream Content (shown behind modal) */}
        <div className="text-center text-gray-500 py-16">
          <p>No Data</p>
        </div>
      </div>
    </div>
  );
}