var _ = require('underscore');

var retrieveData = function (inputArray, paramName){
  var result = [];
  if(inputArray.length) {
    result = _.map(inputArray, function(inputItem) {
      if(!_.isUndefined(inputItem[paramName])){
        return inputItem[paramName];
      }
    });
  }
  return result;
};

var EntityService = function(KenobiService, filteredKenobi, timeout) {
  this.KenobiService = KenobiService;
  this.filteredKenobi = filteredKenobi;
  this.timeout = timeout;
  this.currentItem = {};
};

EntityService.$inject = ['KenobiService', 'filteredKenobi','$timeout'];

EntityService.prototype.setItem = function(item){
  this.currentItem = item;
};

EntityService.prototype.getItem = function(){
  return this.currentItem.usage;
};

EntityService.prototype.startSync = function(scope, entity, dataPoints){
  var self = this;
  scope.metrics = {};
  scope.trend = {};
  this.timeout(function(){
    var stopSync = self.filteredKenobi.syncTrend(scope.filterChanges, self.KenobiService.getEntityMetricsFactory(entity, dataPoints), scope)
    .onValue(function(result) {
      if(dataPoints) {
        scope.trend = retrieveData(result.members, 'usage');
      }
      else{
        scope.metrics = (result.members.length) ? result.members[0] : {};
      }
    });

  scope.$on('$destroy', function() {
    stopSync();
  });
  }, 0);
};

EntityService.prototype.getEntityDetails = function(scope, requestUri){
  var self = this;
  scope.content = {};
  this.timeout(function(){
    var stopSync = self.filteredKenobi.syncTrend(scope.filterChanges, self.KenobiService.getEntityRequest(requestUri), scope)
    .onValue(function(result) {
      scope.content = (result) ? result : {};
      scope.filterSet = true;
    });

  scope.$on('$destroy', function() {
    stopSync();
  });
  }, 0);
};

EntityService.prototype.setUserFilter = function(scope, user){
  scope.filter.userName = { value: user.name, enabled: true };
  scope.filter.userDomain = { value: user.domain, enabled: true };
};

EntityService.prototype.setDeviceFilter = function(scope, device){
  scope.filter.deviceName = { value: device.name, enabled: true };
};

EntityService.prototype.setPackageFilter = function(scope, package){
  scope.filter.packageManufacturer = { value: package.manufacturer, enabled: true };
  scope.filter.packageName = { value: package.name, enabled: true };
  scope.filter.packageVersion = { value: package.version, enabled: true };
};

EntityService.prototype.setPackageBundleFilter = function(scope, packageBundle){
  scope.filter.packageManufacturer = { value: packageBundle.manufacturer, enabled: true };
  scope.filter.packageName = { value: packageBundle.name, enabled: true };
};

EntityService.prototype.setPackageInstanceFilter = function(scope, packageInstance){
  scope.filter.deviceName = { value: packageInstance.device.name, enabled: true };
  scope.filter.packageManufacturer = { value: packageInstance.package.manufacturer, enabled: true };
  scope.filter.packageName = { value: packageInstance.package.name, enabled: true };
  scope.filter.packageVersion = { value: packageInstance.package.version, enabled: true };
};

module.exports = EntityService;
