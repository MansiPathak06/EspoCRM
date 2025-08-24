import React from "react";

const DashletOptionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
        <h2 className="text-lg font-semibold mb-4">Dashlet Options · My Activities</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-medium">Title *</label>
            <input type="text" defaultValue="My Activities" className="w-full border border-gray-300 px-3 py-2 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Display Records</label>
              <input type="number" defaultValue={10} className="w-full border border-gray-300 px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">Next X Days *</label>
              <input type="number" defaultValue={3} className="w-full border border-gray-300 px-3 py-2 rounded" />
            </div>
          </div>

          <div>
            <label className="block font-medium">Auto-refresh Interval</label>
            <select className="w-full border border-gray-300 px-3 py-2 rounded">
              <option>30 seconds</option>
              <option>1 minute</option>
              <option>5 minutes</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">What to display *</label>
            <input type="text" defaultValue="Meetings, Calls, Tasks" className="w-full border border-gray-300 px-3 py-2 rounded" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="shared" className="w-4 h-4" />
            <label htmlFor="shared" className="text-sm">Include Shared</label>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Apply</button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg">×</button>
      </div>
    </div>
  );
};

export default DashletOptionsModal;
