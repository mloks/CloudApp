var autoFocus = function ($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.autoFocus, function(val) {
      if(val){
        $timeout( function () {
          element[0].focus();
          element[0].select();
        }, 0);
      }
    })
  }
};

autoFocus.$inject = ['$timeout'];

module.exports = autoFocus;