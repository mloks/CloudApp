var Bacon = require('baconjs').Bacon;

module.exports = function(requests) {

  var CombinedRequest = function($scope, kenobi, ajax, $q, filteredKenobi) {

    var resetResult = function(){
      angular.forEach(requests, function(item) {
        $scope[item.varname] = '';
      });
    };

    var onDirty = function() { $scope.isRequesting = true; };

    var responses = requests.map(function(request) {

      var uri = (angular.isDefined(request.uri)) ? request.uri : '/';
      var filtered = (angular.isDefined(request.filtered)) ? request.filtered : true;
      var paramsAdd = (angular.isDefined(request.params)) ? request.params : {};
      var paramsRemove = (angular.isDefined(request.paramsRemove)) ? request.paramsRemove : [];

      var createRequest= function(filter){
        return kenobi.apiRequestWithFilter(uri, filter, paramsAdd, filtered, paramsRemove);
      };

      var baconPromise = filteredKenobi.syncTrendWithDirty($scope.filterChanges, createRequest, onDirty, function(){});
      return baconPromise;
    });

    Bacon.zipAsArray(responses).onValue(function(result){
      var index = 0;
      resetResult();
      angular.forEach(requests, function(item) {
        $scope[item.varname] = result[index++];
      });
      $scope.isRequesting = false;
    });

    resetResult();
  };

  CombinedRequest.$inject = ['$scope', 'KenobiService', 'ajax', '$q', 'filteredKenobi'];

  return CombinedRequest;
};