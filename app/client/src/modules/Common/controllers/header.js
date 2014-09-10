var HeaderController = function($scope, $modal, MessageService) {

  $scope.hideAlert = true;
  $scope.hideHelp = true;
  $scope.hideLink = true;
  $scope.hideDashboard = true;

  var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  $scope.msgCollection = function(){
    return MessageService.getMessages();
  };

  $scope.countObjects = function() {
    return MessageService.countMessages();
  };

  $scope.alertRemove = function(alertKey) {
    MessageService.deleteMessage(alertKey);
    if(MessageService.countMessages() == 0){
      $scope.hideAlert = true;
    }
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

HeaderController.$inject = ['$scope', '$modal', 'MessageService'];

module.exports = HeaderController;