var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.should();
var expect = chai.expect;
var Bacon = require('baconjs').Bacon;

var FilteredList = require('../../../src/modules/Estate/FilteredList')('getFooRequest');

describe('FilteredList', function() {

  describe('when the filter changes, triggering new results', function() {
    var scope;
    var newResults = {
      "count": 299,
      "members": [
        {},
        {},
        {}
      ],
      "start": 261,
      "pageSize": 20,
      "links": [
        { "rel": "first", "href": "link to first" },
        { "rel": "prev", "href": "link to prev" },
        { "rel": "self", "href": "link to self" },
        { "rel": "next", "href": "link to next" },
        { "rel": "last", "href": "link to last" }
      ]
    };
    var kenobi;
    var filteredKenobi;

    beforeEach(function() {
      scope = {
        $apply: function(f) {
          f(scope);
        },
        $on: function() {
        },
        filterChanges: new Bacon.Property(),
        addFilter: sinon.stub()
      };

      kenobi = {
        getFooRequest: sinon.stub()
      };

      filteredKenobi = {
        syncList: sinon.stub()
          .withArgs(scope.filterChanges, kenobi.getFooRequest)
          .returns(Bacon.once(newResults))
      };
    });

    describe('always', function() {
      beforeEach(function() {
        new FilteredList(scope, kenobi, filteredKenobi);
      });

      it('should set the count in the scope', function() {
        scope.list.count.should.equal(newResults.count);
      });

      it('should set the members in the scope', function() {
        scope.list.page.members.should.deep.equal(newResults.members);
      });

      it('should set the start in the scope', function() {
        scope.list.page.start.should.equal(newResults.start);
      });

      it('should have a first page', function() {
        scope.list.page.first.should.equal('link to first');
      });

      it('should have a prev page', function() {
        scope.list.page.prev.should.equal('link to prev');
      });

      it('should have a next page', function() {
        scope.list.page.next.should.equal('link to next');
      });

      it('should have a last page', function() {
        scope.list.page.last.should.equal('link to last');
      });

    });

    describe('when the app state has a filter to apply', function() {
      beforeEach(function() {
        scope.filter = {};
        scope.appState = {
          activeFilter: {
            some: 'filter'
          }
        };

        new FilteredList(scope, kenobi, filteredKenobi);
      });

      it('should apply the filter', function() {
        scope.filter.should.deep.equal({some: 'filter'});
      });

      it('should remove the filter from the app state', function() {
        expect(scope.appState.activeFilter).to.not.be.ok;
      });
    });
  });
});