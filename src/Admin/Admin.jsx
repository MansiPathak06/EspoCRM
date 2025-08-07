import React, { useState } from "react";
import { 
  Settings, 
  Users, 
  Palette, 
  Mail, 
  Globe, 
  Wrench, 
  Database, 
  Zap,
  Shield,
  Clock,
  Bell,
  Plug,
  Package,
  CheckCircle,
  RotateCcw,
  Trash2,
  UserCheck,
  UserPlus,
  Key,
  History,
  Cpu,
  Layout,
  Type,
  FileText,
  Send,
  Download,
  FolderOpen,
  MessageSquare,
  Smartphone,
  ExternalLink,
  UserCog,
  Calendar,
  BarChart3,
  Target,
  FileImage,
  Webhook,
  MapPin,
  Import,
  Paperclip,
  Briefcase,
  AtSign,
  Phone,
  Lock,
  CloudLightning,
  FileBarChart,
  Calculator,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const Admin = ({ onNavigate }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [showDescriptions, setShowDescriptions] = useState(false);

  // Function to handle navigation
  const handleItemClick = (itemName, sectionTitle) => {
    // Convert to route-friendly format
    const route = `/${sectionTitle.toLowerCase()}/${itemName.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Call external navigation handler if provided
    if (onNavigate) {
      onNavigate(route, { item: itemName, section: sectionTitle });
    }
    
    // For now, just log the navigation attempt
    console.log(`Navigating to: ${route}`, { item: itemName, section: sectionTitle });
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  const sections = [
    {
      title: "System",
      icon: <Settings className="w-5 h-5" />,
      route: "/admin/system",
      items: [
        { 
          name: "Settings", 
          icon: <Settings className="w-4 h-4" />, 
          route: "/admin/system/settings",
          description: "System settings of application."
        },
        { 
          name: "User Interface", 
          icon: <Layout className="w-4 h-4" />, 
          route: "/admin/system/user-interface",
          description: "Configure UI."
        },
        { 
          name: "Authentication", 
          icon: <Shield className="w-4 h-4" />, 
          route: "/admin/system/authentication",
          description: "Authentication settings."
        },
        { 
          name: "Scheduled Jobs", 
          icon: <Clock className="w-4 h-4" />, 
          route: "/admin/system/scheduled-jobs",
          description: "Jobs which are executed by cron."
        },
        { 
          name: "Currency", 
          icon: <BarChart3 className="w-4 h-4" />, 
          route: "/admin/system/currency",
          description: "Currency settings and rates."
        },
        { 
          name: "Notifications", 
          icon: <Bell className="w-4 h-4" />, 
          route: "/admin/system/notifications",
          description: "In-app and email notification settings."
        },
        { 
          name: "Integrations", 
          icon: <Plug className="w-4 h-4" />, 
          route: "/admin/system/integrations",
          description: "Integration with third-party services."
        },
        { 
          name: "Extensions", 
          icon: <Package className="w-4 h-4" />, 
          route: "/admin/system/extensions",
          description: "Install or uninstall extensions."
        },
        { 
          name: "System Requirements", 
          icon: <CheckCircle className="w-4 h-4" />, 
          route: "/admin/system/requirements",
          description: "System Requirements for EspoCRM."
        },
        { 
          name: "Job Settings", 
          icon: <Wrench className="w-4 h-4" />, 
          route: "/admin/system/job-settings",
          description: "Job processing settings. Jobs execute tasks in the background."
        },
        { 
          name: "Upgrade", 
          icon: <Zap className="w-4 h-4" />, 
          route: "/admin/system/upgrade",
          description: "Upgrade EspoCRM."
        },
        { 
          name: "Clear Cache", 
          icon: <Trash2 className="w-4 h-4" />, 
          route: "/admin/system/clear-cache",
          description: "Clear all backend cache."
        },
        { 
          name: "Rebuild", 
          icon: <RotateCcw className="w-4 h-4" />, 
          route: "/admin/system/rebuild",
          description: "Rebuild backend and clear cache."
        }
      ]
    },
    {
      title: "Users",
      icon: <Users className="w-5 h-5" />,
      route: "/admin/users",
      items: [
        { 
          name: "Users", 
          icon: <Users className="w-4 h-4" />, 
          route: "/admin/users/list",
          description: "Users management."
        },
        { 
          name: "Teams", 
          icon: <UserPlus className="w-4 h-4" />, 
          route: "/admin/users/teams",
          description: "Teams management."
        },
        { 
          name: "Roles", 
          icon: <UserCog className="w-4 h-4" />, 
          route: "/admin/users/roles",
          description: "Roles management."
        },
        { 
          name: "Auth Log", 
          icon: <FileBarChart className="w-4 h-4" />, 
          route: "/admin/users/auth-log",
          description: "Login history."
        },
        { 
          name: "Auth Tokens", 
          icon: <Key className="w-4 h-4" />, 
          route: "/admin/users/auth-tokens",
          description: "Active auth sessions. IP address and last access date."
        },
        { 
          name: "Action History", 
          icon: <History className="w-4 h-4" />, 
          route: "/admin/users/action-history",
          description: "Log of user actions."
        },
        { 
          name: "API Users", 
          icon: <Cpu className="w-4 h-4" />, 
          route: "/admin/users/api-users",
          description: "Separate users for integration purposes."
        }
      ]
    },
    {
      title: "Customization",
      icon: <Palette className="w-5 h-5" />,
      route: "/admin/customization",
      items: [
        { 
          name: "Entity Manager", 
          icon: <Database className="w-4 h-4" />, 
          route: "/admin/customization/entity-manager",
          description: "Create and edit custom entities. Manage fields and relationships."
        },
        { 
          name: "Layout Manager", 
          icon: <Layout className="w-4 h-4" />, 
          route: "/admin/customization/layout-manager",
          description: "Customize layouts (list, detail, edit, search, mass update)."
        },
        { 
          name: "Label Manager", 
          icon: <Type className="w-4 h-4" />, 
          route: "/admin/customization/label-manager",
          description: "Customize application labels."
        },
        { 
          name: "Template Manager", 
          icon: <FileText className="w-4 h-4" />, 
          route: "/admin/customization/template-manager",
          description: "Customize message templates."
        }
      ]
    },
    {
      title: "Messaging",
      icon: <Mail className="w-5 h-5" />,
      route: "/admin/messaging",
      items: [
        { 
          name: "Outbound Emails", 
          icon: <Send className="w-4 h-4" />, 
          route: "/admin/messaging/outbound-emails",
          description: "SMTP settings for outgoing emails."
        },
        { 
          name: "Inbound Emails", 
          icon: <Download className="w-4 h-4" />, 
          route: "/admin/messaging/inbound-emails",
          description: "Settings for incoming emails."
        },
        { 
          name: "Group Email Accounts", 
          icon: <Mail className="w-4 h-4" />, 
          route: "/admin/messaging/group-email-accounts",
          description: "Group IMAP email accounts. Email import and Email-to-Case."
        },
        { 
          name: "Personal Email Accounts", 
          icon: <AtSign className="w-4 h-4" />, 
          route: "/admin/messaging/personal-email-accounts",
          description: "Users email accounts."
        },
        { 
          name: "Email Filters", 
          icon: <Wrench className="w-4 h-4" />, 
          route: "/admin/messaging/email-filters",
          description: "Email messages that match the specified filter won't be imported."
        },
        { 
          name: "Group Email Folders", 
          icon: <FolderOpen className="w-4 h-4" />, 
          route: "/admin/messaging/group-email-folders",
          description: "Email folders shared for teams."
        },
        { 
          name: "Email Templates", 
          icon: <FileText className="w-4 h-4" />, 
          route: "/admin/messaging/email-templates",
          description: "Templates for outbound emails."
        },
        { 
          name: "SMS", 
          icon: <Smartphone className="w-4 h-4" />, 
          route: "/admin/messaging/sms",
          description: "SMS settings."
        }
      ]
    },
    {
      title: "Portal",
      icon: <Globe className="w-5 h-5" />,
      route: "/admin/portal",
      items: [
        { 
          name: "Portals", 
          icon: <Globe className="w-4 h-4" />, 
          route: "/admin/portal/portals",
          description: "Portals management."
        },
        { 
          name: "Portal Users", 
          icon: <UserCheck className="w-4 h-4" />, 
          route: "/admin/portal/users",
          description: "Users of portal."
        },
        { 
          name: "Portal Roles", 
          icon: <UserCog className="w-4 h-4" />, 
          route: "/admin/portal/roles",
          description: "Roles for portal."
        }
      ]
    },
    {
      title: "Setup",
      icon: <Wrench className="w-5 h-5" />,
      route: "/admin/setup",
      items: [
        { 
          name: "Working Time Calendars", 
          icon: <Calendar className="w-4 h-4" />, 
          route: "/admin/setup/working-time-calendars",
          description: "Working schedule."
        },
        { 
          name: "Layout Sets", 
          icon: <Layout className="w-4 h-4" />, 
          route: "/admin/setup/layout-sets",
          description: "Collections of layouts that can be assigned to teams & portals."
        },
        { 
          name: "Dashboard Templates", 
          icon: <BarChart3 className="w-4 h-4" />, 
          route: "/admin/setup/dashboard-templates",
          description: "Deploy dashboards to users."
        },
        { 
          name: "Lead Capture", 
          icon: <Target className="w-4 h-4" />, 
          route: "/admin/setup/lead-capture",
          description: "Lead capture endpoints and web forms."
        },
        { 
          name: "PDF Templates", 
          icon: <FileImage className="w-4 h-4" />, 
          route: "/admin/setup/pdf-templates",
          description: "Templates for printing to PDF."
        },
        { 
          name: "Webhooks", 
          icon: <Webhook className="w-4 h-4" />, 
          route: "/admin/setup/webhooks",
          description: "Manage webhooks."
        },
        { 
          name: "Address Countries", 
          icon: <MapPin className="w-4 h-4" />, 
          route: "/admin/setup/address-countries",
          description: "Countries available for address fields."
        },
        { 
          name: "Authentication Providers", 
          icon: <Shield className="w-4 h-4" />, 
          route: "/admin/setup/authentication-providers",
          description: "Additional authentication providers for portals."
        }
      ]
    },
    {
      title: "Data",
      icon: <Database className="w-5 h-5" />,
      route: "/admin/data",
      items: [
        { 
          name: "Import", 
          icon: <Import className="w-4 h-4" />, 
          route: "/admin/data/import",
          description: "Import data from CSV file."
        },
        { 
          name: "Attachments", 
          icon: <Paperclip className="w-4 h-4" />, 
          route: "/admin/data/attachments",
          description: "All file attachments stored in the system."
        },
        { 
          name: "Jobs", 
          icon: <Briefcase className="w-4 h-4" />, 
          route: "/admin/data/jobs",
          description: "Jobs execute tasks in the background."
        },
        { 
          name: "Email Addresses", 
          icon: <AtSign className="w-4 h-4" />, 
          route: "/admin/data/email-addresses",
          description: "All email addresses stored in the system."
        },
        { 
          name: "Phone Numbers", 
          icon: <Phone className="w-4 h-4" />, 
          route: "/admin/data/phone-numbers",
          description: "All phone numbers stored in the system."
        },
        { 
          name: "App Secrets", 
          icon: <Lock className="w-4 h-4" />, 
          route: "/admin/data/app-secrets",
          description: "Store sensitive information like API keys, passwords, and other secrets."
        },
        { 
          name: "OAuth Providers", 
          icon: <CloudLightning className="w-4 h-4" />, 
          route: "/admin/data/oauth-providers",
          description: "OAuth providers for integrations."
        },
        { 
          name: "App Log", 
          icon: <FileBarChart className="w-4 h-4" />, 
          route: "/admin/data/app-log",
          description: "Application log."
        }
      ]
    },
    {
      title: "Misc",
      icon: <Zap className="w-5 h-5" />,
      route: "/admin/misc",
      items: [
        { 
          name: "Formula Sandbox", 
          icon: <Calculator className="w-4 h-4" />, 
          route: "/admin/misc/formula-sandbox",
          description: "Write and test formula scripts."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal text-gray-700">Administration</h1>
          <button
            onClick={() => setShowDescriptions(!showDescriptions)}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>{showDescriptions ? 'Hide' : 'Show'} Descriptions</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sections.map((section, sectionIndex) => {
            const isExpanded = expandedSections[sectionIndex];
            const shouldShowItems = isExpanded !== false; // Show by default, hide only if explicitly false

            return (
              <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Section Header */}
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className="w-full flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-blue-600">
                        {section.icon}
                      </div>
                      <h2 className="text-lg font-medium text-gray-800">{section.title}</h2>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600">
                      {shouldShowItems ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Section Items */}
                {shouldShowItems && (
                  <div className="p-2">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => handleItemClick(item.name, section.title)}
                        className="w-full flex items-start space-x-3 px-3 py-3 text-left rounded-md hover:bg-gray-50 transition-colors duration-150 group cursor-pointer"
                      >
                        <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-150 mt-0.5 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-150 block">
                                {item.name}
                              </span>
                              {showDescriptions && item.description && (
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;