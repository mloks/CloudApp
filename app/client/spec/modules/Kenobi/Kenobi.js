require('chai').should();
var sinon = require('sinon');
var moment = require('moment');
var Kenobi = require('../../../src/modules/Kenobi/Kenobi');

describe('Kenobi', function() {
  var test;
  var request;
  var filter = {some: 'filter'};
  var queryParams = {query: 'params'};

  beforeEach(function() {
    var standardFilterSet = {convertToQueryParams: sinon.stub()};
    standardFilterSet.convertToQueryParams.withArgs(filter).returns(queryParams);
    test = new Kenobi('http://my.server', standardFilterSet);
  });

  describe('creating a devices request', function() {
    beforeEach(function() {
      request = test.getDevicesRequest(filter);
    });

    it('should request JSON', function() {
      request.responseType.should.equal('json');
    });

    it('should use the devices URI', function() {
      request.url.should.equal('http://my.server/devices');
    });

    it('should supply query parameters from filter', function() {
      request.params.should.deep.equal(queryParams);
    });
  });

  describe('creating a devices count request', function() {
    beforeEach(function() {
      request = test.getDevicesCountRequest(filter);
    });

    it('should request JSON', function() {
      request.responseType.should.equal('json');
    });

    it('should use the devices URI', function() {
      request.url.should.equal('http://my.server/devices');
    });

    it('should supply query parameters from filter', function() {
      request.params.should.deep.equal(queryParams);
    });

    it('should ask for 0 results', function() {
      request.params.pageSize.should.equal(0);
    });
  });

  describe('creating a users request', function() {
    beforeEach(function() {
      request = test.getUsersRequest(filter);
    });

    it('should request JSON', function() {
      request.responseType.should.equal('json');
    });

    it('should use the users URI', function() {
      request.url.should.equal('http://my.server/users');
    });

    it('should supply query parameters from filter', function() {
      request.params.should.deep.equal(queryParams);
    });
  });

  describe('creating a packages request', function() {
    beforeEach(function() {
      request = test.getPackagesRequest(filter);
    });

    it('should request JSON', function() {
      request.responseType.should.equal('json');
    });

    it('should use the users URI', function() {
      request.url.should.equal('http://my.server/packages');
    });

    it('should supply query parameters from filter', function() {
      request.params.should.deep.equal(queryParams);
    });
  });

  describe('creating a package instances request', function() {
    beforeEach(function() {
      request = test.getPackageInstancesRequest(filter);
    });

    it('should request JSON', function() {
      request.responseType.should.equal('json');
    });

    it('should use the package instances URI', function() {
      request.url.should.equal('http://my.server/packageInstances');
    });

    it('should supply query parameters from filter', function() {
      request.params.should.deep.equal(queryParams);
    });
  });
});
