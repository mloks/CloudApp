var ListController = function($scope, ApiService) {

  $scope.result = {};
  $scope.isUpdating = true;

  var getList = function(){
    ApiService.sendApiRequest('get', '/api/entity/contact', {}).then(
      function (response) {
        $scope.result = response.data;
        $scope.isUpdating = false;
      }
    );
  };

  $scope.createItem = function(id){
    console.log('UPDATE REQUEST FOR ', id);
    var myUpdate = { 'hello': "hallo"};
    ApiService.sendApiRequest('post', '/api/entity/contact/' + id, myUpdate).then(
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