angular.module('Admin', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: "/",
          views: {
            'header': {
              templateUrl: 'views/help/home.html'
            },
            'content': {
              templateUrl: 'views/content/home.html'
            }
          }
        })
        .state('list', {
          url: "/list",
          views: {
            'header': {
              templateUrl: 'views/help/list.html'
            },
            'content': {
              templateUrl: 'views/content/list.html'
            }
          }
        })
    }
  ]);