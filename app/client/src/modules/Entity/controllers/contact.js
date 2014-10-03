var ContactController = function($scope, $modalInstance, id) {

  console.log('CONTACT ID', id);

  $scope.contact = {};

};

ContactController.$inject = ['$scope', '$modalInstance', 'id'];

module.exports = ContactController;