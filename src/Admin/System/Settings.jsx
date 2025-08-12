import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Info, Plus, X } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('System');
  
  // System tab states
  const [siteUrl, setSiteUrl] = useState('http://localhost/EspoCRM-9.1.7');
  const [useCache, setUseCache] = useState(true);
  const [useWebSocket, setUseWebSocket] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [disableCron, setDisableCron] = useState(false);
  
  // Locale tab states
  const [language, setLanguage] = useState('English (US)');
  const [timeZone, setTimeZone] = useState('UTC');
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('Sunday');
  const [dateFormat, setDateFormat] = useState('DD.MM.YYYY');
  const [timeFormat, setTimeFormat] = useState('HH:mm');
  const [fiscalYearStart, setFiscalYearStart] = useState('January');
  const [thousandSeparator, setThousandSeparator] = useState(',');
  const [decimalMark, setDecimalMark] = useState('.');
  const [personNameFormat, setPersonNameFormat] = useState('First Last');
  const [addressFormat, setAddressFormat] = useState('1');
  const [addressCityAutocomplete, setAddressCityAutocomplete] = useState('');
  const [addressStateAutocomplete, setAddressStateAutocomplete] = useState('');
  
  // General tab states
  const [cleanupDeletedRecords, setCleanupDeletedRecords] = useState(true);
  const [markNewEmailAsOptedOut, setMarkNewEmailAsOptedOut] = useState(false);
  const [allowToRemoveCreatedRecords, setAllowToRemoveCreatedRecords] = useState(false);
  const [bccMode, setBccMode] = useState(false);
  const [disableExportAdminOnly, setDisableExportAdminOnly] = useState(false);
  const [pdfEngine, setPdfEngine] = useState('tcmpdf');
  const [useSeparatorWhenFiltering, setUseSeparatorWhenFiltering] = useState(false);
  const [appendWildcard, setAppendWildcard] = useState(false);
  const [internationalPhoneNumbers, setInternationalPhoneNumbers] = useState(true);
  const [phoneicPhoneNumberSearch, setPhoneicPhoneNumberSearch] = useState(true);
  const [preferredTelephoneCodes, setPreferredTelephoneCodes] = useState('US +1, DE +49');
  const [phoneNumberExtensions, setPhoneNumberExtensions] = useState('');
  const [calendarEntityList, setCalendarEntityList] = useState('Meeting, Call, Task');
  const [activitiesEntityList, setActivitiesEntityList] = useState('Meeting, Call');
  const [historyEntityList, setHistoryEntityList] = useState('Meeting, Call, Email');
  const [workingTimeCalendar, setWorkingTimeCalendar] = useState('Select');
  const [attachmentsMaxSize, setAttachmentsMaxSize] = useState('256');
  const [uploadChunkSize, setUploadChunkSize] = useState('4');
  const [availableReactions, setAvailableReactions] = useState('👍 Like');
  const [followCreatedEntities, setFollowCreatedEntities] = useState(true);
  const [emailBodyWithStreamNotes, setEmailBodyWithStreamNotes] = useState('Case');

  // Dropdown states
  const [dropdowns, setDropdowns] = useState({
    language: false,
    timeZone: false,
    firstDayOfWeek: false,
    dateFormat: false,
    timeFormat: false,
    fiscalYearStart: false,
    personNameFormat: false,
    addressFormat: false,
    workingTimeCalendar: false
  });

  const languages = ['English (US)', 'English (UK)', 'German', 'French', 'Spanish', 'Italian'];
  const timeZones = ['UTC', 'America/New_York', 'Europe/London', 'Europe/Berlin', 'Asia/Tokyo'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateFormats = ['DD.MM.YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'];
  const timeFormats = ['HH:mm', 'hh:mm A', 'H:mm'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const nameFormats = ['First Last', 'Last, First', 'Last First'];
  const addressFormats = ['1', '2', '3', '4'];
  const calendars = ['Select', 'Business Hours', '24/7', 'Custom'];

  const handleAdminClick = () => {
    console.log('Navigating to /admin');
  };

  const handleSave = () => {
    console.log('Saving settings...');
  };

  const handleCancel = () => {
    console.log('Cancelling changes...');
  };

  const toggleDropdown = (name) => {
    setDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const selectDropdownValue = (name, value, setter) => {
    setter(value);
    setDropdowns(prev => ({ ...prev, [name]: false }));
  };

  const Dropdown = ({ name, value, options, setter, placeholder = "Select" }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(name)}
        className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdowns[name] ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {dropdowns[name] && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => selectDropdownValue(name, option, setter)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const InfoIcon = () => (
    <Info className="w-4 h-4 text-gray-400 ml-1 inline-block" />
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          Site URL <InfoIcon />
        </label>
        <input
          type="text"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            Use Cache <InfoIcon />
          </label>
          <input
            type="checkbox"
            checked={useCache}
            onChange={(e) => setUseCache(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            Use WebSocket <InfoIcon />
          </label>
          <input
            type="checkbox"
            checked={useWebSocket}
            onChange={(e) => setUseWebSocket(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            Maintenance Mode <InfoIcon />
          </label>
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            Disable Cron <InfoIcon />
          </label>
          <input
            type="checkbox"
            checked={disableCron}
            onChange={(e) => setDisableCron(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderLocaleTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <Dropdown name="language" value={language} options={languages} setter={setLanguage} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <Dropdown name="timeZone" value={timeZone} options={timeZones} setter={setTimeZone} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Day of Week</label>
          <Dropdown name="firstDayOfWeek" value={firstDayOfWeek} options={daysOfWeek} setter={setFirstDayOfWeek} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <Dropdown name="dateFormat" value={dateFormat} options={dateFormats} setter={setDateFormat} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
          <Dropdown name="timeFormat" value={timeFormat} options={timeFormats} setter={setTimeFormat} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year Start</label>
          <Dropdown name="fiscalYearStart" value={fiscalYearStart} options={months} setter={setFiscalYearStart} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thousand Separator</label>
          <input
            type="text"
            value={thousandSeparator}
            onChange={(e) => setThousandSeparator(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Mark *</label>
          <input
            type="text"
            value={decimalMark}
            onChange={(e) => setDecimalMark(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Person Name Format</label>
          <Dropdown name="personNameFormat" value={personNameFormat} options={nameFormats} setter={setPersonNameFormat} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Format</label>
          <Dropdown name="addressFormat" value={addressFormat} options={addressFormats} setter={setAddressFormat} />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Address Preview</div>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Street</div>
          <div>City, State PostalCode</div>
          <div>Country</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Address City Autocomplete List <InfoIcon />
          </label>
          <input
            type="text"
            value={addressCityAutocomplete}
            onChange={(e) => setAddressCityAutocomplete(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Address State Autocomplete List <InfoIcon />
          </label>
          <input
            type="text"
            value={addressStateAutocomplete}
            onChange={(e) => setAddressStateAutocomplete(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Clean up deleted records <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={cleanupDeletedRecords}
              onChange={(e) => setCleanupDeletedRecords(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Allow to remove created records <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={allowToRemoveCreatedRecords}
              onChange={(e) => setAllowToRemoveCreatedRecords(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Disable Export (only admin is allowed) <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={disableExportAdminOnly}
              onChange={(e) => setDisableExportAdminOnly(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PDF Engine</label>
            <input
              type="text"
              value={pdfEngine}
              onChange={(e) => setPdfEngine(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Use 'contains' operator when filtering varchar fields <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={useSeparatorWhenFiltering}
              onChange={(e) => setUseSeparatorWhenFiltering(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Append wildcard in quick search <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={appendWildcard}
              onChange={(e) => setAppendWildcard(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">International phone numbers</label>
            <input
              type="checkbox"
              checked={internationalPhoneNumbers}
              onChange={(e) => setInternationalPhoneNumbers(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Phonetic phone number search</label>
            <input
              type="checkbox"
              checked={phoneicPhoneNumberSearch}
              onChange={(e) => setPhoneicPhoneNumberSearch(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Calendar Entity List <InfoIcon />
            </label>
            <input
              type="text"
              value={calendarEntityList}
              onChange={(e) => setCalendarEntityList(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Two-Way Entity List <InfoIcon />
            </label>
            <input
              type="text"
              value="Meeting, Call"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Working Time Calendar <InfoIcon />
            </label>
            <Dropdown 
              name="workingTimeCalendar" 
              value={workingTimeCalendar} 
              options={calendars} 
              setter={setWorkingTimeCalendar} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Size (Mb)</label>
            <input
              type="text"
              value={attachmentsMaxSize}
              onChange={(e) => setAttachmentsMaxSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Reactions</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={availableReactions}
                onChange={(e) => setAvailableReactions(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-3 py-2 text-blue-600 hover:text-blue-800">Add</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Entities with email body in stream notes</label>
            <input
              type="text"
              value={emailBodyWithStreamNotes}
              onChange={(e) => setEmailBodyWithStreamNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Mark new email addresses as opted-out <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={markNewEmailAsOptedOut}
              onChange={(e) => setMarkNewEmailAsOptedOut(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              BCC Mode <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={bccMode}
              onChange={(e) => setBccMode(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Global Search Entity List <InfoIcon /></label>
            <input
              type="text"
              value="Account, Contact, Lead, Opportunity"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred telephone country codes</label>
            <input
              type="text"
              value={preferredTelephoneCodes}
              onChange={(e) => setPreferredTelephoneCodes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone number extensions</label>
            <input
              type="text"
              value={phoneNumberExtensions}
              onChange={(e) => setPhoneNumberExtensions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Activities Entity List <InfoIcon />
            </label>
            <input
              type="text"
              value={activitiesEntityList}
              onChange={(e) => setActivitiesEntityList(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              History Entity List <InfoIcon />
            </label>
            <input
              type="text"
              value={historyEntityList}
              onChange={(e) => setHistoryEntityList(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Chunk Size (Mb)</label>
            <input
              type="text"
              value={uploadChunkSize}
              onChange={(e) => setUploadChunkSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              Follow created records <InfoIcon />
            </label>
            <input
              type="checkbox"
              checked={followCreatedEntities}
              onChange={(e) => setFollowCreatedEntities(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button
            onClick={handleAdminClick}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Administration
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Settings</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['System', 'Locale', 'General'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'System' && renderSystemTab()}
            {activeTab === 'Locale' && renderLocaleTab()}
            {activeTab === 'General' && renderGeneralTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;