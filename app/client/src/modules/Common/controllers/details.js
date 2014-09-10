var DetailsController = function($scope, $stateParams, EntityService, entitySelfUri, _) {

  $scope.content = {};
  $scope.metrics = {};
  $scope.member = {};
  $scope.showChart = {};
  $scope.filterSet = false;

  var entityItem = angular.fromJson(EntityService.getItem());

  if(_.isEmpty(entityItem)) {
    var entityUri = entitySelfUri($stateParams.ref);
    EntityService.getEntityDetails($scope, entityUri);
  }
  else{
    $scope.content = entityItem;
    $scope.filterSet = true;
  }

};

DetailsController.$inject = ['$scope', '$stateParams', 'EntityService', 'entitySelfUri', '_'];

module.exports = DetailsController;