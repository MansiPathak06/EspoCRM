// src/components/Layout.jsx
import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

import logo from "../assets/logo.webp";
import {
  FaHome,
  FaUserTie,
  FaAddressBook,
  FaUserPlus,
  FaDollarSign,
  FaEnvelope,
  FaCalendarAlt,
  FaPhone,
  FaTasks,
  FaSuitcase,
  FaBook,
  FaChevronLeft,
  FaSearch,
  FaPlus,
  FaBell,
  FaCalendar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target) &&
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target)
      ) {
        setShowMoreMenu(false);
        setShowCreateMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target) &&
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowMoreMenu(false);
        setShowCreateMenu(false);
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const createMenuRef = useRef(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close sidebar when clicking on mobile overlay
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        ${isMobile ? "fixed" : "relative"} 
        ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full z-50 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static
      `}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        )}

        <img src={logo} alt="EspoCRM Logo" className="w-30 mx-auto mt-4" />

        <nav className="space-y-6 mt-6 flex-1 overflow-y-auto">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
              CRM
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded 
     ${
       isActive
         ? "bg-blue-100 text-blue-600 font-semibold"
         : "text-gray-700 hover:text-blue-600"
     }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaHome /> Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/accounts"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded 
     ${
       isActive
         ? "bg-blue-100 text-blue-600 font-semibold"
         : "text-gray-700 hover:text-blue-600"
     }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaUserTie /> Accounts
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaAddressBook /> Contacts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/leads"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaUserPlus /> Leads
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/opportunity"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaDollarSign /> Opportunities
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Activities
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/email"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaEnvelope /> Emails
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/meetings"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaCalendarAlt /> Meetings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calls"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaPhone /> Calls
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/task"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaTasks /> Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaCalendar /> Calendar
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/cases"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaSuitcase /> Cases
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/knowledgebase"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <FaBook /> Knowledge Base
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="text-gray-400 hover:text-blue-600 cursor-pointer flex items-center gap-2 mt-4">
          {/* 3-dot More Menu */}
          <div className="relative mt-6" ref={moreMenuRef}>
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="text-gray-400 hover:text-blue-600 flex items-center gap-2"
            >
              <span className="text-2xl">⋯</span> More
            </button>

            {showMoreMenu && (
              <div className="absolute bottom-10 left-0 w-72 bg-white border rounded-lg shadow-lg p-4 z-50 max-h-96 overflow-y-auto">
                <div className="mb-3">
                  <h4 className="text-xs uppercase text-gray-500 font-bold mb-1">
                    Marketing
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/campaigns"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Campaigns
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/targetlist"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Target Lists
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h4 className="text-xs uppercase text-gray-500 font-bold mb-1">
                    Business
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/documents"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Documents
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h4 className="text-xs uppercase text-gray-500 font-bold mb-1">
                    Organization
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/users"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Users
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/teams"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Teams
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/workingtimecalendars"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Working Time Calendars
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/email-templates"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Email Templates
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/templates"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Templates
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/import"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded ${
                            isActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "hover:text-blue-600 cursor-pointer"
                          }`
                        }
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (isMobile) closeSidebar();
                        }}
                      >
                        Import
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2 flex-1 lg:w-1/2 lg:flex-initial relative">
            {/* Mobile hamburger menu */}
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700 mr-2 lg:hidden"
              >
                <FaBars size={20} />
              </button>
            )}

            <FaSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 min-w-0 px-2 py-1 border border-gray-300 rounded-md text-sm"
            />

            {/* 3-dot dropdown beside Search */}
            <div className="relative ml-2" ref={filterMenuRef}>
              <button onClick={() => setShowFilterMenu(!showFilterMenu)}>
                <span className="text-xl text-gray-600 hover:text-blue-600">
                  ⋮
                </span>
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 top-8 w-56 bg-white border rounded shadow-md z-50">
                  <div className="text-sm font-semibold px-4 py-2 text-gray-600 border-b">
                    Add Field
                  </div>
                  <ul className="text-sm text-gray-700 max-h-64 overflow-y-auto">
                    {[
                      "Assigned User",
                      "Teams",
                      "Created At",
                      "Created By",
                      "Modified At",
                      "Stream Updated At",
                      "Type",
                      "Industry",
                      "Description",
                      "Email",
                      "Phone",
                      "Target Lists",
                      "Country",
                      "Billing Address",
                      "Shipping Address",
                      "Website",
                      "Campaign",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          // Optional: apply filter
                          setShowFilterMenu(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-gray-500 text-lg">
            <div className="relative" ref={createMenuRef}>
              <FaPlus
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setShowCreateMenu(!showCreateMenu)}
              />

              {showCreateMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                  <div className="py-2 text-sm text-gray-700">
                    <div className="px-4 py-1 text-gray-500">Create</div>
                    <ul>
                      {[
                        { label: "Account", path: "/accounts" },
                        { label: "Contact", path: "/contact" },
                        { label: "Lead", path: "/leads" },
                        { label: "Opportunity", path: "/opportunity" },
                        { label: "Meeting", path: "/meetings" },
                        { label: "Call", path: "/calls" },
                        { label: "Task", path: "/task" },
                        { label: "Case", path: "/cases" },
                        { label: "Email", path: "/email" },
                      ].map(({ label, path }, idx) => (
                        <li key={idx}>
                          <Link
                            to={path}
                            onClick={() => setShowCreateMenu(false)}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <FaBell className="cursor-pointer hover:text-blue-600" />
            <div className="relative" ref={userMenuRef}>
              <img
                src="https://ui-avatars.com/api/?name=AD&background=0D8ABC&color=fff"
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer flex-shrink-0"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow z-50 text-sm text-gray-700">
                  <div className="px-4 py-2 border-b">
                    <span className="text-xs uppercase text-gray-400">AD</span>
                    <div className="text-sm font-medium">Admin</div>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Administration
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/preferences"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Preferences
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/last-viewed"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Last Viewed
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          const confirmed = window.confirm(
                            "Are you sure you want to log out?"
                          );
                          if (confirmed) {
                            // Clear token or any logout logic
                            window.location.href = "/login";
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Nested Routes */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
