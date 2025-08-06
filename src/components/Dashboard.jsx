import React from "react";
import logo from "../assets/logo.avif";
import { Link } from "react-router-dom";

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
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        {/* Top Logo and Menu */}
        <div className="flex-1">
          <img src={logo} alt="EspoCRM Logo" className="w-30 mx-auto mt-15" />

          {/* Sidebar Menu */}
          <nav className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                CRM
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                  <FaHome /> Home
                </li>
                <li>
                  <Link
                    to="/accounts"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    <FaUserTie /> Accounts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    {" "}
                    <FaAddressBook /> Contacts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leads"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    {" "}
                    <FaUserPlus /> Leads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/opportunity"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    {" "}
                    <FaDollarSign /> Opportunities
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Activities
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/email"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    <FaEnvelope /> Emails
                  </Link>
                </li>
                <li>
                  <Link
                    to="/meetings"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    <FaCalendarAlt /> Meetings
                  </Link>
                </li>

                <li >
                  <Link to="/calls"className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer" > <FaPhone /> Calls
                  </Link>
                 
                </li>
                <li>
                  <Link to="/task"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">     <FaTasks /> Tasks
                  </Link> 
             
                </li>
                <li>
                  <Link to="/calendar"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer">     <FaCalendar /> Calendar
                  </Link> 
             
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Support
              </h3>
              <ul className="space-y-2">
                
                <li >
                  <Link to="/cases" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"><FaSuitcase /> Cases
                  </Link>
                  
                </li>
                <li>
                  <Link to="/knowledgebase"  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"><FaBook /> Knowledge Base
                  </Link>
                  
                  
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Collapse */}
        <div className="text-gray-400 hover:text-blue-600 cursor-pointer flex items-center gap-2 mt-4">
          <FaChevronLeft /> Collapse
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2 w-1/3">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-lg">
            <FaPlus className="cursor-pointer hover:text-blue-600" />
            <FaBell className="cursor-pointer hover:text-blue-600" />
            <img
              src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 flex p-6 gap-6 bg-gray-100">
          {/* Stream */}
          <section className="flex-1 bg-white p-4 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-2">Stream</h2>
            <p className="text-gray-500 text-sm">No Data</p>
          </section>

          {/* My Activities */}
          <section className="w-1/3 bg-white p-4 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-2">My Activities</h2>
            <p className="text-gray-500 text-sm">No Data</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
