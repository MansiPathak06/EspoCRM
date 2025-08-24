import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const LabelManager = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [labels, setLabels] = useState({
    boolFilters: {
      followed: "Followed",
      onlyMy: "Only My",
      onlyMyTeam: "My Team",
      shared: "Shared",
    },
    dashlets: {
      Activities: "My Activities",
      Calendar: "Calendar",
      Calls: "My Calls",
      Cases: "My Cases",
      Emails: "My Inbox",
      Iframe: "Iframe",
      Leads: "My Leads",
      Meetings: "My Meetings",
      Memo: "Memo",
      Opportunities: "My Opportunities",
      OpportunitiesByLeadSource: "Opportunities by Lead Source",
      OpportunitiesByStage: "Opportunities by Stage",
      Records: "Record List",
      SalesByMonth: "Sales by Month",
      SalesPipeline: "Sales Pipeline",
      Stream: "Stream",
      Tasks: "My Tasks",
    },
    detailViewModes: {
      detail: "Detail",
    },
    durationUnits: {
      d: "d",
      h: "h",
      m: "m",
      s: "s",
    },
    fields: {
      address: "Address",
      addressCity: "City",
      addressCountry: "Country",
      addressMap: "Map",
      addressPostalCode: "Postal Code",
      addressState: "State",
      addressStreet: "Street",
      assignedUser: "Assigned User",
      assignedUserName: "Assigned User Name",
      assignedUsers: "Assigned Users",
      billingAddressCity: "City",
      billingAddressCountry: "Country",
      billingAddressMap: "Map",
      billingAddressPostalCode: "Postal Code",
      billingAddressState: "State",
      billingAddressStreet: "Street",
      childList: "Child List",
      children: "Children",
      collaborators: "Collaborators",
      createdAt: "Created At",
      createdBy: "Created By",
      description: "Description",
      emailAddress: "Email",
      emailAddressData: "Email Address Data",
      emailAddressIsInvalid: "Email Address is Invalid",
      emailAddressIsOptedOut: "Email Address is Opted-Out",
      firstName: "First Name",
      id: "ID",
      ids: "IDs",
      lastName: "Last Name",
      middleName: "Middle Name",
      modifiedAt: "Modified At",
      modifiedBy: "Modified By",
      name: "Name",
      names: "Names",
      order: "Order",
      parent: "Parent",
      phoneNumber: "Phone",
      phoneNumberData: "Phone Number Data",
      phoneNumberFax: "Phone (Fax)",
      phoneNumberHome: "Phone (Home)",
      phoneNumberIsInvalid: "Phone Number is Invalid",
      phoneNumberIsOptedOut: "Phone Number is Opted-Out",
      phoneNumberMobile: "Phone (Mobile)",
      phoneNumberOffice: "Phone (Office)",
      phoneNumberOther: "Phone (Other)",
      salutationName: "Salutation",
      shippingAddressCity: "City (Shipping)",
      shippingAddressCountry: "Country (Shipping)",
      shippingAddressMap: "Map (Shipping)",
      shippingAddressPostalCode: "Postal Code (Shipping)",
      shippingAddressState: "State (Shipping)",
      shippingAddressStreet: "Street (Shipping)",
      streamUpdatedAt: "Stream Updated At",
      targetListIsOptedOut: "Is Opted Out (Target List)",
      teams: "Teams",
      type: "Type",
      types: "Types",
      users: "Users",
    },
    fieldValidationExplanations: {
      currency_valid: "Invalid amount value",
      currency_validCurrency:
        "The currency code value is invalid or not allowed",
      date_valid: "Invalid date value",
      datetime_valid: "Invalid date-time value",
      datetimeOptional_valid: "Invalid date-time value",
      email_emailAddress: "Invalid email address value",
      enum_valid:
        "Invalid enum value. The value must be one of defined enum options. An empty value is allowed only if the field has an empty option.",
      float_valid: "Invalid number value.",
      int_valid: "Invalid integer number value.",
      maxLength: "Value length exceeds maximum value.",
      multiEnum_valid:
        "Invalid multi-enum value. Values must be one of defined field options.",
      phone_phoneNumber: "Invalid phone number value.",
      phone_valid:
        "Phone number is not valid. May be caused by a wrong or empty country code.",
      url_valid: "Invalid URL value.",
      valid: "Invalid value.",
      varchar_pattern: "Likely, the value contains not allowed characters",
    },
    fieldValidations: {
      array: "Array",
      arrayOfString: "Array of Strings",
      emailAddress: "Valid Email Address",
      max: "Max Value",
      maxCount: "Max Count",
      maxLength: "Max Length",
      min: "Min Value",
      noEmptyString: "No Empty String",
      pattern: "Pattern Matching",
      phoneNumber: "Valid Phone Number",
      required: "Required",
      valid: "Validity",
    },
    labels: {
      About: "About",
      Access: "Access",
      "Access denied": "Access denied",
      Actions: "Actions",
      Active: "Active",
      Activities: "Activities",
      Add: "Add",
      "Add Dashlet": "Add Dashlet",
      "Add Field": "Add Field",
      "Add Item": "Add Item",
      Admin: "Admin",
      Administration: "Administration",
      All: "All",
      Apply: "Apply",
      "Archive Email": "Archive Email",
      "Are you sure?": "Are you sure?",
      "Attach File": "Attach File",
      Attached: "Attached",
      Attendees: "Attendees",
      Attribute: "Attribute",
      "Audit Log": "Audit Log",
      by: "by",
      "Cache has been cleared": "Cache has been cleared",
      "Cache is not enabled": "Cache is not enabled",
      Cancel: "Cancel",
      change: "change",
      Change: "Change",
      City: "City",
      "Clear Local Cache": "Clear Local Cache",
      Close: "Close",
      Collapse: "Collapse",
      Collapsed: "Collapsed",
      "Column Resize": "Column Resize",
      "Compose Email": "Compose Email",
      "Convert Currency": "Convert Currency",
      "Convert to": "Convert to",
      "Copied to clipboard": "Copied to clipboard",
      "Copy to Clipboard": "Copy to Clipboard",
      Country: "Country",
      create: "create",
      Create: "Create",
      "Create InboundEmail": "Create Inbound Email",
      "Create Post": "Create Post",
      "Create Task": "Create Task",
      Created: "Created",
      "Current version": "Current version",
      "Dashlet Options": "Dashlet Options",
      Default: "Default",
      Delete: "Delete",
      Details: "Details",
      Done: "Done",
      Download: "Download",
      Duplicate: "Duplicate",
      Edit: "Edit",
      "Edit Dashboard": "Edit Dashboard",
      Erase: "Erase",
      Error: "Error",
      Expand: "Expand",
      Expanded: "Expanded",
      Export: "Export",
      Field: "Field",
      Fields: "Fields",
      Filter: "Filter",
      "First Name": "First Name",
      "First Page": "First Page",
      Follow: "Follow",
      Followed: "Followed",
      Followers: "Followers",
      From: "From",
      "Full Form": "Full Form",
      Function: "Function",
      General: "General",
      "Global Search": "Global Search",
      History: "History",
      Home: "Home",
      Inactive: "Inactive",
      Insert: "Insert",
      "Last Name": "Last Name",
      "Last Page": "Last Page",
      Linked: "Linked",
      "List View": "List View",
      "Loading...": "Loading...",
      Log: "Log",
      "Log Call": "Log Call",
      "Log in": "Log in",
      "Log in as": "Log in as",
      "Log Meeting": "Log Meeting",
      "Log Out": "Log Out",
      Login: "Login",
      "Manage Categories": "Manage Categories",
      "Manage Folders": "Manage Folders",
      "Mark all read": "Mark all read",
      "Mass Update": "Mass Update",
      Menu: "Menu",
      Merge: "Merge",
      Merged: "Merged",
      "Middle Name": "Middle Name",
      Misc: "Misc",
      Modified: "Modified",
      More: "More",
      "Move Over": "Move Over",
      "Navigation Panel": "Show Navigation Panel",
      "Network error": "Network error",
      "New notifications": "New notifications",
      "Next Entry": "Next Entry",
      "Next Page": "Next Page",
      No: "No",
      "No Access": "No Access",
      "No Data": "No Data",
      "No internet": "No internet",
      None: "None",
      "Not found": "Not found",
      "Not valid": "Not valid",
      Notifications: "Notifications",
      Now: "Now",
      Number: "Number",
      "Only My": "Only My",
      Open: "Open",
      Options: "Options",
      Original: "Original",
      Overview: "Overview",
      Page: "Page",
      Password: "Password",
      Person: "Person",
      "Personal Data": "Personal Data",
      "Please wait": "Please wait",
      "Please wait...": "Please wait...",
      Post: "Post",
      "Post cannot be empty": "Post cannot be empty",
      PostalCode: "Postal Code",
      Posted: "Posted",
      Preferences: "Preferences",
      Preview: "Preview",
      "Previous Entry": "Previous Entry",
      "Previous Page": "Previous Page",
      Primary: "Primary",
      Print: "Print",
      "Print to PDF": "Print to PDF",
      Proceed: "Proceed",
      Reacted: "Reacted",
      "Reaction Removed": "Reaction Removed",
      Reactions: "Reactions",
      Ready: "Ready",
      "Rebuild has been done": "Rebuild has been done",
      "Record has been removed": "Record has been removed",
      Refresh: "Refresh",
      Remove: "Remove",
      "Remove Filter": "Remove Filter",
      Removed: "Removed",
      Reset: "Reset",
      Resolution: "Resolution",
      "Resolve Conflict": "Resolve Conflict",
      Restore: "Restore",
      "Return to Application": "Return to Application",
      "Run Import": "Run Import",
      Save: "Save",
      "Save & Continue Editing": "Save & Continue Editing",
      "Save & New": "Save & New",
      "Save Filter": "Save Filter",
      Saved: "Saved",
      Schedule: "Schedule",
      "Schedule Call": "Schedule Call",
      "Schedule Meeting": "Schedule Meeting",
      Scheduled: "Scheduled",
      Scheduler: "Scheduler",
      Search: "Search",
      "See more": "See more",
      Select: "Select",
      "Select All Results": "Select All Results",
      "Self-Assign": "Self-Assign",
      "Self-Assigned": "Self-Assigned",
      Send: "Send",
      "Sending...": "Sending...",
      "Show more": "Show more",
      "Sign in": "Sign in",
      Skip: "Skip",
      Sort: "Sort",
      Star: "Star",
      Starred: "Starred",
      State: "State",
      Stream: "Stream",
      Street: "Street",
      Submit: "Submit",
      Tasks: "Tasks",
      Timeout: "Timeout",
      To: "To",
      Today: "Today",
      Tomorrow: "Tomorrow",
      "Top Level": "Top Level",
      Total: "Total",
      "Tree View": "Tree View",
      Unlink: "Unlink",
      "Unlink All": "Unlink All",
      Unlinked: "Unlinked",
      Unstar: "Unstar",
      Up: "Up",
      Update: "Update",
      "Uploading...": "Uploading...",
      Username: "Username",
      "Username can not be empty!": "Username can not be empty!",
      Value: "Value",
      View: "View",
      "View Audit Log": "View Audit Log",
      "View Followers": "View Followers",
      "View List": "View List",
      "View on Map": "View on Map",
      "View Personal Data": "View Personal Data",
      "View User Access": "View User Access",
      "Write your comment here": "Write your comment here",
      "Wrong username/password": "Wrong username/password",
      Yes: "Yes",
      Yesterday: "Yesterday",
      you: "you",
      "You you": "You you",
    },
    links: {
      account: "Account",
      accounts: "Accounts",
      assignedUser: "Assigned User",
      assignedUsers: "Assigned Users",
      calls: "Calls",
      cases: "Cases",
      children: "Children",
      collaborators: "Collaborators",
      contact: "Contact",
      contacts: "Contacts",
      createdBy: "Created By",
      documents: "Documents",
      emails: "Emails",
      leads: "Leads",
      meetings: "Meetings",
      modifiedBy: "Modified By",
      opportunities: "Opportunities",
      opportunity: "Opportunity",
      parent: "Parent",
      roles: "Roles",
      tasks: "Tasks",
      team: "Team",
      teams: "Teams",
      users: "Users",
    },
    lists: {
      dayNames0: "Sunday",
      dayNames1: "Monday",
      dayNames2: "Tuesday",
      dayNames3: "Wednesday",
      dayNames4: "Thursday",
      dayNames5: "Friday",
      dayNames6: "Saturday",

      dayNamesMin0: "Su",
      dayNamesMin1: "Mo",
      dayNamesMin2: "Tu",
      dayNamesMin3: "We",
      dayNamesMin4: "Th",
      dayNamesMin5: "Fr",
      dayNamesMin6: "Sa",

      dayNamesShort0: "Sun",
      dayNamesShort1: "Mon",
      dayNamesShort2: "Tue",
      dayNamesShort3: "Wed",
      dayNamesShort4: "Thu",
      dayNamesShort5: "Fri",
      dayNamesShort6: "Sat",

      monthNames0: "January",
      monthNames1: "February",
      monthNames2: "March",
      monthNames3: "April",
      monthNames4: "May",
      monthNames5: "June",
      monthNames6: "July",
      monthNames7: "August",
      monthNames8: "September",
      monthNames9: "October",
      monthNames10: "November",
      monthNames11: "December",

      monthNamesShort0: "Jan",
      monthNamesShort1: "Feb",
      monthNamesShort2: "Mar",
      monthNamesShort3: "Apr",
      monthNamesShort4: "May",
      monthNamesShort5: "Jun",
      monthNamesShort6: "Jul",
      monthNamesShort7: "Aug",
      monthNamesShort8: "Sep",
      monthNamesShort9: "Oct",
      monthNamesShort10: "Nov",
      monthNamesShort11: "Dec",
    },
    listViewModes: {
      kanban: "Kanban",
      list: "List",
    },
    massActions: {
      convertCurrency: "Convert Currency",
      delete: "Delete",
      export: "Export",
      follow: "Follow",
      massUpdate: "Mass Update",
      merge: "Merge",
      printPdf: "Print to PDF",
      recalculateFormula: "Recalculate Formula",
      remove: "Remove",
      unfollow: "Unfollow",
      unlink: "Unlink",
      update: "Update",
    },
    messages: {
      arrayInputNotEmpty: "Item is entered but not added",
      arrayItemMaxLength: "Item shouldn't be longer than {max} characters",
      attemptIntervalFailure:
        "The operation is not allowed during a specific time interval. Wait for some time before the next attempt.",
      barcodeInvalid: "{field} is not valid {type}",
      cannotLinkAlreadyLinked: "Cannot link an already linked record.",
      cannotRelateForbidden:
        "Can't relate with forbidden {foreignEntityType} record. `{action}` access required.",
      cannotRelateForbiddenLink: "No access to link '{link}'.",
      cannotRelateNonExisting:
        "Can't relate with non-existing {foreignEntityType} record.",
      cannotRemoveCategoryWithChildCategory:
        "Cannot remove a category that has a child category.",
      cannotRemoveNotEmptyCategory: "Cannot remove a non-empty category.",
      cannotUnrelateRequiredLink: "Can't unrelate required link.",
      checkForNewNotes: "Check for stream updates",
      checkForNewNotifications: "Check for new notifications",
      clickToRefresh: "Click to refresh",
      confirmAppRefresh:
        "The application has been updated. It is recommended to refresh the page to ensure the proper functioning.",
      confirmation: "Are you sure?",
      confirmLeaveOutMessage: "Are you sure you want to leave the form?",
      confirmMassFollow: "Are you sure you want to follow selected records?",
      confirmMassUnfollow:
        "Are you sure you want to unfollow selected records?",
      confirmMassUpdate:
        "Are you sure you want to mass-update selected records?",
      confirmRestoreFromAudit:
        "The previous values will be set in a form. Then you can save the record to restore the previous values.",
      done: "Done",
      dropToAttach: "Drop to attach",
      duplicate: "The record you are creating might already exist",
      duplicateConflict: "A record already exists.",
      emptyMassUpdate: "No fields available for Mass Update.",
      erasePersonalDataConfirmation:
        "Checked fields will be erased permanently. Are you sure?",
      error403: "You don't have access to this area.",
      error404: "The url you requested can't be handled.",
      extensionLicenseExpired:
        "The '{name}' extension license subscription has expired.",
      extensionLicenseInvalid: "Invalid '{name}' extension license.",
      extensionLicenseSoftExpired:
        "The '{name}' extension license subscription has expired.",
      fieldBadPasswordConfirm: "{field} not confirmed properly",
      fieldExceedsMaxCount: "Count exceeds max allowed {maxCount}",
      fieldInvalid: "{field} is invalid",
      fieldIsRequired: "{field} is required",
      fieldIsUploading: "Uploading in progress",
      fieldMaxFileSizeError: "File should not exceed {max} Mb",
      fieldNotMatchingPattern: "{field} does not match the pattern `{pattern}`",
      fieldNotMatchingPattern$digits: "{field} can contain only digits",
      fieldNotMatchingPattern$latinLetters:
        "{field} can contain only latin letters",
      fieldNotMatchingPattern$latinLettersDigits:
        "{field} can contain only latin letters and digits",
      fieldNotMatchingPattern$latinLettersDigitsWhitespace:
        "{field} can contain only latin letters, digits and whitespace",
      fieldNotMatchingPattern$latinLettersWhitespace:
        "{field} can contain only latin letters and whitespace",
      fieldNotMatchingPattern$noAsciiSpecialCharacters:
        "{field} should not contain ASCII special characters",
      fieldNotMatchingPattern$noBadCharacters:
        "{field} contains not allowed characters",
      fieldNotMatchingPattern$phoneNumberLoose:
        "{field} contains characters not allowed in a phone number",
      fieldNotMatchingPattern$uriOptionalProtocol:
        "{field} must be a valid URL",
      fieldPhoneExtensionTooLong:
        "Extension should not be longer than {maxLength}",
      fieldPhoneInvalid: "{field} is invalid",
      fieldPhoneInvalidCharacters:
        "Only digits, latin letters and characters `-+_@:#().` are allowed",
      fieldPhoneInvalidCode: "Invalid country code",
      fieldPhoneTooLong: "{field} is too long",
      fieldPhoneTooShort: "{field} is too short",
      fieldShouldAfter: "{field} should be after {otherField}",
      fieldShouldBeBetween: "{field} should be between {min} and {max}",
      fieldShouldBeDate: "{field} should be a valid date",
      fieldShouldBeDatetime: "{field} should be a valid date/time",
      fieldShouldBeEmail: "{field} should be a valid email",
      fieldShouldBeFloat: "{field} should be a valid float",
      fieldShouldBefore: "{field} should be before {otherField}",
      fieldShouldBeGreater: "{field} shouldn't be less than {value}",
      fieldShouldBeInt: "{field} should be a valid integer",
      fieldShouldBeLess: "{field} shouldn't be greater than {value}",
      fieldShouldBeNumber: "{field} should be a valid number",
      fieldUrlExceedsMaxLength: "Encoded URL exceeds max length of {maxLength}",
      fieldValueDuplicate: "Duplicate value",
      internalPost: "Post will be seen only by internal users",
      internalPostTitle: "Post is seen only by internal users",
      loading: "Loading...",
      loggedOutLeaveOut:
        "Logged out. The session is inactive. You may lose unsaved form data after page refresh. You may need to make a copy.",
      maintenanceMode:
        "The application currently is in maintenance mode. Only admin users have access.\nMaintenance mode can be disabled at Administration → Settings.",
      maintenanceModeError: "The application currently is in maintenance mode.",
      massActionProcessed: "Mass action has been processed.",
      massFollowResult: "{count} records now are followed",
      massFollowResultSingle: "{count} record now is followed",
      massFollowZeroResult: "Nothing got followed",
      massPrintPdfMaxCountError: "Can't print more that {maxCount} records.",
      massRemoveResult: "{count} records have been removed",
      massRemoveResultSingle: "{count} record has been removed",
      massUnfollowResult: "{count} records now are not followed",
      massUnfollowResultSingle: "{count} record now is not followed",
      massUnfollowZeroResult: "Nothing got unfollowed",
      massUpdateResult: "{count} records have been updated",
      massUpdateResultSingle: "{count} record has been updated",
      noAccessToForeignRecord:
        "Operation requires `{action}` access to foreign record.",
      noAccessToRecord: "Operation requires `{action}` access to record.",
      noLinkAccess:
        "Can't relate with {foreignEntityType} record through the link '{link}'. No access.",
      noRecordsRemoved: "No records were removed",
      noRecordsUpdated: "No records were updated",
      notModified: "You have not modified the record",
      notUpdated: "Not updated",
      pageNumberIsOutOfBound: "Page number is out of bound",
      pleaseWait: "Please wait...",
      recalculateFormulaConfirmation:
        "Are you sure you want to recalculate formula for selected records?",
      removeRecordConfirmation: "Are you sure you want to remove the record?",
      removeSelectedRecordsConfirmation:
        "Are you sure you want to remove selected records?",
      resetPreferencesConfirmation:
        "Are you sure you want to reset preferences to defaults?",
      resetPreferencesDone: "Preferences has been reset to defaults",
      resolveSaveConflict:
        "The record has been modified. You need to resolve the conflict before you can save the record.",
      sameRecordIsAlreadyBeingEdited: "The record is already being edited.",
      saving: "Saving...",
      select2OrMoreRecords: "Select 2 or more records",
      selectAtLeastOneRecord: "Select at least one record",
      selectNotMoreThanNumberRecords: "Select not more than {number} records",
      starsLimitExceeded: "The number of stars exceeded the limit.",
      typeAndPressEnter: "Type & press enter",
      unlinkAllConfirmation:
        "Are you sure you want to unlink all related records?",
      unlinkRecordConfirmation:
        "Are you sure you want to unlink the related record?",
      unlinkSelectedRecordsConfirmation:
        "Are you sure you want to unlink selected records?",
      validationFailure:
        "Backend validation failure.\nField: `{field}`Validation: `{type}`",
      writeMessageToSelf: "Write a message on your stream",
      writeMessageToUser: "Write a message to {user}",
      writeYourCommentHere: "Write your comment here",
    },
    navbarTabs: {
      Activities: "Activities",
      Business: "Business",
      CRM: "CRM",
      Marketing: "Marketing",
      Support: "Support",
    },
    notificationMessages: {
      assign: "{entityType} {entity} has been assigned to you",
      emailInbox: "{user} added email {entity} to your inbox",
      emailReceived: "Email received from {from}",
      entityRemoved: "{user} removed {entityType} {entity}",
      eventAttendee: "{user} added you to {entityType} {entity}",
      userPostInParentReaction:
        "{user} reacted to your {post} in {entityType} {entity}",
      userPostReaction: "{user} reacted to your {post}",
    },
    options: {
      "autorefreshInterval.0": "None",
      "autorefreshInterval.0.5": "30 seconds",
      "autorefreshInterval.1": "1 minute",
      "autorefreshInterval.10": "10 minutes",
      "autorefreshInterval.2": "2 minutes",
      "autorefreshInterval.5": "5 minutes",
      "dateSearchRanges.after": "After",
      "dateSearchRanges.afterXDays": "After X Days",
      "dateSearchRanges.before": "Before",
      "dateSearchRanges.between": "Between",
      "dateSearchRanges.currentFiscalQuarter": "Current Fiscal Quarter",
      "dateSearchRanges.currentFiscalYear": "Current Fiscal Year",
      "dateSearchRanges.currentMonth": "Current Month",
      "dateSearchRanges.currentQuarter": "Current Quarter",
      "dateSearchRanges.currentYear": "Current Year",
      "dateSearchRanges.ever": "Ever",
      "dateSearchRanges.future": "Future",
      "dateSearchRanges.isEmpty": "Is Empty",
      "dateSearchRanges.lastFiscalQuarter": "Last Fiscal Quarter",
      "dateSearchRanges.lastFiscalYear": "Last Fiscal Year",
      "dateSearchRanges.lastMonth": "Last Month",
      "dateSearchRanges.lastQuarter": "Last Quarter",
      "dateSearchRanges.lastSevenDays": "Last 7 Days",
      "dateSearchRanges.lastXDays": "Last X Days",
      "dateSearchRanges.lastYear": "Last Year",
      "dateSearchRanges.nextMonth": "Next Month",
      "dateSearchRanges.nextXDays": "Next X Days",
      "dateSearchRanges.notOn": "Not On",
      "dateSearchRanges.olderThanXDays": "Older Than X Days",
      "dateSearchRanges.on": "On",
      "dateSearchRanges.past": "Past",
      "dateSearchRanges.today": "Today",
      "intSearchRanges.between": "Between",
      "intSearchRanges.equals": "Equals",
      "intSearchRanges.greaterThan": "Greater Than",
      "intSearchRanges.greaterThanOrEquals": "Greater Than or Equals",
      "intSearchRanges.isEmpty": "Is Empty",
      "intSearchRanges.isNotEmpty": "Is Not Empty",
      "intSearchRanges.lessThan": "Less Than",
      "intSearchRanges.lessThanOrEquals": "Less Than or Equals",
      "intSearchRanges.notEquals": "Not Equals",
      "language.af_ZA": "Afrikaans",
      "language.ar_AR": "Arabic",
      "language.az_AZ": "Azerbaijani",
      "language.be_BY": "Belarusian",
      "language.bg_BG": "Bulgarian",
      "language.bn_IN": "Bengali",
      "language.bs_BA": "Bosnian",
      "language.ca_ES": "Catalan",
      "language.cs_CZ": "Czech",
      "language.cy_GB": "Welsh",
      "language.da_DK": "Danish",
      "language.de_DE": "German",
      "language.el_GR": "Greek",
      "language.en_GB": "English (UK)",
      "language.en_US": "English (US)",
      "language.es_ES": "Spanish (Spain)",
      "language.es_MX": "Spanish (Mexico)",
      "language.et_EE": "Estonian",
      "language.eu_ES": "Basque",
      "language.fa_IR": "Persian",
      "language.fi_FI": "Finnish",
      "language.fo_FO": "Faroese",
      "language.fr_CA": "French (Canada)",
      "language.fr_FR": "French (France)",
      "language.ga_IE": "Irish",
      "language.gl_ES": "Galician",
      "language.gn_PY": "Guarani",
      "language.he_IL": "Hebrew",
      "language.hi_IN": "Hindi",
      "language.hr_HR": "Croatian",
      "language.hu_HU": "Hungarian",
      "language.hy_AM": "Armenian",
      "language.id_ID": "Indonesian",
      "language.is_IS": "Icelandic",
      "language.it_IT": "Italian",
      "language.ja_JP": "Japanese",
      "language.ka_GE": "Georgian",
      "language.km_KH": "Khmer",
      "language.ko_KR": "Korean",
      "language.ku_TR": "Kurdish",
      "language.lt_LT": "Lithuanian",
      "language.lv_LV": "Latvian",
      "language.mk_MK": "Macedonian",
      "language.ml_IN": "Malayalam",
      "language.ms_MY": "Malay",
      "language.nb_NO": "Norwegian Bokmål",
      "language.ne_NP": "Nepali",
      "language.nl_NL": "Dutch",
      "language.nn_NO": "Norwegian Nynorsk",
      "language.pa_IN": "Punjabi",
      "language.pl_PL": "Polish",
      "language.ps_AF": "Pashto",
      "language.pt_BR": "Portuguese (Brazil)",
      "language.pt_PT": "Portuguese (Portugal)",
      "language.ro_RO": "Romanian",
      "language.ru_RU": "Russian",
      "language.sk_SK": "Slovak",
      "language.sl_SI": "Slovene",
      "language.sq_AL": "Albanian",
      "language.sr_RS": "Serbian",
      "language.sv_SE": "Swedish",
      "language.sw_KE": "Swahili",
      "language.ta_IN": "Tamil",
      "language.te_IN": "Telugu",
      "language.th_TH": "Thai",
      "language.tl_PH": "Tagalog",
      "language.tr_TR": "Turkish",
      "language.uk_UA": "Ukrainian",
      "language.ur_PK": "Urdu",
      "language.vi_VN": "Vietnamese",
      "language.zh_CN": "Simplified Chinese (China)",
      "language.zh_HK": "Traditional Chinese (Hong Kong)",
      "language.zh_TW": "Traditional Chinese (Taiwan)",
      "phoneNumber.Fax": "Fax",
      "phoneNumber.Home": "Home",
      "phoneNumber.Mobile": "Mobile",
      "phoneNumber.Office": "Office",
      "phoneNumber.Other": "Other",
      "reminderTypes.Email": "Email",
      "reminderTypes.Popup": "Popup",
      "salutationName.Dr.": "Dr.",
      "salutationName.Mr.": "Mr.",
      "salutationName.Mrs.": "Mrs.",
      "salutationName.Ms.": "Ms.",
      "saveConflictResolution.actual": "Actual",
      "saveConflictResolution.current": "Current",
      "saveConflictResolution.original": "Original",
      "searchRanges.allOf": "All Of",
      "searchRanges.any": "Any",
      "searchRanges.anyOf": "Any Of",
      "searchRanges.is": "Is",
      "searchRanges.isEmpty": "Is Empty",
      "searchRanges.isFromTeams": "Is From Team",
      "searchRanges.isNot": "Is Not",
      "searchRanges.isNotEmpty": "Is Not Empty",
      "searchRanges.isNotOneOf": "None Of",
      "searchRanges.isOneOf": "Any Of",
      "searchRanges.noneOf": "None Of",
      "varcharSearchRanges.anyOf": "Any Of",
      "varcharSearchRanges.contains": "Contains",
      "varcharSearchRanges.endsWith": "Ends With",
      "varcharSearchRanges.equals": "Equals",
      "varcharSearchRanges.isEmpty": "Is Empty",
      "varcharSearchRanges.isNotEmpty": "Is Not Empty",
      "varcharSearchRanges.like": "Is Like (%)",
      "varcharSearchRanges.noneOf": "None Of",
      "varcharSearchRanges.notContains": "Not Contains",
      "varcharSearchRanges.notEquals": "Not Equals",
      "varcharSearchRanges.notLike": "Is Not Like (%)",
      "varcharSearchRanges.startsWith": "Starts With",
    },
    presetFilters: {
      all: "All",
      followed: "Followed",
      starred: "Starred",
    },
    reactions: {
      Dislike: "Dislike",
      Laugh: "Laugh",
      Like: "Like",
      Love: "Love",
      Meh: "Meh",
      Sad: "Sad",
      Smile: "Smile",
      Surprise: "Surprise",
    },
    recordActions: {
      create: "Create",
      delete: "Delete",
      edit: "Edit",
      read: "Read",
      stream: "Stream",
    },
    scopeNames: {
      Account: "Account",
      ActionHistoryRecord: "Action History Record",
      Activities: "Activities",
      AddressCountry: "Address Country",
      Admin: "Admin",
      ApiUser: "API User",
      AppLogRecord: "App Log Record",
      AppSecret: "App Secret",
      ArrayValue: "Array Value",
      Attachment: "Attachment",
      AuthenticationProvider: "Authentication Provider",
      AuthFailLogRecord: "Auth Fail Log Record",
      AuthLogRecord: "Auth Log Record",
      AuthToken: "Auth Token",
      Autofollow: "",
      Calendar: "Calendar",
      Call: "Call",
      Campaign: "Campaign",
      CampaignLogRecord: "Campaign Log Record",
      CampaignTrackingUrl: "Tracking URL",
      Case: "Case",
      Contact: "Contact",
      Currency: "Currency",
      Dashboard: "Dashboard",
      DashboardTemplate: "Dashboard Template",
      DashletOptions: "Dashlet Options",
      Document: "Document",
      DocumentFolder: "Document Folder",
      DynamicLogic: "Dynamic Logic",
      Email: "Email",
      EmailAccount: "Personal Email Account",
      EmailAccountScope: "Personal Email Account",
      EmailAddress: "Email Address",
      EmailFilter: "Email Filter",
      EmailFolder: "Email Folder",
      EmailQueueItem: "Email Queue Item",
      EmailTemplate: "Email Template",
      EmailTemplateCategory: "Email Template Categories",
      EntityManager: "Entity Manager",
      Export: "Export",
      Extension: "Extension",
      ExternalAccount: "External Account",
      FieldManager: "Field Manager",
      Formula: "",
      Global: "Global",
      GlobalStream: "Global Stream",
      GroupEmailFolder: "Group Email Folder",
      Import: "Import",
      ImportEml: "",
      ImportError: "Import Error",
      InboundEmail: "Group Email Account",
      Integration: "Integration",
      Job: "Job",
      KnowledgeBaseArticle: "Knowledge Base Article",
      KnowledgeBaseCategory: "Knowledge Base Category",
      LastViewed: "Last Viewed",
      LayoutManager: "Layout Manager",
      LayoutRecord: "",
      LayoutSet: "Layout Set",
      Lead: "Lead",
      LeadCapture: "Lead Capture Entry Point",
      LeadCaptureLogRecord: "Lead Capture Log Record",
      "Mass Action": "Mass Action",
      MassAction: "",
      MassEmail: "Mass Email",
      Meeting: "Meeting",
      Note: "Note",
      Notification: "",
      OAuthAccount: "OAuth Account",
      OAuthProvider: "OAuth Provider",
      Opportunity: "Opportunity",
      OutboundEmail: "Outbound Email",
      PasswordChangeRequest: "Password Change Request",
      PhoneNumber: "Phone Number",
      Portal: "Portal",
      PortalRole: "Portal Role",
      PortalUser: "Portal User",
      Preferences: "Preferences",
      Reminder: "",
      Role: "Role",
      ScheduledJob: "Scheduled Job",
      ScheduledJobLogRecord: "Scheduled Job Log Record",
      Settings: "Settings",
      Stream: "Stream",
      StreamSubscription: "",
      Target: "Target",
      TargetList: "Target List",
      TargetListCategory: "Target List Category",
      Task: "Task",
      Team: "Team",
      Template: "Template",
      UniqueId: "Unique ID",
      User: "User",
      UserData: "",
      UserReaction: "",
      Webhook: "Webhook",
      WebhookEventQueueItem: "Webhook Event Queue Item",
      WebhookQueueItem: "Webhook Queue Item",
      WorkingTimeCalendar: "Working Time Calendar",
      WorkingTimeRange: "Working Time Exception",
    },
    scopeNamesPlural: {
      Account: "Accounts",
      ActionHistoryRecord: "Action History",
      Activities: "Activities",
      AddressCountry: "Address Countries",
      ApiUser: "API Users",
      AppLogRecord: "App Log",
      AppSecret: "App Secrets",
      ArrayValue: "Array Values",
      Attachment: "Attachments",
      AuthenticationProvider: "Authentication Providers",
      AuthFailLogRecord: "Auth Fail Log",
      AuthLogRecord: "Auth Log",
      AuthToken: "Auth Tokens",
      Autofollow: "",
      Calendar: "Calendar",
      Call: "Calls",
      Campaign: "Campaigns",
      CampaignLogRecord: "Campaign Log Records",
      CampaignTrackingUrl: "Tracking URLs",
      Case: "Cases",
      Contact: "Contacts",
      Currency: "Currency",
      Dashboard: "Dashboard",
      DashboardTemplate: "Dashboard Templates",
      Document: "Documents",
      DocumentFolder: "Document Folders",
      Email: "Emails",
      EmailAccount: "Personal Email Accounts",
      EmailAccountScope: "Personal Email Accounts",
      EmailAddress: "Email Addresses",
      EmailFilter: "Email Filters",
      EmailFolder: "Email Folders",
      EmailQueueItem: "Email Queue Items",
      EmailTemplate: "Email Templates",
      EmailTemplateCategory: "Email Template Categories",
      Extension: "Extensions",
      ExternalAccount: "External Accounts",
      GlobalStream: "Global Stream",
      GroupEmailFolder: "Group Email Folders",
      Import: "Import",
      ImportError: "Import Errors",
      InboundEmail: "Group Email Accounts",
      Integration: "Integration",
      Job: "Jobs",
      KnowledgeBaseArticle: "Knowledge Base",
      KnowledgeBaseCategory: "Knowledge Base Categories",
      LastViewed: "Last Viewed",
      LayoutRecord: "",
      LayoutSet: "Layout Sets",
      Lead: "Leads",
      LeadCapture: "Lead Capture",
      LeadCaptureLogRecord: "Lead Capture Log",
      MassEmail: "Mass Emails",
      Meeting: "Meetings",
      Note: "Notes",
      Notification: "",
      OAuthAccount: "OAuth Accounts",
      OAuthProvider: "OAuth Providers",
      Opportunity: "Opportunities",
      OutboundEmail: "Outbound Emails",
      PasswordChangeRequest: "Password Change Requests",
      PhoneNumber: "Phone Numbers",
      Portal: "Portals",
      PortalRole: "Portal Roles",
      PortalUser: "Portal Users",
      Preferences: "Preferences",
      Reminder: "",
      Role: "Roles",
      ScheduledJob: "Scheduled Jobs",
      ScheduledJobLogRecord: "Scheduled Job Log Records",
      Stream: "Stream",
      StreamSubscription: "",
      Target: "Targets",
      TargetList: "Target Lists",
      TargetListCategory: "Target List Categories",
      Task: "Tasks",
      Team: "Teams",
      Template: "Templates",
      UniqueId: "Unique IDs",
      User: "Users",
      UserData: "",
      UserReaction: "",
      Webhook: "Webhooks",
      WebhookEventQueueItem: "Webhook Event Queue Items",
      WebhookQueueItem: "Webhook Queue Items",
      WorkingTimeCalendar: "Working Time Calendars",
      WorkingTimeRange: "Working Time Exceptions",
    },
    streamMessages: {
      assign: "{user} assigned {entityType} {entity} to {assignee}",
      assignMultiAdd: "{user} assigned {entity} to {assignee}",
      assignMultiAddRemove:
        "{user} assigned {entity} to {assignee} and unassigned from {removedAssignee}",
      assignMultiAddRemoveThis:
        "{user} assigned this {entityType} to {assignee} and unassigned from {removedAssignee}",
      assignMultiAddThis: "{user} assigned this {entityType} to {assignee}",
      assignMultiRemove: "{user} unassigned {entity} from {removedAssignee}",
      assignMultiRemoveThis:
        "{user} unassigned this {entityType} from {removedAssignee}",
      assignSelf: "{user} self-assigned {entityType} {entity}",
      assignThis: "{user} assigned this {entityType} to {assignee}",
      assignThisSelf: "{user} self-assigned this {entityType}",
      assignThisVoid: "{user} unassigned this {entityType}",
      assignVoid: "{user} unassigned {entityType} {entity}",
      assignYou: "{user} assigned {entityType} {entity} to you",
      attach: "{user} attached on {entityType} {entity}",
      attachThis: "{user} attached",
      create: "{user} created {entityType} {entity}",
      createAssigned:
        "{user} created {entityType} {entity} assigned to {assignee}",
      createAssignedSelf: "{user} created {entityType} {entity} self-assigned",
      createAssignedThis:
        "{user} created this {entityType} assigned to {assignee}",
      createAssignedThisSelf: "{user} created this {entityType} self-assigned",
      createAssignedYou: "{user} created {entityType} {entity} assigned to you",
      createRelated:
        "{user} created {relatedEntityType} {relatedEntity} related to {entityType} {entity}",
      createRelatedThis:
        "{user} created {relatedEntityType} {relatedEntity} related to this {entityType}",
      createThis: "{user} created this {entityType}",
      emailReceived: "Email received related to {entityType} {entity}",
      emailReceivedFrom:
        "Email received from {from}, related to {entityType} {entity}",
      emailReceivedFromInitial:
        "Email received from {from}, {entityType} {entity} created",
      emailReceivedFromThis: "Email received from {from}",
      emailReceivedInitial: "Email received: {entityType} {entity} created",
      emailReceivedInitialFrom:
        "Email received from {from}, {entityType} {entity} created",
      emailReceivedInitialFromThis:
        "Email received from {from}, this {entityType} created",
      emailReceivedInitialThis: "Email received, this {entityType} created",
      emailReceivedThis: "Email received",
      emailSent: "{by} sent email related to {entityType} {entity}",
      emailSentThis: "{by} sent email",
      eventConfirmationAccepted:
        "{invitee} accepted participation in {entityType} {entity}",
      eventConfirmationAcceptedThis: "{invitee} accepted participation",
      eventConfirmationDeclined:
        "{invitee} declined participation in {entityType} {entity}",
      eventConfirmationDeclinedThis: "{invitee} declined participation",
      eventConfirmationTentative:
        "{invitee} is tentative about participation in {entityType} {entity}",
      eventConfirmationTentativeThis:
        "{invitee} is tentative about participation",
      mentionInPost: "{user} mentioned {mentioned} in {entityType} {entity}",
      mentionInPostTarget: "{user} mentioned {mentioned} in post",
      mentionYouInPost: "{user} mentioned you in {entityType} {entity}",
      mentionYouInPostTarget: "{user} mentioned you in post to {target}",
      mentionYouInPostTargetAll: "{user} mentioned you in post to all",
      mentionYouInPostTargetNoTarget: "{user} mentioned you in post",
      post: "{user} posted on {entityType} {entity}",
      postTarget: "{user} posted to {target}",
      postTargetAll: "{user} posted to all",
      postTargetPortal: "{user} posted to portal {target}",
      postTargetPortals: "{user} posted to portals {target}",
      postTargetSelf: "{user} self-posted",
      postTargetSelfAndOthers: "{user} posted to {target} and themself",
      postTargetTeam: "{user} posted to team {target}",
      postTargetTeams: "{user} posted to teams {target}",
      postTargetYou: "{user} posted to you",
      postTargetYouAndOthers: "{user} posted to {target} and you",
      postThis: "{user} posted",
      relate:
        "{user} linked {relatedEntityType} {relatedEntity} with {entityType} {entity}",
      relateThis:
        "{user} linked {relatedEntityType} {relatedEntity} with this {entityType}",
      status: "{user} updated {field} of {entityType} {entity}",
      statusThis: "{user} updated {field}",
      unrelate:
        "{user} unlinked {relatedEntityType} {relatedEntity} from {entityType} {entity}",
      unrelateThis:
        "{user} unlinked {relatedEntityType} {relatedEntity} from this {entityType}",
      update: "{user} updated {entityType} {entity}",
      updateThis: "{user} updated this {entityType}",
    },
    streamMessagesFemale: {
      postTargetSelfAndOthers: "{user} posted to {target} and herself",
    },
    streamMessagesMale: {
      postTargetSelfAndOthers: "{user} posted to {target} and himself",
    },
    strings: {
      yesterdayShort: "Yest",
    },
    tabs: {
      Stream: "Stream",
    },
    themeNavbars: {
      side: "Side Navbar",
      top: "Top Navbar",
    },
    themes: {
      Dark: "Dark",
      Espo: "Espo",
      EspoRtl: "RTL",
      Glass: "Glass",
      Hazyblue: "Hazyblue",
      Light: "Light",
      Sakura: "Sakura",
      Violet: "Violet",
    },
    wysiwygLabels: {
      align: "Align",
      backgroundColor: "Background Color",
      borderColor: "Border Color",
      borderWidth: "Border Width",
      cell: "Cell",
      cellPadding: "Cell Padding",
      height: "Height",
      verticalAlign: "Vertical Align",
      width: "Width",
    },
    wysiwygOptions: {
      "align.center": "Center",
      "align.left": "Left",
      "align.right": "Right",
      "verticalAlign.bottom": "Bottom",
      "verticalAlign.middle": "Middle",
      "verticalAlign.top": "Top",
    },
  });

  const languages = [
    "English (US)",
    "English (UK)",
    "Español",
    "Français",
    "Deutsch",
    "Italiano",
    "Português",
    "हिन्दी",
  ];

  const leftMenuItems = [
    "Global",
    "Account",
    "Action History Record",
    "Activities",
    "Address Country",
    "Admin",
    "API User",
    "App Log Record",
    "App Secret",
    "Array Value",
    "Attachment",
    "Auth Log Record",
    "Auth Token",
    "Authentication Provider",
    "Autofollow",
    "Calendar",
    "Call",
    "Campaign Log Record",
    "Campaign",
    "Case",
    "Contact",
    "Currency",
    "Dashboard",
    "Dashboard Templates",
    "Dashlet Options",
    "Document Folder",
    "Document",
    "Dynamic Logic",
    "Email Address",
    "Email",
    "Entity Manager",
    "Export",
    "Extension",
    "External Account",
    "Field Manager",
    "Formula",
    "Global Stream",
    "Group Email Account",
    "Group Email Folder",
    "Import",
    "Import Error",
    "ImportEMl",
    "Integration",
    "Job",
    "Knowledge Base Article",
    "Knowledge Base Category",
    "Last Viewed",
    "Layout Set",
    "Layout Manager",
    "Layout Record",
    "Lead Capture Entry Point",
    "Lead Capture Log Record",
    "Lead",
    "Mass Email",
    "Mass Action",
    "Meeting",
    "Note",
    "Notification",
    "OAuth Account",
    "OAuth Provider",
    "Opportunity",
    "Passwordd Change Request",
    "Personal Email Account",
    "Phone Number",
    "Portal Role",
    "Portal User",
    "Portal",
    "Preferences",
    "Reminder",
    "Role",
    "Scheduled Job Log Record",
    "Scheduled Job",
    "Settings",
    "Stream",
    "StreamSubscription",
    "Target List Category",
    "Target List",
    "Task",
    "Team",
    "Template",
    "Tracking URL",
    "Unique ID",
    "UserData",
    "UserReaction",
    "User",
    "Webhook Event Queue Item",
    "Webhook Queue Item",
    "Webhook",
    "Working Time Calendar",
    "Working Time Exception",
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLabelChange = (section, key, value) => {
    setLabels((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const filteredSections = Object.keys(labels).filter(
    (section) =>
      section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.keys(labels[section]).some(
        (key) =>
          key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          labels[section][key].toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const renderLabelSection = (sectionName, sectionData) => {
    const isExpanded = expandedSections[sectionName];

    return (
      <div key={sectionName} className="border-b border-gray-200">
        <div
          className="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection(sectionName)}
        >
          <span className="text-sm font-medium text-gray-700">
            {sectionName}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>

        {isExpanded && (
          <div className="pb-4 space-y-3">
            {Object.entries(sectionData).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-4 px-1">
                <div className="w-32 sm:w-40 md:w-48 text-sm text-gray-600 truncate">
                  {key}
                </div>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleLabelChange(sectionName, key, e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <nav className="text-sm text-gray-500">
              <span className="text-blue-600 cursor-pointer hover:underline">
                Administration
              </span>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Label Manager</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Menu Items */}
        <div className="w-full lg:w-64 xl:w-72 bg-white border-r border-gray-200 lg:min-h-screen">
          <div className="p-4">
            {/* Language Selector */}
            <div className="mb-6">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Menu Items */}
            <div className="space-y-1 max-h-96 lg:max-h-screen lg:overflow-y-auto">
              {leftMenuItems.map((item, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors duration-150 ${
                    item === "Global"
                      ? "text-blue-600 bg-blue-50"
                      : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Label Editor */}
        <div className="flex-1 bg-gray-100">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Global</h2>
              </div>

              <div className="px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-150">
                      Save
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors duration-150">
                      Cancel
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Labels Section */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 space-y-4">
                {filteredSections.map((section) =>
                  renderLabelSection(section, labels[section])
                )}

                {filteredSections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No labels found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelManager;
