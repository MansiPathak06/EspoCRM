import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout"; // formerly Dashboard.jsx
import DashboardHome from "./components/DashboardHome"; // new dashboard content

import AccountsPage from "./components/Accountspage";
import Contacts from "./components/Contacts";
import Leads from "./components/Leads";
import Opportunity from "./components/Opportunity";
import Email from "./components/Email";
import Meeting from "./components/Meetings";
import Call from "./components/Call";
import Task from "./components/Task";
import Calendar from "./components/Calendar";
import Cases from "./components/Cases";
import KnowledgeBase from "./components/KnowledgeBase";
import Campaigns from "./components/Campaigns";
import TargetList from "./components/TargetList";
import Documents from "./components/Documents";
import Users from "./components/Users";
import Teams from "./components/Teams";
import WorkingTimeCalendars from "./components/WorkingTimeCalendars";
import WorkingTimeExceptions from "./components/WorkingTimeExceptions";
import EmailTemplates from "./components/EmailTemplates";
import Templates from "./components/Templates";
import Import from "./components/Import";
import DashletOptionsModal from "./pages/DashletOptionsModal";
import Post from "./pages/Post";
import Admin from "./Admin/Admin";
import Preferences from "./Admin/Preferences";
import LastViewed from "./Admin/LastViewed";
import About from "./Admin/About";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login route - no layout */}
        <Route path="/login" element={<Login />} />

        {/* Layout with sidebar and topbar */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="leads" element={<Leads />} />
          <Route path="opportunity" element={<Opportunity />} />
          <Route path="email" element={<Email />} />
          <Route path="meetings" element={<Meeting />} />
          <Route path="calls" element={<Call />} />
          <Route path="task" element={<Task />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="cases" element={<Cases />} />
          <Route path="knowledgebase" element={<KnowledgeBase />} />
          <Route path="campaigns" element={<Campaigns/>} />
          <Route path="targetlist" element={<TargetList/>} />
          <Route path="documents" element={<Documents/>} />
          <Route path="users" element={<Users/>} />
          <Route path="teams" element={<Teams/>} />
          <Route path="workingtimecalendars" element={<WorkingTimeCalendars/>} />
          <Route path="workingtimeexceptions" element={<WorkingTimeExceptions/>} />
          <Route path="email-templates" element={<EmailTemplates/>} />
          <Route path="templates" element={<Templates/>} />
          <Route path="import" element={<Import/>} />
          <Route path="DashletOptionsModal" element={<DashletOptionsModal/>} />
          <Route path="Post" element={<Post/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="preferences" element={<Preferences/>} />
          <Route path="last-viewed" element={<LastViewed/>} />
          <Route path="about" element={<About/>} />

        </Route>

        {/* Redirect root to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
