import React, { useState } from 'react';
import { ChevronRight, Info, Search, Plus, X } from 'lucide-react';

const Role = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [roleName, setRoleName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Permission states
  const [permissions, setPermissions] = useState({
    export: 'not-set',
    mention: 'not-set',
    assignment: 'not-set',
    portal: 'not-set',
    groupEmail: 'not-set',
    userCalendar: 'not-set',
    massUpdate: 'not-set',
    followerManagement: 'not-set',
    message: 'not-set',
    audit: 'not-set',
    user: 'not-set',
    dataPrivacy: 'not-set'
  });

  // Scope level permissions
  const [scopePermissions, setScopePermissions] = useState({
    Currency: 'not-set',
    EmailTemplateCategories: 'not-set',
    EmailTemplates: 'not-set',
    Emails: 'not-set',
    ExternalAccounts: 'not-set',
    GlobalStream: 'not-set',
    Import: 'not-set',
    PersonalEmailAccounts: 'not-set',
    Teams: 'not-set',
    Templates: 'not-set',
    Users: 'not-set',
    Webhooks: 'not-set',
    WorkingTimeCalendars: 'not-set',
    Accounts: 'not-set',
    Activities: 'not-set',
    Calendar: 'not-set',
    Calls: 'not-set',
    Campaigns: 'not-set',
    Cases: 'not-set',
    Contacts: 'not-set',
    DocumentFolders: 'not-set',
    Documents: 'not-set',
    KnowledgeBase: 'not-set',
    KnowledgeBaseCategories: 'not-set',
    Leads: 'not-set',
    Meetings: 'not-set',
    Opportunities: 'not-set',
    TargetListCategories: 'not-set',
    TargetLists: 'not-set',
    Tasks: 'not-set'
  });

  // Field level permissions
  const [fieldLevelPermissions, setFieldLevelPermissions] = useState({
    Emails: { expanded: false, fields: {} },
    Teams: { expanded: false, fields: {} },
    Users: { expanded: false, fields: {} },
    Accounts: { expanded: false, fields: {} },
    Calls: { expanded: false, fields: {} },
    Campaigns: { expanded: false, fields: {} },
    Cases: { expanded: false, fields: {} },
    Contacts: { expanded: false, fields: {} },
    "Document Folders": { expanded: false, fields: {} },
    "Knowledge Base": { expanded: false, fields: {} },
    "Knowledge Base Categories": { expanded: false, fields: {} },
    Leads: { expanded: false, fields: {} },
    Meetings: { expanded: false, fields: {} },
    Opportunities: { expanded: false, fields: {} },
    "Target List Categories": { expanded: false, fields: {} },
    "Target Lists": { expanded: false, fields: {} },
    "Tasks": { expanded: false, fields: {} }
   
  });

  const permissionOptions = ['not-set', 'enabled', 'disabled'];
  const scopePermissionOptions = ['not-set', 'enabled', 'disabled'];

  const handlePermissionChange = (key, value) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
  };

  const handleScopePermissionChange = (key, value) => {
    setScopePermissions(prev => ({ ...prev, [key]: value }));
  };

  const toggleFieldLevelExpansion = (entityName) => {
    setFieldLevelPermissions(prev => ({
      ...prev,
      [entityName]: {
        ...prev[entityName],
        expanded: !prev[entityName].expanded
      }
    }));
  };

  const renderPermissionDropdown = (value, onChange, id) => (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      id={id}
    >
      {permissionOptions.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  const renderScopePermissionRow = (label, key) => (
    <tr key={key} className="border-b border-gray-100">
      <td className="py-3 px-4 text-sm font-medium text-gray-700">{label}</td>
      <td className="py-3 px-4">
        <select 
          value={scopePermissions[key]} 
          onChange={(e) => handleScopePermissionChange(key, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {scopePermissionOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
      <td className="py-3 px-4 w-16"></td>
      <td className="py-3 px-4 w-16"></td>
      <td className="py-3 px-4 w-16"></td>
      <td className="py-3 px-4 w-16"></td>
      <td className="py-3 px-4 w-16"></td>
    </tr>
  );

  const renderFieldLevelRow = (entityName) => {
    const entity = fieldLevelPermissions[entityName];
    const hasPlus = ['Emails', 'Teams', 'Users', 'Accounts', 'Calls', 'Campaigns', 'Cases', 'Contacts','Document Folders', 'Documents', 'Knowledge Base', 'Knowledge Base Categories', 'Leads','Meetings','Opportunities', 'Target List Categories', 'Target Lists','Tasks' ].includes(entityName);
    
    if (!hasPlus) return null;

    return (
      <tr key={`field-${entityName}`} className="border-b border-gray-100">
        <td className="py-3 px-4 text-sm font-medium text-gray-700">{entityName}</td>
        <td className="py-3 px-4">
          <button
            onClick={() => toggleFieldLevelExpansion(entityName)}
            className="text-blue-500 hover:text-blue-700 font-medium text-lg"
          >
            +
          </button>
        </td>
        <td className="py-3 px-4 w-16"></td>
        <td className="py-3 px-4 w-16 text-center text-sm font-medium text-gray-700">Read</td>
        <td className="py-3 px-4 w-16 text-center text-sm font-medium text-gray-700">Edit</td>
        <td className="py-3 px-4 w-16"></td>
        <td className="py-3 px-4 w-16"></td>
      </tr>
    );
  };

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-blue-600">Administration</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">Roles</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setCurrentView('create')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Role</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-8 text-center">
              <div className="text-gray-500 text-lg">No Data</div>
              <div className="text-gray-400 text-sm mt-2">0 / 0</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => setCurrentView('list')}
                className="text-blue-600 hover:underline"
              >
                Roles
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">create</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Save
          </button>
          <button 
            onClick={() => setCurrentView('list')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Permissions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Export Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Export Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.export, (value) => handlePermissionChange('export', value), 'export')}
              </div>

              {/* Mention Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Mention Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.mention, (value) => handlePermissionChange('mention', value), 'mention')}
              </div>

              {/* Assignment Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Assignment Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.assignment, (value) => handlePermissionChange('assignment', value), 'assignment')}
              </div>

              {/* Portal Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Portal Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.portal, (value) => handlePermissionChange('portal', value), 'portal')}
              </div>

              {/* Group Email Account Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Group Email Account Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.groupEmail, (value) => handlePermissionChange('groupEmail', value), 'groupEmail')}
              </div>

              {/* User Calendar Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  User Calendar Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.userCalendar, (value) => handlePermissionChange('userCalendar', value), 'userCalendar')}
              </div>

              {/* Mass Update Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Mass Update Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.massUpdate, (value) => handlePermissionChange('massUpdate', value), 'massUpdate')}
              </div>

              {/* Follower Management Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Follower Management Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.followerManagement, (value) => handlePermissionChange('followerManagement', value), 'followerManagement')}
              </div>

              {/* Message Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Message Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.message, (value) => handlePermissionChange('message', value), 'message')}
              </div>

              {/* Audit Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Audit Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.audit, (value) => handlePermissionChange('audit', value), 'audit')}
              </div>

              {/* User Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  User Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.user, (value) => handlePermissionChange('user', value), 'user')}
              </div>

              {/* Data Privacy Permission */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Data Privacy Permission
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </label>
                {renderPermissionDropdown(permissions.dataPrivacy, (value) => handlePermissionChange('dataPrivacy', value), 'dataPrivacy')}
              </div>
            </div>

            {/* Search for Scope Level */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Scope Level Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Scope Level</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Access</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Create</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Read</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Edit</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Delete</th>
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Stream</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {renderScopePermissionRow('Currency', 'Currency')}
                  {renderScopePermissionRow('Email Template Categories', 'EmailTemplateCategories')}
                  {renderScopePermissionRow('Email Templates', 'EmailTemplates')}
                  {renderScopePermissionRow('Emails', 'Emails')}
                  {renderScopePermissionRow('External Accounts', 'ExternalAccounts')}
                  {renderScopePermissionRow('Global Stream', 'GlobalStream')}
                  {renderScopePermissionRow('Import', 'Import')}
                  {renderScopePermissionRow('Personal Email Accounts', 'PersonalEmailAccounts')}
                  {renderScopePermissionRow('Teams', 'Teams')}
                  {renderScopePermissionRow('Templates', 'Templates')}
                  {renderScopePermissionRow('Users', 'Users')}
                  {renderScopePermissionRow('Webhooks', 'Webhooks')}
                  {renderScopePermissionRow('Working Time Calendars', 'WorkingTimeCalendars')}
                  {renderScopePermissionRow('Accounts', 'Accounts')}
                  {renderScopePermissionRow('Activities', 'Activities')}
                  {renderScopePermissionRow('Calendar', 'Calendar')}
                  {renderScopePermissionRow('Calls', 'Calls')}
                  {renderScopePermissionRow('Campaigns', 'Campaigns')}
                  {renderScopePermissionRow('Cases', 'Cases')}
                  {renderScopePermissionRow('Contacts', 'Contacts')}
                  {renderScopePermissionRow('Document Folders', 'DocumentFolders')}
                  {renderScopePermissionRow('Documents', 'Documents')}
                  {renderScopePermissionRow('Knowledge Base', 'KnowledgeBase')}
                  {renderScopePermissionRow('Knowledge Base Categories', 'KnowledgeBaseCategories')}
                  {renderScopePermissionRow('Leads', 'Leads')}
                  {renderScopePermissionRow('Meetings', 'Meetings')}
                  {renderScopePermissionRow('Opportunities', 'Opportunities')}
                  {renderScopePermissionRow('Target List Categories', 'TargetListCategories')}
                  {renderScopePermissionRow('Target Lists', 'TargetLists')}
                  {renderScopePermissionRow('Tasks', 'Tasks')}
                </tbody>
              </table>
            </div>

            {/* Field Level Section */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Field Level</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Field Level</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Access</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Create</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Read</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Edit</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Delete</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Stream</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {renderFieldLevelRow('Emails')}
                    {renderFieldLevelRow('Teams')}
                    {renderFieldLevelRow('Users')}
                    {renderFieldLevelRow('Accounts')}
                    {renderFieldLevelRow('Calls')}
                    {renderFieldLevelRow('Campaigns')}
                    {renderFieldLevelRow('Cases')}
                    {renderFieldLevelRow('Contacts')}
                    {renderFieldLevelRow('Document Folders')}
                    {renderFieldLevelRow('Documents')}
                    {renderFieldLevelRow('Knowledge Base')}
                    {renderFieldLevelRow('Knowledge Base Categories')}
                    {renderFieldLevelRow('Leads')}
                    {renderFieldLevelRow('Meetings')}
                    {renderFieldLevelRow('Opportunities')}
                    {renderFieldLevelRow('Target List Categories')}
                    {renderFieldLevelRow('Target Lists')}
                    {renderFieldLevelRow('Tasks')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;