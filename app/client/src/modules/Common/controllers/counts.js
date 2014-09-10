module.exports = function(entity) {

  var CountsController = function($scope, $http, appConfig) {

    $scope.result = {};
    $scope.isUpdating = true;

    appConfig.then(function (response) {
      var kenobiUri = response.kenobi.Uri;
      $http({url: kenobiUri + '/' + entity, responseType: 'json', params: { pageSize: 0 }})
        .then(function (response) {
          $scope.result = response.data;
          $scope.isUpdating = false;
        });

    });

  };

  CountsController.$inject = ['$scope', '$http', 'appConfig'];

  return CountsController;
};