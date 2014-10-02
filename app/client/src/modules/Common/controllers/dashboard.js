var DashboardController = function($scope, $http) {

  $scope.result = {};
  $scope.isUpdating = true;

  $http({url: '/api/entity/contact', responseType: 'json', params: {}}).then(
    function (response) {
      $scope.result = response.data;
      $scope.isUpdating = false;
    }
  );

};

DashboardController.$inject = ['$scope', '$http'];

module.exports = DashboardController;