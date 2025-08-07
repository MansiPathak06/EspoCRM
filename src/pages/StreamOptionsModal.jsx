import React from "react";

const StreamOptionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Dashlet Options · Stream</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1">Title *</label>
            <input
              type="text"
              defaultValue="Stream"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-sm mb-1">Display Records</label>
              <input
                type="number"
                defaultValue="10"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Auto-refresh Interval</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>30 seconds</option>
                <option>1 minute</option>
                <option>5 minutes</option>
              </select>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input type="checkbox" id="dontShow" className="w-4 h-4" />
            <label htmlFor="dontShow" className="ml-2 text-sm text-gray-700">
              Don't show own records
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Apply
            </button>
          </div>

        </form>

        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default StreamOptionsModal;
