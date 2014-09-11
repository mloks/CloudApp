var HeaderController = function($scope, $modal) {

  $scope.hideAlert = true;
  $scope.hideHelp = true;
  $scope.hideLink = true;
  $scope.hideDashboard = true;

  var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  $scope.openDashboard = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'dashboard_modal.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };

};

HeaderController.$inject = ['$scope', '$modal'];

module.exports = HeaderController;