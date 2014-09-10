var Selection = function($scope, _) {
  var selection = {};
  $scope.selection = selection;

  selection.members = {};
  selection.show = false;
  selection.showSelectAll = true;

  selection.showSet = function() {
    selection.show = (selection.show) ? false : true;
  };

  selection.count = function() {
    return _.size(selection.members);
  };

  function getKey(object) {
    return angular.toJson(object);
  }

  selection.isSelected = function(object) {
    return selection.members.hasOwnProperty(getKey(object));
  };

  selection.remove = function(object) {
    delete selection.members[getKey(object)];
  };

  selection.toggle = function(object) {
    if (selection.isSelected(object)) {
      selection.remove(object);
    }
    else {
      selection.add(object);
    }
  };

  selection.add = function(object) {
    selection.members[getKey(object)] = object;
  };

  selection.addRange = function(collection) {
    angular.forEach(collection, function(object) {
      selection.add(object);
    });
  };

  selection.removeRange = function(collection) {
    angular.forEach(collection, function(object) {
      selection.remove(object);
    });
  }

  selection.selectAll = function(list) {
    selection.addRange(list.page.members);
  }

  selection.clear = function() {
    selection.removeRange(selection.members);
  }

  selection.toggleSelectAll = function(list) {
    if (selection.count() < list.page.size) {
      selection.selectAll(list);
    } else {
      selection.clear();
    }
  }

};

Selection.$inject = ['$scope', '_'];

module.exports = Selection;