var ListController = function($scope, ApiService) {

  $scope.result = {};
  $scope.isUpdating = true;

  var getList = function(){
    ApiService.sendApiRequest('get', '/api/crm/list', {}).then(
      function (response) {
        $scope.result = response.data;
        $scope.isUpdating = false;
      }
    );
  };

 getList();

};

ListController.$inject = ['$scope', 'ApiService'];

module.exports = ListController;