var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.should();
var expect = chai.expect;
var StandardFilterSet = require('../../../src/modules/Kenobi/StandardFilterSet');

describe('StandardFilterSet', function() {
  var test, query, FilterService;

  beforeEach(function() {

    FilterService = {
      isFilterEnabled: sinon.stub(),
      hasValue: sinon.stub(),
      getFilterMap: sinon.stub()
    };

    test = new StandardFilterSet(FilterService);

  });

  describe('converting filters', function() {

    describe('when no filters are enabled', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({});
      });

      it('should return empty query', function() {
        query.should.deep.equal({});
      });
    });

    describe('filtered by device name', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          "deviceName": {value: 'my device', enabled: true}
        });
      });

      it('should include the device', function() {
        query.should.deep.equal({
          'deviceName': 'my device'
        });
      });
    });

    describe('filtered by package manufacturer', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          'packageManufacturer': {value: 'Acme Inc.', enabled: true}
        });
      });

      it('should include the package manufacturer', function() {
        query.should.deep.equal({
          'packageManufacturer': 'Acme Inc.'
        });
      });
    });

    describe('filtered by package name', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          'packageName': {value: 'Foo', enabled: true}
        });
      });

      it('should include the package name', function() {
        query.should.deep.equal({'packageName': 'Foo'});
      });
    });

    describe('filtered by package version', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          'packageVersion': { value: '1.2.3.4', enabled: true}
        });
      });

      it('should include the package version', function() {
        query.should.deep.equal({'packageVersion': '1.2.3.4'});
      });
    });

    describe('filtered by used', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          type: {value: 'active', enabled: true}
        });
      });

      it('should include the type', function() {
        query.should.deep.equal({
          'type': 'active'
        });
      });
    });

    describe('filtered by unused', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          type: {value: 'inactive', enabled: true}
        });
      });

      it('should include the type', function() {
        query.should.deep.equal({
          'type': 'inactive'
        });
      });
    });

    describe('for no more than 5 hours usage', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          usedMinUsageTimeThreshold: {
            value: '5 hours',
            enabled: true
          }
        });
      });

      it('should convert to seconds', function() {
        query.should.deep.equal({
          usedMinUsageTimeThreshold: 5 * 60 * 60
        });
      });
    });

    describe('for a time period', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          'usageMinDate': {value: new Date('2001-02-03'), enabled: true},
          'usageMaxDate': {value: new Date('2004-05-06'), enabled: true
          }
        });
      });

      it('should supply the time period', function() {
        query.should.deep.equal({
          usageMinDate: '20010203',
          usageMaxDate: '20040506'
        });
      });
    });

    describe('when all time filters are disabled', function() {
      beforeEach(function() {
        query = test.convertToQueryParams({
          'usedMinUsageTimeThreshold': {value: '5 hours', enabled: false},
          'usageMinDate': {value: new Date('2001-02-03'), enabled: false},
          'usageMaxDate': {value: new Date('2004-05-06'), enabled: false}
        });
      });

      it('should supply empty data', function() {
        query.should.deep.equal({});
      });
    });
  });
});