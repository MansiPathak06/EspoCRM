import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const LayoutManager = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedEntities, setExpandedEntities] = useState({});
  
  const entities = [
    {
      name: 'Accounts',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Convert Lead']
    },
    {
      name: 'Calls',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'Campaigns',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'Cases',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Detail(Portal)','Detail(Small,Portal), List(Portal)']
    },
    {
      name: 'Contacts',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Convert Lead', 'List(for Account)']
    },
    {
      name: 'Documents',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'EmailAddress',
      layouts: ['List', 'Detail', 'Search Filters', 'Mass Update']
    },
    {
      name: 'Emails',
      layouts: ['List', 'List (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)']
    },
    {
      name: 'Knowledge Base',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Detail (Portal)', 'Detail (Small, Portal)', 'List (Portal)']
    },
    {
      name: 'Leads',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'Meetings',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Bottom Panels(Edit)', 'Bottom Panels(Edit Small)']
    },
    {
      name: 'Import',
      layouts: ['List', 'Detail', 'Search Filters', 'Mass Update']
    },
    {
      name: 'InboundEmail',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Search Filters', 'Mass Update']
    },
    
    {
      name: 'KnowledgeBaseArticle',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'Leads',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Convert Lead']
    },
    {
      name: 'Meetings',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'Opportunities',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Kanban', 'Convert Lead', 'List (for Account)', 'List (for Contact)']
    },
    {
      name: 'Target Lists',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    },
    {
      name: 'Tasks',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)', 'Kanban']
    },
    {
      name: 'Users',
      layouts: ['List', 'Detail', 'List (Small)', 'Detail (Small)', 'Side Panel Fields', 'Bottom Panels', 'Search Filters', 'Mass Update', 'Side Panels (Detail)', 'Side Panels (Edit)', 'Side Panels (Detail Small)', 'Side Panels (Edit Small)']
    }
  ];

  const handleEntityToggle = (entityName) => {
    setExpandedEntities(prev => ({
      ...prev,
      [entityName]: !prev[entityName]
    }));
  };

  const handleLayoutClick = (entityName, layoutName) => {
    console.log(`Selected: ${entityName} - ${layoutName}`);
    // Close mobile menu after selection
    setIsMobileMenuOpen(false);
    // Here you would typically navigate to the layout editor
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <nav className="text-sm text-gray-500">
              <span className="text-blue-600 cursor-pointer hover:underline">Administration</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Layout Manager</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Left Panel - Entity List */}
        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          fixed md:static 
          z-50 md:z-auto
          w-72 sm:w-80 
          bg-white 
          border-r border-gray-200 
          min-h-screen 
          transition-transform duration-300 ease-in-out
          md:transition-none
          overflow-y-auto
        `}>
          <div className="p-3 sm:p-4">
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h3 className="text-lg font-medium text-gray-900">Entities</h3>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Entity List with Dropdowns */}
            <div className="space-y-1">
              {entities.map((entity, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  {/* Entity Header */}
                  <div
                    onClick={() => handleEntityToggle(entity.name)}
                    className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md cursor-pointer transition-colors duration-150 font-medium text-sm sm:text-base"
                  >
                    <span>{entity.name}</span>
                    {expandedEntities[entity.name] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>

                  {/* Layout Options Dropdown */}
                  {expandedEntities[entity.name] && (
                    <div className="ml-4 pb-2 space-y-1">
                      {entity.layouts.map((layout, layoutIndex) => (
                        <div
                          key={layoutIndex}
                          onClick={() => handleLayoutClick(entity.name, layout)}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded cursor-pointer transition-colors duration-150"
                        >
                          {layout}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Content Area */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="text-center text-gray-500 max-w-md mx-auto">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Select needed layout in the left menu and edit it.
            </p>
            
            {/* Mobile Instruction */}
            <p className="text-sm text-gray-400 mt-4 md:hidden">
              Tap the menu button to view available layouts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;