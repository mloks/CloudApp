require('../../Juration');
var moment = require('moment');

var validateString = function(value, min, max) {

  if(angular.isString(value)) {

    var result = value.length;
    var min = min || 1;
    var max = max || 255;

    if (result > max) {
      return value.substring(0, max);
    }
    else if (result < min) {
      return false;
    }
    else {
      return String(value);
    }
  }
  else{
    return false;
  }

};

var validateInteger = function(value, min, max) {

  if(angular.isString(value)) {

    var min = min || 0;
    var max = max || 0;
    value = parseInt(value);

    if(isNaN(value)) {
      value = false;
    }

    if(value < min) {
      value = false;
    }

    if(max && value > max) {
      value = false;
    }

    return value;
  }
  else{
    return false;
  }
};

var validateDate = function(value, min, max) {

  if(angular.isString(value)) {

    var min = min || '2000-01-01';
    var max = max || '2099-12-31';
    var result = moment(value, "YYYYMMDD").format("YYYY-MM-DD");

    if (result == 'Invalid date') {
      return false;
    }
    else if (moment(result).isBefore(min)) {
      return false;
    }
     else if (moment(result).isAfter(max)) {
      return false;
    }
    else {
      return result;
    }
  }
  else{
    return false;
  }
};

var durationValue = function(durationString) {
  try {
    return juration.parse(durationString);
  }
  catch (error) {
    return undefined;
  }
};

var dateValue = function(value) {
  return moment(value).format("YYYYMMDD");
};

var FilterMap = {

    'packageinstance': {
      'presence': {
        defaultValue: 'any',
        transform: function(value) {
          return value ? 'atEnd' : 'any';
        }
      }
    },

    'agent': {
      'agentDeviceName': { min: 1, max: 15, validate: validateString },
      'agentVersion': { min: 1, max: 50, validate: validateString },
      'systemTime': { min: 1, max: 50, validate: validateString },

      'minLastSeenDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastSeenDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'minAgentRegistrationDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxAgentRegistrationDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'maxCheckedInCount': { min: 0, max: 999999999, validate: validateInteger },
      'minLastCheckedInDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastCheckedInDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'maxProcessScanCount': { min: 0, max: 999999999, validate: validateInteger },
      'minLastProcessScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastProcessScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'maxMachineScanCount': { min: 0, max: 999999999, validate: validateInteger },
      'minLastMachineScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastMachineScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'maxSoftwareScanCount': { min: 0, max: 999999999, validate: validateInteger },
      'minLastSoftwareScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastSoftwareScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'maxEventsScanCount': { min: 0, max: 999999999, validate: validateInteger },
      'minLastEventsScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastEventsScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },

      'maxUserDataScanCount': { min: 0, max: 999999999, validate: validateInteger },

      'minLastUserDataScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'maxLastUserDataScanDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      }
    },

    'group': {
      'type': {},
      'pageSize': {}
    },

    'user': {
      'userName': { min: 1, max: 256, validate: validateString },
      'userDomain': { min: 1, max: 50, validate: validateString },
      'userBusinessGroup': { min: 1, max: 64, validate: validateString }
    },

    'package': {
      'packageName': { min: 1, max: 200, validate: validateString },
      'packageManufacturer': { min: 1, max: 100, validate: validateString },
      'packageVersion': { min: 1, max: 100, validate: validateString },
      'packageMinInstanceCount': { min: 0, max: 999999999, validate: validateInteger },
      'packageMaxInstanceCount': { min: 0, max: 999999999, validate: validateInteger },
      'packageLicenseType': {},
      'packageSprawlVersion': {},
      'packageVersionLevel': {}
    },

    'device': {
      'deviceName': { min: 1, max: 15, validate: validateString },
      'deviceCollection': { min: 1, max: 100, validate: validateString },
      'deviceManufacturer': { min: 1, max: 50, validate: validateString },
      'deviceModel': { min: 1, max: 50, validate: validateString },
      'deviceChassis': { min: 1, max: 50, validate: validateString },
      'deviceProcessorsCount': { min: 1, max: 128, validate: validateInteger },
      'deviceCoresCount': { min: 1, max: 1024, validate: validateInteger },
      'deviceMinMemory': { min: 0, max: 1024, validate: validateInteger },
      'deviceMaxMemory': { min: 0, max: 1024, validate: validateInteger },
      'osName': { min: 1, max: 100, validate: validateString },
      'osVersion': { min: 1, max: 100, validate: validateString },
      'osSPLevel': { min: 1, max: 50, validate: validateString },
      'deviceMinUsersCount': { min: 0, max: 999999999, validate: validateInteger },
      'deviceMaxUsersCount': { min: 0, max: 999999999, validate: validateInteger },
      'deviceMinBIOSDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'deviceMaxBIOSDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      }
    },

    'usage': {
      'usedTimeInFocusThreshold': {
        min: 0,
        validate: validateString,
        transform: function(value) {
          return durationValue(value);
        }
      },
      'usedMinUsageTimeThreshold': {
        defaultValue: 0,
        min: 0,
        validate: validateString,
        transform: function(value) {
          return durationValue(value);
        }
      },
      'usedMinSessionCountThreshold': {
        defaultValue: 0,
        min: 0,
        max: 999999999,
        validate: validateInteger
      },
      'usageMinDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      },
      'usageMaxDate': {
        min: '2000-01-01',
        max: '2099-12-31',
        validate: validateDate,
        transform: function(value) {
          return dateValue(value);
        }
      }
    }
  };

  module.exports = FilterMap;