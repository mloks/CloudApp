require('../components/angular/angular');
require('../components/angular-ui-router/release/angular-ui-router');
require('../components/angular-bootstrap/ui-bootstrap-tpls');
require('../components/ng-table/ng-table');
require('./modules/Common');
require('./modules/Admin');
require('./modules/Search');
require('./modules/Entity');

var main = function ($rootScope, $state, $modal) {

  $rootScope.userAccount ={
    authenticated: true
  };

  $rootScope.appState = {
    set: function (mode) {
      $state.transitionTo(mode);
    }
  };

  $rootScope.openContact = function (entityId) {

    var modalInstance = $modal.open({
      templateUrl: '/ui/views/modal/contact.html',
      controller: 'ContactEdit',
      size: 'lg',
      resolve: {
        id: function () {
          return entityId;
        }
      }
    });

  };

};

main.$inject = ['$rootScope', '$state', '$modal'];

angular
  .module('main', ['ui.router', 'ui.bootstrap', 'ngTable', 'Common', 'Admin', 'Search','Entity'])
  .run(['$state', '$rootScope', function ($state, $rootScope) { $state.transitionTo('home'); }])
  .run(main);