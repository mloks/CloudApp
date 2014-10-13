var ContactController = function($scope, $modalInstance, ApiService, id) {

  $scope.isUpdating = true;
  $scope.entity = { status: 'Active' };
  $scope.message = '';
  $scope.itemId = id;

  var getItem = function() {
    ApiService.sendApiRequest('get', '/api/entity/contact/' + $scope.itemId, {}).then(
      function (response) {
        $scope.entity = response.data;
        $scope.isUpdating = false;
      }
    );
  };

  var addMetaData = function(){

    if(angular.isUndefined($scope.entity.update)){
      $scope.entity.update = [];
    }

    $scope.entity.update.push({author:'', date: new Date()});
  }

  var addItem = function(item){

    addMetaData();
    var jsonItem = angular.toJson(item);
    ApiService.sendApiRequest('post', '/api/entity/contact', jsonItem).then(
      function (response) {
        $scope.message = 'Record saved';
        $scope.isUpdating = false;
      }
    );
  };

  var updateItem = function(item){
    addMetaData();
    var jsonItem = angular.toJson(item);
    ApiService.sendApiRequest('put', '/api/entity/contact/' + $scope.itemId , jsonItem).then(
      function (response) {
        $scope.message = 'Record updated';
        $scope.isUpdating = false;
      }
    );
  };

  $scope.cancel = function(){
    $modalInstance.dismiss('canceled');
  };

  $scope.saveEntity = function(){
    if(angular.isDefined($scope.itemId)) {
      updateItem($scope.entity);
    }
    else if(angular.isUndefined($scope.itemId)) {
      addItem($scope.entity);
    }
    // $modalInstance.close();
  };

  $scope.deleteEntity = function(){
    $scope.entity.status = "Delete";
    updateItem($scope.entity);
    // $modalInstance.close();
  };

  if(angular.isDefined($scope.itemId)) {
    getItem();
  }

};

ContactController.$inject = ['$scope', '$modalInstance', 'ApiService', 'id'];

module.exports = ContactController;