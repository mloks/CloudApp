var Bacon = require('baconjs').Bacon;

module.exports = function(uri, trend, filtered) {

  var TrendData = function($scope, kenobi, filteredKenobi) {

    $scope[trend] = [];
    $scope.count = -1;

    $scope.clearList = function(){
      $scope[trend] = [];
      $scope.count = -1;
    };

    function displayResults(result) {
      if(result.count) {
        $scope[trend] = result.members;
        $scope.count = result.count;
      }
    }

    var trendChanges = new Bacon.Bus();

    function resetView() {
      trendChanges.push(null);
    }

    $scope.clearList();
    $scope.filterChanges.onValue(resetView);

    var stopSync = filteredKenobi
      .syncList($scope.filterChanges,
        kenobi.getTrendDataRequest(uri, filtered),
        trendChanges.toProperty(null),
        $scope)
      .onValue(displayResults);

    $scope.$on('$destroy', function() {
      stopSync();
    });
  };

  TrendData.$inject = ['$scope', 'KenobiService', 'filteredKenobi'];

  return TrendData;
};