import React from 'react';
import { Search, Plus, Bell, MoreVertical } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">About</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Version Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="text-sm text-gray-600 mb-4">
              Version 9.1.7
            </div>
          </div>

          {/* Main About Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  EspoCRM – Open Source CRM application
                </h2>
                <a 
                  href="https://www.espocrm.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  www.espocrm.com
                </a>
              </div>

              <div className="text-sm text-gray-700 space-y-4">
                <p>
                  Copyright © 2014-2025 EspoCRM: Yurii Kuznietsov, Taras Machyshyn, Oleksii Avramenko.
                </p>

                <p>
                  EspoCRM is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
                </p>

                <p>
                  EspoCRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
                </p>

                <p>
                  You should have received a copy of the GNU Affero General Public License along with EspoCRM. If not, see{' '}
                  <a 
                    href="https://www.gnu.org/licenses/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    https://www.gnu.org/licenses/
                  </a>.
                </p>

                <p>
                  The interactive user interfaces in modified source and object code versions of this program must display Appropriate Legal Notices, as required under Section 5 of the GNU Affero General Public License version 3.
                </p>

                <p>
                  In accordance with Section 7(b) of the GNU Affero General Public License version 3, these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;