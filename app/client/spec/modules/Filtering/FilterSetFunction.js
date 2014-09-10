var _ = require("underscore");
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Standard Filter Set:', function() {

  beforeEach(angular.mock.module('main'));

  describe("comparing two filter sets", function() {

    var filterSet_1 = {

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

    var filterSet_2 = {

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

    beforeEach(inject(['StandardFilterSet', function(service) {
      $testUnit = service;
    }]));

    it("should return an empty object for two identical filter sets", function() {
      var mismatch = $testUnit.matchFilterSet(filterSet_1, filterSet_2, 'device');
      _.isEmpty(mismatch).should.be.ok;
    });

    it("should return an object with one element as a diff between two filter sets", function() {
      delete filterSet_2['deviceName'];
      var mismatch = $testUnit.matchFilterSet(filterSet_1, filterSet_2, 'device');
      mismatch.deviceName.should.equal('deviceName');
    });

  });

});