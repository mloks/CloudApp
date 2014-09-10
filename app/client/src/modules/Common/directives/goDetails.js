var goDetails = function ($window, EntityService) {
  return {
    link: function (scope, element, attrs) {
      element.bind('click', function () {
        scope.$apply(function () {
          EntityService.setItem(attrs.setItem);
          $window.location.href = attrs.goDetails;
        });
      });
    }
  }
};

goDetails.$inject = ['$window', 'EntityService'];

module.exports = goDetails;