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
    }
  ]);