var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Convert Filter Set to Query Params:', function() {

  beforeEach(angular.mock.module('main'));

  describe("count enabled filters", function() {

    var enabledFilterSet = {

      'deviceName': {
        value: 'ALEXM-PC',
        enabled: true
      },

      'deviceManufacturer': {
       value: 'DELL Inc.',
        enabled: true
      },

      'deviceModel': {
        value: 'DELL Precision 625',
        enabled: true
      }

    };

    beforeEach(inject(['StandardFilterSet', function($test) {
      result = $test.checkEnabledFilters('device', enabledFilterSet);
    }]));

    it("should return a number of enabled filters", function() {
      result.should.equal(3);
    });

  });

  describe("converting to Query Params", function() {

    var result, filterSet = require('./TestFilterSet.js');

    beforeEach(inject(['StandardFilterSet', function($test) {
      result = $test.convertToQueryParams(filterSet);
    }]));

  // User Filter Set
    it("should include the user Name", function() {
      result.userName.should.equal('Alexm');
    });

    it("should include the user Domain name", function() {
      result.userDomain.should.equal('CENTRIX_AD');
    });

    it("should include the user Business group", function() {
      result.userBusinessGroup.should.equal('Engineering');
    });

  // Package Filter Set
    it("should include the package Name", function() {
      result.packageName.should.equal('iQ Demo');
    });

    it("should include the package Manufacturer name", function() {
      result.packageManufacturer.should.equal('Centrix Software');
    });

    it("should include the user package Version", function() {
      result.packageVersion.should.equal('V 1.2.3.4');
    });

    it("should include the package Min Instance Count", function() {
      result.packageMinInstanceCount.should.equal(10);
    });

    it("should include the package Max Instance Count", function() {
      result.packageMaxInstanceCount.should.equal(20);
    });

  // Device Filter Set
    it("should include the device Name", function() {
      result.deviceName.should.equal('ALEXM-PC');
    });

    it("should include the device Manufacturer", function() {
      result.deviceManufacturer.should.equal('DELL Inc.');
    });

    it("should include the user device Model", function() {
      result.deviceModel.should.equal('DELL Precision 625');
    });

    it("should include the device Chassis", function() {
      result.deviceChassis.should.equal('Notebook');
    });

    it("should include the device Processors Count", function() {
      result.deviceProcessorsCount.should.equal(2);
    });

    it("should include the device Cores Count", function() {
      result.deviceCoresCount.should.equal(4);
    });

    it("should include the device Min Memory", function() {
      result.deviceMinMemory.should.equal(1);
    });

    it("should include the device Max Memory", function() {
      result.deviceMaxMemory.should.equal(16);
    });

    it("should include the device OS Name", function() {
      result.osName.should.equal('Windows');
    });

    it("should include the device OS Version", function() {
      result.osVersion.should.equal('11.03');
    });

    it("should include the OS SP Level", function() {
      result.osSPLevel.should.equal('SP2');
    });

    it("should include the device Min Users Count", function() {
      result.deviceMinUsersCount.should.equal(2);
    });

    it("should include the device Max Users Count", function() {
      result.deviceMaxUsersCount.should.equal(5);
    });

    it("should include the device Min BIOS Date", function() {
      result.deviceMinBIOSDate.should.equal('20120205');
    });

    it("should include the device Max BIOS Date", function() {
      result.deviceMaxBIOSDate.should.equal('20131124');
    });

  // Usage Filter Set
    it("should include the used Time In Focus Threshold", function() {
      result.usedTimeInFocusThreshold.should.equal(720);
    });

    it("should include the used Min Usage Time Threshold", function() {
      result.usedMinUsageTimeThreshold.should.equal(3600);
    });

    it("should include the used Min Session Count Threshold", function() {
      result.usedMinSessionCountThreshold.should.equal(25);
    });

    it("should include the usage Min Date", function() {
      result.usageMinDate.should.equal('20110520');
    });

    it("should include the usage Max Date", function() {
      result.usageMaxDate.should.equal('20120307');
    });

  });

});