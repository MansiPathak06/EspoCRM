import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Users, User, Phone, DollarSign, Calendar, Mail, MessageSquare, FileText, Folder, HelpCircle, Target, CheckSquare, Settings, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Uncomment when React Router is setup

const EntityManager = () => {
  const navigate = useNavigate(); // Uncomment when React Router is setup
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    labelSingular: '',
    labelPlural: '',
    type: 'Base',
    icon: 'None',
    color: '#6b7280',
    stream: false
  });
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Function to handle entity click and routing
  const handleEntityClick = (entityName, entityLabel, entityIcon) => {
    setSelectedEntity({ 
      name: entityName, 
      label: entityLabel, 
      icon: entityIcon 
    });
    
    // Route to specific entity manager
    const routePath = `/admin/${entityName.toLowerCase()}/${entityName}EntityManager`;
    console.log('Navigating to:', routePath);
    
    // Option 1: Using window.location (will cause page reload)
    // window.location.href = routePath;
    
    // Option 2: Using React Router (recommended - uncomment when Router is setup)
    navigate(routePath);
    
    // Option 3: For testing without actual routes
    alert(`Ready to navigate to: ${routePath}\n\nTo enable actual navigation:\n1. Setup React Router\n2. Create ${entityName}EntityManager.jsx\n3. Add route in App.js`);
  };

  const [entities, setEntities] = useState([
    { 
      label: "Account", 
      name: "Account", 
      type: "", 
      module: "", 
      icon: Users,
      routePath: "/admin/account/AccountEntityManager"
    },
    { 
      label: "Call", 
      name: "Call", 
      type: "", 
      module: "", 
      icon: Phone,
      routePath: "/admin/call/CallEntityManager"
    },
    { 
      label: "Campaign", 
      name: "Campaign", 
      type: "", 
      module: "", 
      icon: Target,
      routePath: "/admin/campaign/CampaignEntityManager"
    },
    { 
      label: "Case", 
      name: "Case", 
      type: "", 
      module: "", 
      icon: HelpCircle,
      routePath: "/admin/case/CaseEntityManager"
    },
    { 
      label: "Contact", 
      name: "Contact", 
      type: "", 
      module: "", 
      icon: User,
      routePath: "/admin/contact/ContactEntityManager"
    },
    { 
      label: "Document", 
      name: "Document", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/document/DocumentEntityManager"
    },
    { 
      label: "Document Folder", 
      name: "DocumentFolder", 
      type: "Category Tree", 
      module: "", 
      icon: Folder,
      routePath: "/admin/documentfolder/DocumentFolderEntityManager"
    },
    { 
      label: "Email", 
      name: "Email", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/email/EmailEntityManager"
    },
    { 
      label: "Knowledge Base Article", 
      name: "KnowledgeBaseArticle", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/knowledgebasearticle/KnowledgeBaseArticleEntityManager"
    },
    { 
      label: "Knowledge Base Category", 
      name: "KnowledgeBaseCategory", 
      type: "Category Tree", 
      module: "", 
      icon: Folder,
      routePath: "/admin/knowledgebasecategory/KnowledgeBaseCategoryEntityManager"
    },
    { 
      label: "Lead", 
      name: "Lead", 
      type: "", 
      module: "", 
      icon: User,
      routePath: "/admin/lead/LeadEntityManager"
    },
    { 
      label: "Meeting", 
      name: "Meeting", 
      type: "", 
      module: "", 
      icon: Calendar,
      routePath: "/admin/meeting/MeetingEntityManager"
    },
    { 
      label: "Note", 
      name: "Note", 
      type: "", 
      module: "", 
      icon: MessageSquare,
      routePath: "/admin/note/NoteEntityManager"
    },
    { 
      label: "Opportunity", 
      name: "Opportunity", 
      type: "", 
      module: "", 
      icon: DollarSign,
      routePath: "/admin/opportunity/OpportunityEntityManager"
    },
    { 
      label: "Target List", 
      name: "TargetList", 
      type: "", 
      module: "", 
      icon: Target,
      routePath: "/admin/targetlist/TargetListEntityManager"
    },
    { 
      label: "Task", 
      name: "Task", 
      type: "", 
      module: "", 
      icon: CheckSquare,
      routePath: "/admin/task/TaskEntityManager"
    },
    { 
      label: "User", 
      name: "User", 
      type: "", 
      module: "", 
      icon: User,
      routePath: "/admin/user/UserEntityManager"
    },
    { 
      label: "Action History Record", 
      name: "ActionHistoryRecord", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/actionhistoryrecord/ActionHistoryRecordEntityManager"
    },
    { 
      label: "Address Country", 
      name: "AddressCountry", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/addresscountry/AddressCountryEntityManager"
    },
    { 
      label: "App Log Record", 
      name: "AppLogRecord", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/applogrecord/AppLogRecordEntityManager"
    },
    { 
      label: "App Secret", 
      name: "AppSecret", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/appsecret/AppSecretEntityManager"
    },
    { 
      label: "Array Value", 
      name: "ArrayValue", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/arrayvalue/ArrayValueEntityManager"
    },
    { 
      label: "Attachment", 
      name: "Attachment", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/attachment/AttachmentEntityManager"
    },
    { 
      label: "Authentication Provider", 
      name: "AuthenticationProvider", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/authenticationprovider/AuthenticationProviderEntityManager"
    },
    { 
      label: "Auth Log Record", 
      name: "AuthLogRecord", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/authlogrecord/AuthLogRecordEntityManager"
    },
    { 
      label: "Auth Token", 
      name: "AuthToken", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/authtoken/AuthTokenEntityManager"
    },
    { 
      label: "Autofollow", 
      name: "Autofollow", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/autofollow/AutofollowEntityManager"
    },
    { 
      label: "Campaign Log Record", 
      name: "CampaignLogRecord", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/campaignlogrecord/CampaignLogRecordEntityManager"
    },
    { 
      label: "Tracking URL", 
      name: "CampaignTrackingUrl", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/campaigntrackingurl/CampaignTrackingUrlEntityManager"
    },
    { 
      label: "Currency", 
      name: "Currency", 
      type: "", 
      module: "", 
      icon: DollarSign,
      routePath: "/admin/currency/CurrencyEntityManager"
    },
    { 
      label: "Dashboard Template", 
      name: "DashboardTemplate", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/dashboardtemplate/DashboardTemplateEntityManager"
    },
    { 
      label: "Personal Email Account", 
      name: "EmailAccount", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/emailaccount/EmailAccountEntityManager"
    },
    { 
      label: "Email Address", 
      name: "EmailAddress", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/emailaddress/EmailAddressEntityManager"
    },
    { 
      label: "Email Filter", 
      name: "EmailFilter", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/emailfilter/EmailFilterEntityManager"
    },
    { 
      label: "Email Folder", 
      name: "EmailFolder", 
      type: "", 
      module: "", 
      icon: Folder,
      routePath: "/admin/emailfolder/EmailFolderEntityManager"
    },
    { 
      label: "Email Queue Item", 
      name: "EmailQueueItem", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/emailqueueitem/EmailQueueItemEntityManager"
    },
    { 
      label: "Email Template", 
      name: "EmailTemplate", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/emailtemplate/EmailTemplateEntityManager"
    },
    { 
      label: "Email Template Categories", 
      name: "EmailTemplateCategory", 
      type: "Category Tree", 
      module: "", 
      icon: Folder,
      routePath: "/admin/emailtemplatecategory/EmailTemplateCategoryEntityManager"
    },
    { 
      label: "Extension", 
      name: "Extension", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/extension/ExtensionEntityManager"
    },
    { 
      label: "External Account", 
      name: "ExternalAccount", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/externalaccount/ExternalAccountEntityManager"
    },
    { 
      label: "Group Email Folder", 
      name: "GroupEmailFolder", 
      type: "", 
      module: "", 
      icon: Folder,
      routePath: "/admin/groupemailfolder/GroupEmailFolderEntityManager"
    },
    { 
      label: "Import", 
      name: "Import", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/import/ImportEntityManager"
    },
    { 
      label: "Import Error", 
      name: "ImportError", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/importerror/ImportErrorEntityManager"
    },
    { 
      label: "Group Email Account", 
      name: "InboundEmail", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/inboundemail/InboundEmailEntityManager"
    },
    { 
      label: "Integration", 
      name: "Integration", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/integration/IntegrationEntityManager"
    },
    { 
      label: "Job", 
      name: "Job", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/job/JobEntityManager"
    },
    { 
      label: "Layout Record", 
      name: "LayoutRecord", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/layoutrecord/LayoutRecordEntityManager"
    },
    { 
      label: "Layout Set", 
      name: "LayoutSet", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/layoutset/LayoutSetEntityManager"
    },
    { 
      label: "Lead Capture Entry Point", 
      name: "LeadCapture", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/leadcapture/LeadCaptureEntityManager"
    },
    { 
      label: "Lead Capture Log Record", 
      name: "LeadCaptureLogRecord", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/leadcapturelogrecord/LeadCaptureLogRecordEntityManager"
    },
    { 
      label: "Mass Email", 
      name: "MassEmail", 
      type: "", 
      module: "", 
      icon: Mail,
      routePath: "/admin/massemail/MassEmailEntityManager"
    },
    { 
      label: "Notification", 
      name: "Notification", 
      type: "", 
      module: "", 
      icon: MessageSquare,
      routePath: "/admin/notification/NotificationEntityManager"
    },
    { 
      label: "OAuth Account", 
      name: "OAuthAccount", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/oauthaccount/OAuthAccountEntityManager"
    },
    { 
      label: "OAuth Provider", 
      name: "OAuthProvider", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/oauthprovider/OAuthProviderEntityManager"
    },
    { 
      label: "Password Change Request", 
      name: "PasswordChangeRequest", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/passwordchangerequest/PasswordChangeRequestEntityManager"
    },
    { 
      label: "Phone Number", 
      name: "PhoneNumber", 
      type: "", 
      module: "", 
      icon: Phone,
      routePath: "/admin/phonenumber/PhoneNumberEntityManager"
    },
    { 
      label: "Portal", 
      name: "Portal", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/portal/PortalEntityManager"
    },
    { 
      label: "Portal Role", 
      name: "PortalRole", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/portalrole/PortalRoleEntityManager"
    },
    { 
      label: "Preferences", 
      name: "Preferences", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/preferences/PreferencesEntityManager"
    },
    { 
      label: "Reminder", 
      name: "Reminder", 
      type: "", 
      module: "", 
      icon: MessageSquare,
      routePath: "/admin/reminder/ReminderEntityManager"
    },
    { 
      label: "Role", 
      name: "Role", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/role/RoleEntityManager"
    },
    { 
      label: "Scheduled Job", 
      name: "ScheduledJob", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/scheduledjob/ScheduledJobEntityManager"
    },
    { 
      label: "Scheduled Job Log Record", 
      name: "ScheduledJobLogRecord", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/scheduledjoblogrecord/ScheduledJobLogRecordEntityManager"
    },
    { 
      label: "Stream Subscription", 
      name: "StreamSubscription", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/streamsubscription/StreamSubscriptionEntityManager"
    },
    { 
      label: "Target List Category", 
      name: "TargetListCategory", 
      type: "Category Tree", 
      module: "", 
      icon: Folder,
      routePath: "/admin/targetlistcategory/TargetListCategoryEntityManager"
    },
    { 
      label: "Team", 
      name: "Team", 
      type: "", 
      module: "", 
      icon: Users,
      routePath: "/admin/team/TeamEntityManager"
    },
    { 
      label: "Template", 
      name: "Template", 
      type: "", 
      module: "", 
      icon: FileText,
      routePath: "/admin/template/TemplateEntityManager"
    },
    { 
      label: "Unique ID", 
      name: "UniqueId", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/uniqueid/UniqueIdEntityManager"
    },
    { 
      label: "User Data", 
      name: "UserData", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/userdata/UserDataEntityManager"
    },
    { 
      label: "User Reaction", 
      name: "UserReaction", 
      type: "", 
      module: "", 
      icon: MessageSquare,
      routePath: "/admin/userreaction/UserReactionEntityManager"
    },
    { 
      label: "Webhook", 
      name: "Webhook", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/webhook/WebhookEntityManager"
    },
    { 
      label: "Webhook Event Queue Item", 
      name: "WebhookEventQueueItem", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/webhookeventqueueitem/WebhookEventQueueItemEntityManager"
    },
    { 
      label: "Webhook Queue Item", 
      name: "WebhookQueueItem", 
      type: "", 
      module: "", 
      icon: Settings,
      routePath: "/admin/webhookqueueitem/WebhookQueueItemEntityManager"
    },
    { 
      label: "Working Time Calendar", 
      name: "WorkingTimeCalendar", 
      type: "", 
      module: "", 
      icon: Calendar,
      routePath: "/admin/workingtimecalendar/WorkingTimeCalendarEntityManager"
    },
    { 
      label: "Working Time Exception", 
      name: "WorkingTimeRange", 
      type: "", 
      module: "", 
      icon: Calendar,
      routePath: "/admin/workingtimerange/WorkingTimeRangeEntityManager"
    }
  ]);

  const typeOptions = [
    'Base',
    'Base Plus',
    'Event',
    'Person',
    'Company',
    'Category Tree'
  ];

  const iconOptions = [
    'None',
    'Users',
    'User',
    'Phone',
    'DollarSign',
    'Calendar',
    'Mail',
    'MessageSquare',
    'FileText',
    'Folder',
    'HelpCircle',
    'Target',
    'CheckSquare',
    'Settings'
  ];

  const filteredEntities = entities.filter(entity =>
    entity.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setFormData({
      name: '',
      labelSingular: '',
      labelPlural: '',
      type: 'Base',
      icon: 'None',
      color: '#6b7280',
      stream: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.labelSingular || !formData.labelPlural) {
      alert('Please fill in all required fields');
      return;
    }

    // Get icon component based on selection
    const getIconComponent = (iconName) => {
      const iconMap = {
        'Users': Users,
        'User': User,
        'Phone': Phone,
        'DollarSign': DollarSign,
        'Calendar': Calendar,
        'Mail': Mail,
        'MessageSquare': MessageSquare,
        'FileText': FileText,
        'Folder': Folder,
        'HelpCircle': HelpCircle,
        'Target': Target,
        'CheckSquare': CheckSquare,
        'Settings': Settings
      };
      return iconMap[iconName] || Settings;
    };

    // Create new entity with route path
    const newEntity = {
      label: formData.labelSingular,
      name: formData.name,
      type: formData.type === 'Base' ? '' : formData.type,
      module: '',
      icon: getIconComponent(formData.icon),
      routePath: `/admin/${formData.name.toLowerCase()}/${formData.name}EntityManager`
    };

    // Add to entities list
    setEntities(prev => [newEntity, ...prev]);
    
    // Close form and reset
    handleCloseForm();
    
    console.log('New entity created:', newEntity);
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-gray-500">
              <span className="text-blue-600 cursor-pointer hover:underline">Administration</span>
              <span className="mx-2">›</span>
              <span className="text-blue-600 cursor-pointer hover:underline">Entity Manager</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Create Entity</span>
            </nav>
          </div>
        </div>

        {/* Create Form */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            <form onSubmit={handleSubmit}>
              {/* Form Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Create Entity</h1>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
                    >
                      {typeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Label Singular */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Singular <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="labelSingular"
                    value={formData.labelSingular}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Label Plural */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Plural <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="labelPlural"
                    value={formData.labelPlural}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="relative">
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
                    >
                      {iconOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-20 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Stream */}
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="stream"
                      checked={formData.stream}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Stream</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
                <button 
                  onClick={handleCreateClick}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
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
                        onClick={() => handleEntityClick(entity.name, entity.label, entity.icon)}
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