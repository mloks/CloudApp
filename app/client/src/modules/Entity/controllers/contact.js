var ContactController = function($scope, $modalInstance, ApiService, id) {

  $scope.isUpdating = true;
  $scope.entity = {};
  $scope.message = '';

  var getItem = function(itemId){
    ApiService.sendApiRequest('get', '/api/entity/contact/' + itemId, {}).then(
      function (response) {
        $scope.entity = response.data;
        $scope.isUpdating = false;
      }
    );
  };

  var saveItem = function(itemId, item){
    var jsonItem = angular.toJson(item);
    if(angular.isUndefined(itemId)) {
      ApiService.sendApiRequest('post', '/api/entity/contact', jsonItem).then(
        function (response) {
          $scope.message = 'Record saved';
          $scope.isUpdating = false;
        }
      );
    }
    else if(angular.isDefined(itemId)) {
      ApiService.sendApiRequest('put', '/api/entity/contact/' + itemId , jsonItem).then(
        function (response) {
          $scope.message = 'Record updated';
          $scope.isUpdating = false;
        }
      );
    }
  };

  $scope.cancel = function(){
    $modalInstance.dismiss('canceled');
  };

  $scope.save = function(){
    saveItem(id, $scope.entity);
    // $modalInstance.close();
  };

  if(angular.isDefined(id)) {
    getItem(id);
  }

};

ContactController.$inject = ['$scope', '$modalInstance', 'ApiService', 'id'];

module.exports = ContactController;