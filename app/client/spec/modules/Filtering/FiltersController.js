var _ = require("underscore");
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Filter Controllers: ', function() {

  beforeEach(angular.mock.module('main'));

  describe("testing functionality: ", function() {

    var Filters, scope;

    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      Filters = $controller('Filters', { '$scope': scope });
    }));

    it("new filter should be added", function() {
      scope.addFilter('testFilter', 'testValue')
      expect(scope.filter.testFilter).to.be.defined;
      expect(scope.filter.testFilter).to.have.property('value', 'testValue');
      expect(scope.filter.testFilter.enabled).to.be.true;
    });

    it("new filter should be added", function() {
      scope.addFilter('testFilter', 'testValue');
      expect(scope.filter.testFilter).to.be.defined;
      expect(scope.filter.testFilter).to.have.property('value', 'testValue');
      expect(scope.filter.testFilter.enabled).to.be.true;
    });

    it("filter should be disabled", function() {
      scope.addFilter('testFilter', 'testValue');
      scope.disableFilter('testFilter');
      expect(scope.filter.testFilter.enabled).not.to.be.true;
    });

  });

});