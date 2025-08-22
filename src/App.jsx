import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthSystem from "./components/AuthSystem"; // New integrated auth component
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
import EntityManager from "./Admin/EntityManager";
import LayoutManager from "./Admin/LayoutManager";
import AccountEntityManager from "./Admin/Account/AccountEntityManager";
import LabelManager from "./Admin/LabelManager";
import TemplateManager from "./Admin/TemplateManager";
import Portal from "./Admin/Portal/Portal";
import PortalUsers from "./Admin/Portal/PortalUsers";
import PortalRoles from "./Admin/Portal/PortalRoles";
import Role from "./Admin/Users/Role";
import AuthLog from "./Admin/Users/AuthLog";
import AuthTokens from "./Admin/Users/AuthTokens";
import ActionHistory from "./Admin/Users/ActionHistory";
import APIUsers from "./Admin/Users/APIUsers";
import OutboundEmails from "./Admin/Messaging/OutboundEmails";
import InboundEmails from "./Admin/Messaging/InboundEmails";
import GroupEmailAccounts from "./Admin/Messaging/GroupEmailAccounts";
import PersonalEmailAccounts from "./Admin/Messaging/PersonalEmailAccounts";
import EmailFilters from "./Admin/Messaging/EmailFilters";
import GroupEmailFolders from "./Admin/Messaging/GroupEmailFolders";
import SMS from "./Admin/Messaging/SMS";
import Settings from "./Admin/System/Settings";
import UserInterface from "./Admin/System/UserInterface";
import Authentication from "./Admin/System/Authentication";
import Currency from "./Admin/System/Currency";
import Notifications from "./Admin/System/Notifications";
import LayoutSet from "./Admin/Setup/LayoutSet";
import DashboardTemplate from "./Admin/Setup/DashboardTemplate";
import LeadCapture from "./Admin/Setup/LeadCapture";
import Template from "./Admin/Setup/Template";
import Webhook from "./Admin/Setup/Webhook";
import AddressCountry from "./Admin/Setup/AddressCountry";
import AuthenticationProvider from "./Admin/Setup/AuthenticationProvider";
import Attachments from "./Admin/Data/Attachments";
import JobSettings from "./Admin/System/JobSettings";
import OAuthProviders from "./Admin/Data/OAuthProviders";
import AppSecrets from "./Admin/Data/AppSecrets";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes - using AuthSystem component */}
        <Route path="/login" element={<AuthSystem />} />
        <Route path="/register" element={<AuthSystem />} />

        <Route path="/reset-password" element={<AuthSystem />} />

        {/* Root redirect to register (as requested) */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Layout with sidebar and topbar - protected routes */}
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
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="targetlist" element={<TargetList />} />
          <Route path="documents" element={<Documents />} />
          <Route path="users" element={<Users />} />
          <Route path="teams" element={<Teams />} />
          <Route
            path="workingtimecalendars"
            element={<WorkingTimeCalendars />}
          />
          <Route
            path="workingtimeexceptions"
            element={<WorkingTimeExceptions />}
          />
          <Route path="email-templates" element={<EmailTemplates />} />
          <Route path="templates" element={<Templates />} />
          <Route path="import" element={<Import />} />
          <Route path="DashletOptionsModal" element={<DashletOptionsModal />} />
          <Route path="Post" element={<Post />} />
          <Route path="admin" element={<Admin />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="last-viewed" element={<LastViewed />} />
          <Route path="about" element={<About />} />
          {/* ---------------Admin Routes----------- */}
          <Route
            path="/customization/entity-manager"
            element={<EntityManager />}
          />
          <Route
            path="/customization/layout-manager"
            element={<LayoutManager />}
          />
          <Route
            path="/customization/label-manager"
            element={<LabelManager />}
          />
          <Route
            path="/customization/template-manager"
            element={<TemplateManager />}
          />
          <Route
            path="/customization/template-manager"
            element={<TemplateManager />}
          />
          <Route
            path="/admin/account/AccountEntityManager"
            element={<AccountEntityManager />}
          />

          <Route path="/portal/portal" element={<Portal />} />
          <Route path="/portal/users" element={<PortalUsers />} />
          <Route path="/portal/roles" element={<PortalRoles />} />
          <Route path="/components/users" element={<Users />} />
          <Route path="/components/teams" element={<Teams />} />
          <Route path="/admin/users/role" element={<Role />} />
          <Route path="/admin/users/auth-log" element={<AuthLog />} />
          <Route path="/admin/users/auth-tokens" element={<AuthTokens />} />
          <Route
            path="/admin/users/action-history"
            element={<ActionHistory />}
          />
          <Route path="/admin/users/api-users" element={<APIUsers />} />
          <Route
            path="/messaging/outbound-emails"
            element={<OutboundEmails />}
          />
          <Route path="/messaging/inbound-emails" element={<InboundEmails />} />
          <Route
            path="/messaging/group-email-accounts"
            element={<GroupEmailAccounts />}
          />
          <Route
            path="/messaging/personal-email-accounts"
            element={<PersonalEmailAccounts />}
          />
          <Route path="/messaging/email-filters" element={<EmailFilters />} />
          <Route path="/messaging/email-filters" element={<EmailFilters />} />
          <Route
            path="/messaging/group-email-folders"
            element={<GroupEmailFolders />}
          />
          <Route
            path="/messaging/email-templates"
            element={<EmailTemplates />}
          />
          <Route path="/messaging/sms" element={<SMS />} />
          <Route path="/admin/system/settings" element={<Settings />} />
          <Route
            path="/admin/system/user-interface"
            element={<UserInterface />}
          />
          <Route
            path="/admin/system/authentication"
            element={<Authentication />}
          />
          <Route path="/admin/system/currency" element={<Currency />} />
          <Route
            path="/admin/system/notifications"
            element={<Notifications />}
          />
          <Route
            path="/setup/working-time-calendars"
            element={<WorkingTimeCalendars />}
          />
          <Route path="/setup/layout-sets" element={<LayoutSet />} />
          <Route
            path="/setup/dashboard-templates"
            element={<DashboardTemplate />}
          />
          <Route path="/setup/lead-capture" element={<LeadCapture />} />
          <Route path="/setup/pdf-templates" element={<Template />} />
          <Route path="/setup/webhooks" element={<Webhook />} />
          <Route path="/setup/address-countries" element={<AddressCountry />} />
          <Route
            path="/setup/authentication-providers"
            element={<AuthenticationProvider />}
          />
          <Route path="/data/import" element={<Import />} />
          <Route path="/data/attachments" element={<Attachments />} />
          <Route path="/admin/system/job-settings" element={<JobSettings />} />
          <Route path="/data/oauth-providers" element={<OAuthProviders />} />
          <Route path="/data/app-secrets" element={<AppSecrets />} />
        </Route>

        {/* Redirect unknown routes to register */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
