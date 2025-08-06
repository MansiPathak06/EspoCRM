import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
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




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<AccountsPage/>} /> 
        <Route path="/contact" element={<Contacts/>} /> 
        <Route path="/leads" element={<Leads/>} /> 
        <Route path="/opportunity" element={<Opportunity/>} /> 
        <Route path="/email" element={<Email/>} /> 
        <Route path="/meetings" element={<Meeting/>} /> 
        <Route path="/calls" element={<Call/>} /> 
        <Route path="/task" element={<Task/>} /> 
        <Route path="/calendar" element={<Calendar/>} /> 
        <Route path="/cases" element={<Cases/>} /> 
        <Route path="/knowledgebase" element={<KnowledgeBase/>} /> 
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
