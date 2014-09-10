var sinon = require('sinon');
var Bacon = require('baconjs').Bacon;
var chai = require('chai');
chai.should();
var Filters = require('../../../src/modules/Filtering/Filters');

describe('Filters', function() {
  var scope;
  var lastChange;
  var defaultFilter = {};
  var setLocalFilter;

  beforeEach(function() {
    scope = {
      $watch: function(watchExpression, listener, objectEquality) {
        watchExpression.should.equal('filter');
        objectEquality.should.be.ok;
        setLocalFilter = listener;
        return function() {
        };
      },
      appState: {
        set: sinon.stub(),
        setFilter: sinon.stub()
      }
    };
  });

  describe('with a parent scope having a filter', function() {
    var parentScope;
    var parentInitialFilter = {inheritedA: {value: 'parent', enabled: true}};
    var setParentFilter;

    beforeEach(function() {
      parentScope = {filterChanges: new Bacon.Bus()};
      setParentFilter = parentScope.filterChanges.push;
      scope.$parent = parentScope;
      new Filters(scope);

      scope.filterChanges.onValue(function(newValue) {
        lastChange = newValue;
      });

      setParentFilter(parentInitialFilter);
    });

    it('should publish the parent filter', function() {
      lastChange.should.deep.equal({inheritedA: {value: 'parent', enabled: true}});
    });

    it('should say it has no local filter', function() {
      scope.hasLocalFilter.should.not.be.ok;
    });

    describe('and local filter changes', function() {
      beforeEach(function() {
        setLocalFilter({local: {value: 1, enabled: true}});
      });

      it('should publish the combined parent and local filter', function() {
        lastChange.should.deep.equal({
          local: {value: 1, enabled: true},
          inheritedA: {value: 'parent', enabled: true}
        });
      });

      it('should say it has a local filter', function() {
        scope.hasLocalFilter.should.be.ok;
      });
    });

    describe('and a local filter is added', function() {
      beforeEach(function() {
        scope.addFilter('local', 1);
        setLocalFilter(scope.filter);
      });

      it('should publish the combined parent and local filter', function() {
        lastChange.should.deep.equal({
          local: {value: 1, enabled: true},
          inheritedA: {value: 'parent', enabled: true}
        });
      });

      describe('and removed again', function() {
        beforeEach(function() {
          scope.removeFilter('local');
          setLocalFilter(scope.filter);
        });

        it('should say it has no local filter', function() {
          scope.hasLocalFilter.should.not.be.ok;
        });
      });

    });

    describe('and local filter overrides value from parent', function() {
      beforeEach(function() {
        setLocalFilter({inheritedA: {value: 'overridden', enabled: true}});
      });

      it('should publish the overridden value', function() {
        lastChange.should.deep.equal({inheritedA: {value: 'overridden', enabled: true}});
      });

      describe('and parent filter changes the overridden value', function() {
        beforeEach(function() {
          setParentFilter({inheritedA: {value: 'parent 2', enabled: true}});
        });

        it('should still publish the overridden value', function() {
          lastChange.should.deep.equal({inheritedA: {value: 'overridden', enabled: true}});
        });
      });
    });

    describe('and parent filter changes', function() {
      beforeEach(function() {
        setParentFilter({inheritedA: {value: 'parent 2', enabled: true}});
      });

      it('should publish the overridden value', function() {
        lastChange.should.deep.equal({inheritedA: {value: 'parent 2', enabled: true}});
      });
    });
  });

  describe('with a subscriber', function() {
    beforeEach(function() {
      new Filters(scope);

      scope.filterChanges.onValue(function(newValue) {
        lastChange = newValue;
      });
    });

    it('should publish the first value', function() {
      lastChange.should.deep.equal(defaultFilter);
    });

    describe('and the filter changes', function() {
      var value2 = {local: {value: 2, enabled: true}};

      beforeEach(function() {
        setLocalFilter(value2, defaultFilter);
      });

      it('should publish the second value', function() {
        lastChange.should.deep.equal(value2);
      });

      describe('twice', function() {
        var value3 = {local: {value: 3, enabled: true}};

        beforeEach(function() {
          setLocalFilter(value3, value2);
        });

        it('should publish the new value', function() {
          lastChange.should.deep.equal(value3);
        });
      });
    });
  });
});
