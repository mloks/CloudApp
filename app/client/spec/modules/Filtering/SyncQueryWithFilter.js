var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Portable Filters Feature:', function() {

  beforeEach(angular.mock.module('main'));

  describe("syncronise Url Query Parameters with filter set", function() {

    var $testUnit, filterSet = {}, fullParamsSet = {

    // User Filters
      'userName': 'Alexm',
      'userDomain': 'CENTRIX_AD',
      'userBusinessGroup': 'Engineering',

    // Package Filters
      'packageName': 'iQ Demo',
      'packageManufacturer': 'Centrix Software',
      'packageVersion': 'V 1.2.3.4',
      'packageMinInstanceCount': '10',
      'packageMaxInstanceCount': '20',

    // Device Filters
      'deviceName': 'ALEXM-PC',
      'deviceManufacturer': 'DELL Inc.',
      'deviceModel': 'DELL Precision 625',
      'deviceChassis': 'Notebook',
      'deviceProcessorsCount': '2',
      'deviceCoresCount': '4',
      'deviceMinMemory': '1',
      'deviceMaxMemory': '16',
      'osName': 'Windows',
      'osVersion': '11.03',
      'osSPLevel': 'SP2',
      'deviceMinUsersCount': '2',
      'deviceMaxUsersCount': '5',
      'deviceMinBIOSDate': '20120205',
      'deviceMaxBIOSDate': '20131124',

    // Usage filter
      'usedTimeInFocusThreshold': '600',
      'usedMinUsageTimeThreshold': '3600',
      'usedMinSessionCountThreshold': '25',
      'usageMinDate': '20110520',
      'usageMaxDate': '20120307'

    };

    beforeEach(inject(['StandardFilterSet', function(service) {
      $testUnit = service;
      $testUnit.syncUrlQueryParams(filterSet, fullParamsSet, true);
    }]));

    it("should return a number of user enabled filters", function() {
      var countUser = $testUnit.checkEnabledFilters('user', filterSet);
      countUser.should.equal(3);
    });

    it("should return a number of package enabled filters", function() {
      var countPackage = $testUnit.checkEnabledFilters('package', filterSet);
      countPackage.should.equal(5);
    });

    it("should return a number of device enabled filters", function() {
      var countDevice =  $testUnit.checkEnabledFilters('device', filterSet);
      countDevice.should.equal(15);
    });

    it("should return a number of usage enabled filters", function() {
      var countUsage =  $testUnit.checkEnabledFilters('usage', filterSet);
      countUsage.should.equal(5);
    });

  });

  describe("validate Url Query Parameters", function() {

    var $testUnit, filterSet = {}, checkParamsSet = {

    // User Filters
      'userName': 'Alexm',
      'userDomain': 'CENTRIX_AD',
      'userBusinessGroup': 'Engineering',

    // Package Filters
      'packageName': 'iQ Demo',
      'packageManufacturer': 'Centrix Software',
      'packageVersion': 'V 1.2.3.4',
      'packageMinInstanceCount': '10',
      'packageMaxInstanceCount': '20',

    // Device Filters
      'deviceName': 'ALEXM-PC-THIS-NAME-IS-TOO-LONG',
      'deviceManufacturer': 'DELL Inc.',
      'deviceModel': 'DELL Precision 625',
      'deviceChassis': 'Notebook',
      'deviceProcessorsCount': '-1',
      'deviceCoresCount': '1025',
      'deviceMinMemory': '10-test',
      'deviceMaxMemory': '16',
      'osName': 'Windows',
      'osVersion': '11.03',
      'osSPLevel': 'SP2',
      'deviceMinUsersCount': '2',
      'deviceMaxUsersCount': '5',
      'deviceMinBIOSDate': '20122005',
      'deviceMaxBIOSDate': '20130101',

    // Usage filter
      'usedTimeInFocusThreshold': '',
      'usedMinUsageTimeThreshold': '3600',
      'usedMinSessionCountThreshold': '25',
      'usageMinDate': '20112020',
      'usageMaxDate': '20120307-Hello'
    };

    beforeEach(inject(['StandardFilterSet', function(service) {
      $testUnit = service;
      $testUnit.syncUrlQueryParams(filterSet, checkParamsSet, true);
    }]));

    it("should return a number of user enabled filters", function() {
      var countUser = $testUnit.checkEnabledFilters('user', filterSet);
      countUser.should.equal(3);
    });

     it("should return a number of package enabled filters", function() {
      var countPackage = $testUnit.checkEnabledFilters('package', filterSet);
      countPackage.should.equal(5);
    });

    it("should return a number of device enabled filters", function() {
      var countDevice = $testUnit.checkEnabledFilters('device', filterSet);
      countDevice.should.equal(12);
    });

    it("should cut a long device name to 15 charcacters only", function() {
      filterSet.deviceName.value.should.equal('ALEXM-PC-THIS-N');
    });

    it("should remove non-digits and transform a string to integer", function() {
      filterSet.deviceMinMemory.value.should.equal(10);
    });

    it("should return a number of usage enabled filters", function() {
      var countUsage = $testUnit.checkEnabledFilters('usage', filterSet);
      countUsage.should.equal(3);
    });

    it("should remove non-digits and transform a string to date", function() {
      filterSet.usageMaxDate.value.should.equal('2012-03-07');
    });

    it("should not set empty used Time In Focus Threshold filter", function() {
      var filterEnabled = $testUnit.FilterService.isFilterEnabled(filterSet,'usedTimeInFocusThreshold');
      filterEnabled.should.not.be.ok;
    });

    it("should set used Min Usage Time Threshold filter and convert it to string", function() {
      filterSet.usedMinUsageTimeThreshold.value.should.equal('3600');
    });

  });

});