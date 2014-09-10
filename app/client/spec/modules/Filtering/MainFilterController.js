var _ = require("underscore");
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Main Filter Controller: ', function() {

  beforeEach(angular.mock.module('main'));

  describe("testing functionality: ", function() {

    var Filters, FilterMain, scope;

    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      Filters = $controller('Filters', { '$scope': scope });
      FilterMain = $controller('FilterMain', { '$scope': scope });
    }));

    it("main filter scope ID should be set to 'gbl'", function() {
      expect(scope.filterId).to.be.equal('gbl');
    });

  });

});