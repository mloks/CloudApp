var goClick = function ($window) {
  return {
    link: function (scope, element, attrs) {
      element.bind('click', function () {
        scope.$apply(function () {
          $window.location.href = attrs.goClick;
        });
      });
    }
  }
};

goClick.$inject = ['$window'];

module.exports = goClick;