import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Users, User, Phone, DollarSign, Calendar, Mail, MessageSquare, FileText, Folder, HelpCircle, Target, CheckSquare, Settings } from 'lucide-react';

const EntityManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const entities = [
    { label: "Account", name: "Account", type: "", module: "", icon: Users },
    { label: "Call", name: "Call", type: "", module: "", icon: Phone },
    { label: "Campaign", name: "Campaign", type: "", module: "", icon: Target },
    { label: "Case", name: "Case", type: "", module: "", icon: HelpCircle },
    { label: "Contact", name: "Contact", type: "", module: "", icon: User },
    { label: "Document", name: "Document", type: "", module: "", icon: FileText },
    { label: "Document Folder", name: "DocumentFolder", type: "Category Tree", module: "", icon: Folder },
    { label: "Email", name: "Email", type: "", module: "", icon: Mail },
    { label: "Knowledge Base Article", name: "KnowledgeBaseArticle", type: "", module: "", icon: FileText },
    { label: "Knowledge Base Category", name: "KnowledgeBaseCategory", type: "Category Tree", module: "", icon: Folder },
    { label: "Lead", name: "Lead", type: "", module: "", icon: User },
    { label: "Meeting", name: "Meeting", type: "", module: "", icon: Calendar },
    { label: "Note", name: "Note", type: "", module: "", icon: MessageSquare },
    { label: "Opportunity", name: "Opportunity", type: "", module: "", icon: DollarSign },
    { label: "Target List", name: "TargetList", type: "", module: "", icon: Target },
    { label: "Task", name: "Task", type: "", module: "", icon: CheckSquare },
    { label: "User", name: "User", type: "", module: "", icon: User },
    { label: "Action History Record", name: "ActionHistoryRecord", type: "", module: "", icon: FileText },
    { label: "Address Country", name: "AddressCountry", type: "", module: "", icon: Settings },
    { label: "App Log Record", name: "AppLogRecord", type: "", module: "", icon: FileText },
    { label: "App Secret", name: "AppSecret", type: "", module: "", icon: Settings },
    { label: "Array Value", name: "ArrayValue", type: "", module: "", icon: Settings },
    { label: "Attachment", name: "Attachment", type: "", module: "", icon: FileText },
    { label: "Authentication Provider", name: "AuthenticationProvider", type: "", module: "", icon: Settings },
    { label: "Auth Log Record", name: "AuthLogRecord", type: "", module: "", icon: FileText },
    { label: "Auth Token", name: "AuthToken", type: "", module: "", icon: Settings },
    { label: "Autofollow", name: "Autofollow", type: "", module: "", icon: Settings },
    { label: "Campaign Log Record", name: "CampaignLogRecord", type: "", module: "", icon: FileText },
    { label: "Tracking URL", name: "CampaignTrackingUrl", type: "", module: "", icon: Settings },
    { label: "Currency", name: "Currency", type: "", module: "", icon: DollarSign },
    { label: "Dashboard Template", name: "DashboardTemplate", type: "", module: "", icon: Settings },
    { label: "Personal Email Account", name: "EmailAccount", type: "", module: "", icon: Mail },
    { label: "Email Address", name: "EmailAddress", type: "", module: "", icon: Mail },
    { label: "Email Filter", name: "EmailFilter", type: "", module: "", icon: Settings },
    { label: "Email Folder", name: "EmailFolder", type: "", module: "", icon: Folder },
    { label: "Email Queue Item", name: "EmailQueueItem", type: "", module: "", icon: Mail },
    { label: "Email Template", name: "EmailTemplate", type: "", module: "", icon: Mail },
    { label: "Email Template Categories", name: "EmailTemplateCategory", type: "Category Tree", module: "", icon: Folder },
    { label: "Extension", name: "Extension", type: "", module: "", icon: Settings },
    { label: "External Account", name: "ExternalAccount", type: "", module: "", icon: Settings },
    { label: "Group Email Folder", name: "GroupEmailFolder", type: "", module: "", icon: Folder },
    { label: "Import", name: "Import", type: "", module: "", icon: Settings },
    { label: "Import Error", name: "ImportError", type: "", module: "", icon: Settings },
    { label: "Group Email Account", name: "InboundEmail", type: "", module: "", icon: Mail },
    { label: "Integration", name: "Integration", type: "", module: "", icon: Settings },
    { label: "Job", name: "Job", type: "", module: "", icon: Settings },
    { label: "Layout Record", name: "LayoutRecord", type: "", module: "", icon: Settings },
    { label: "Layout Set", name: "LayoutSet", type: "", module: "", icon: Settings },
    { label: "Lead Capture Entry Point", name: "LeadCapture", type: "", module: "", icon: Settings },
    { label: "Lead Capture Log Record", name: "LeadCaptureLogRecord", type: "", module: "", icon: FileText },
    { label: "Mass Email", name: "MassEmail", type: "", module: "", icon: Mail },
    { label: "Notification", name: "Notification", type: "", module: "", icon: MessageSquare },
    { label: "OAuth Account", name: "OAuthAccount", type: "", module: "", icon: Settings },
    { label: "OAuth Provider", name: "OAuthProvider", type: "", module: "", icon: Settings },
    { label: "Password Change Request", name: "PasswordChangeRequest", type: "", module: "", icon: Settings },
    { label: "Phone Number", name: "PhoneNumber", type: "", module: "", icon: Phone },
    { label: "Portal", name: "Portal", type: "", module: "", icon: Settings },
    { label: "Portal Role", name: "PortalRole", type: "", module: "", icon: Settings },
    { label: "Preferences", name: "Preferences", type: "", module: "", icon: Settings },
    { label: "Reminder", name: "Reminder", type: "", module: "", icon: MessageSquare },
    { label: "Role", name: "Role", type: "", module: "", icon: Settings },
    { label: "Scheduled Job", name: "ScheduledJob", type: "", module: "", icon: Settings },
    { label: "Scheduled Job Log Record", name: "ScheduledJobLogRecord", type: "", module: "", icon: FileText },
    { label: "Stream Subscription", name: "StreamSubscription", type: "", module: "", icon: Settings },
    { label: "Target List Category", name: "TargetListCategory", type: "Category Tree", module: "", icon: Folder },
    { label: "Team", name: "Team", type: "", module: "", icon: Users },
    { label: "Template", name: "Template", type: "", module: "", icon: FileText },
    { label: "Unique ID", name: "UniqueId", type: "", module: "", icon: Settings },
    { label: "User Data", name: "UserData", type: "", module: "", icon: Settings },
    { label: "User Reaction", name: "UserReaction", type: "", module: "", icon: MessageSquare },
    { label: "Webhook", name: "Webhook", type: "", module: "", icon: Settings },
    { label: "Webhook Event Queue Item", name: "WebhookEventQueueItem", type: "", module: "", icon: Settings },
    { label: "Webhook Queue Item", name: "WebhookQueueItem", type: "", module: "", icon: Settings },
    { label: "Working Time Calendar", name: "WorkingTimeCalendar", type: "", module: "", icon: Calendar },
    { label: "Working Time Exception", name: "WorkingTimeRange", type: "", module: "", icon: Calendar }
  ];

  const filteredEntities = entities.filter(entity =>
    entity.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEntityClick = (entityName) => {
    console.log(`Clicked on ${entityName}`);
    // Route navigation will be added later
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <nav className="text-sm text-gray-500">
              <span className="text-blue-600 cursor-pointer hover:underline">Administration</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Entity Manager</span>
            </nav>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Entity Manager</h1>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Entity
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Label
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Type
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      Module
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntities.map((entity, index) => {
                    const IconComponent = entity.icon;
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        onClick={() => handleEntityClick(entity.name)}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-4 h-4 text-gray-500" />
                            <span className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                              {entity.label}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-mono text-sm">{entity.name}</td>
                        <td className="py-4 px-4 text-gray-600">
                          {entity.type && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {entity.type}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-600">{entity.module}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredEntities.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No entities found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityManager;