var FilterHelp = {

    'packageinstance': {
      'presence': true
    },

    'agent': {
      'deviceName': true,
      'version': true,
      'systemTime': true,

      'minAgentRegistrationDate': true,
      'maxAgentRegistrationDate': true,

      'minLastSeenDate': true,
      'maxLastSeenDate': true,

      'maxCheckedInCount': true,
      'minLastCheckedInDate': true,
      'maxLastCheckedInDate': true,

      'maxProcessScanCount': true,
      'minLastProcessScanDate': true,
      'maxLastProcessScanDate': true,

      'maxMachineScanCount': true,
      'minLastMachineScanDate': true,
      'maxLastMachineScanDate': true,

      'maxSoftwareScanCount': true,
      'minLastSoftwareScanDate': true,
      'maxLastSoftwareScanDate': true,

      'maxEventsScanCount': true,
      'minLastEventsScanDate': true,
      'maxLastEventsScanDate': true,

      'maxUserDataScanCount': true,
      'minLastUserDataScanDate': true,
      'maxLastUserDataScanDate': true
    },

    'user': {
      'name': true,
      'domain': true,
      'group': true
    },

    'device': {
      'name': true,
      'collection': true,
      'manuf': true,
      'model': true,
      'chassis': true,
      'processors': true,
      'cores': true,
      'minMem': true,
      'maxMem': true,
      'osname': true,
      'osVersion': true,
      'ossp': true,
      'minUser':true,
      'maxUser':true,
      'biosFromdt':true,
      'biosTodt':true
    },

    'package': {
      'Name':true,
      'manuf':true,
      'version':true,
      'minInstance':true,
      'maxInstance':true
    },

    'usage': {
      'frmDate':true,
      'toDate':true,
      'timeInfocus':true
    }
  };

  module.exports = FilterHelp;