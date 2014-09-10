require('../components/angular/angular');
require('../components/angular-ui-router/release/angular-ui-router');
require('../components/angular-bootstrap/ui-bootstrap-tpls');
require('./modules/Common');
require('./modules/Admin');
require('./modules/Search');

var main = function ($rootScope, $state) {

  $rootScope.userAccount ={
    authenticated: true
  };

  $rootScope.appState = {
    set: function (mode) {
      $state.transitionTo(mode);
    }
  };

};

main.$inject = ['$rootScope', '$state'];

angular
  .module('main', ['ui.router', 'ui.bootstrap', 'Common', 'Admin', 'Search'])
  .run(['$state', '$rootScope', function ($state, $rootScope) { $state.transitionTo('home'); }])
  .run(main);