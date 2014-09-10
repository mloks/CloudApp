angular.module('Search', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('search', {
          url: "/search",
          views: {
            'header': {
              templateUrl: 'views/help/search.html'
            },
            'content': {
              templateUrl: 'views/content/search.html'
            }
          }
        })
    }
  ]);