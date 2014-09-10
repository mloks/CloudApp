var moment = require('moment');

var Workflow = function($scope, FilterService, FilterSync, _) {

  $scope.globalFilter = FilterSync.getFilterFromCollection('gbl');

  $scope.manage = {
    packageManufacturer: true,
    packageName: true
  };

  $scope.filterReport = {
    packageManufacturer: {},
    packageName: {},
    usageMinDate: {},
    usageMaxDate: {},
    dateRangeDays: 0,
    userBusinessGroup: {},
    deviceCollection: {},
    presence: {}
  };

  var getGlobaFilterChange = function(){
    return FilterSync.getFilterFromCollection('gbl');
  };

  var resetGlobaFilterChange = function() {

    $scope.globalFilter = FilterSync.getFilterFromCollection('gbl');

    if(FilterService.hasValue($scope.globalFilter, 'packageManufacturer')){
      angular.copy($scope.globalFilter.packageManufacturer, $scope.filterReport.packageManufacturer);
      $scope.manage.packageManufacturer = false;
    }
    else{
      $scope.manage.packageManufacturer = true;
    }

    if(FilterService.hasValue($scope.globalFilter, 'packageName')){
      angular.copy($scope.globalFilter.packageName, $scope.filterReport.packageName);
      $scope.manage.packageName = false;
    }
    else{
      $scope.manage.packageName = true;
    }

    $scope.submitFilters();

  };

  $scope.isFilterDefined = function(filterSet) {
    var filterChange = _.find(filterSet, function(filterObject, filterName) {
      if(filterObject.enabled && _.isUndefined(filterObject.value)) { return filterName; }
    });
    return _.isUndefined(filterChange);
  };

  $scope.isFilterMandatoryDefined = function(){
    return angular.isDefined($scope.filterReport.packageManufacturer.value)
      && !FilterService.checkEmpty($scope.filterReport.packageManufacturer.value);
  };

    $scope.resetGlobalFilterByName = function(filterName){
    if(!_.isUndefined(FilterSync.filterCollections.gbl[filterName])){
      FilterSync.filterCollections.gbl[filterName].enabled = false;
    }
  };

  $scope.submitFilters = function(){

    var reportFilterSet = {};

    _.each($scope.filterReport, function(object, key) {
      if(FilterService.hasValue($scope.filterReport, key)){
        var newValue = object.value;
        if(angular.isArray(newValue)){
          newValue = newValue.join(',');
        }
        reportFilterSet[key] = { enabled: true, value: newValue };
      }
    });
    angular.copy(reportFilterSet, $scope.filter);
  };

  $scope.$watch(getGlobaFilterChange, resetGlobaFilterChange, true);
};

Workflow.$inject = ['$scope', 'FilterService', 'FilterSync', '_'];

module.exports = Workflow;