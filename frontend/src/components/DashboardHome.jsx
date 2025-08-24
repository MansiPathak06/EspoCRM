import React, { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Plus,
  Eye,
  RotateCcw,
  Settings,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashletOptionsModal from "../pages/DashletOptionsModal";
import StreamOptionsModal from "../pages/StreamOptionsModal";

const DashboardHome = () => {
  const [streamDropdownOpen, setStreamDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(false);

  const StreamDropdownMenu = () => (
    <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
      <Link
        to="/post"
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Plus className="w-4 h-4 mr-3" />
        Create Post
      </Link>
      <Link
        to="/post"
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Eye className="w-4 h-4 mr-3" />
        View
      </Link>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
        <RotateCcw className="w-4 h-4 mr-3" />
        Refresh
      </button>
      <button
        onClick={() => {
          setOpen(true);
          setStreamDropdownOpen(false);
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Settings className="w-4 h-4 mr-3" />
        Options
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
        <X className="w-4 h-4 mr-3" />
        Remove
      </button>
    </div>
  );

  const ActivitiesDropdownMenu = () => (
    <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
      <Link
        to="/meetings"
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Plus className="w-4 h-4 mr-3" />
        Create Meeting
      </Link>
      <Link
        to="/calls"
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Plus className="w-4 h-4 mr-3" />
        Create Call
      </Link>
      <Link
        to="/task"
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Plus className="w-4 h-4 mr-3" />
        Create Task
      </Link>
      <div className="border-t border-gray-100 my-1"></div>
      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <RotateCcw className="w-4 h-4 mr-3" />
        Refresh
      </button>
      <button
        onClick={() => {
          setShowOptions(true);
          setActivitiesDropdownOpen(false);
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Settings className="w-4 h-4 mr-3" />
        Options
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
        <X className="w-4 h-4 mr-3" />
        Remove
      </button>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = () => {
      setStreamDropdownOpen(false);
      setActivitiesDropdownOpen(false);
    };

    if (streamDropdownOpen || activitiesDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [streamDropdownOpen, activitiesDropdownOpen]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 flex-wrap">
      {/* Stream */}
      <section className="w-full lg:flex-1 bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Stream</h2>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStreamDropdownOpen(!streamDropdownOpen);
                setActivitiesDropdownOpen(false);
              }}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
            {streamDropdownOpen && <StreamDropdownMenu />}
          </div>
        </div>
        <div className="min-h-64 flex items-center justify-center">
          <p className="text-gray-500 text-sm">No Data</p>
        </div>
      </section>

      {/* My Activities */}
      <section className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">My Activities</h2>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivitiesDropdownOpen(!activitiesDropdownOpen);
                setStreamDropdownOpen(false);
              }}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
            {activitiesDropdownOpen && <ActivitiesDropdownMenu />}
          </div>
        </div>
        <div className="min-h-64 flex items-center justify-center">
          <p className="text-gray-500 text-sm">No Data</p>
        </div>
      </section>

      {/* Modals */}
      <StreamOptionsModal isOpen={open} onClose={() => setOpen(false)} />
      <DashletOptionsModal isOpen={showOptions} onClose={() => setShowOptions(false)} />
    </div>
  );
};

export default DashboardHome;
