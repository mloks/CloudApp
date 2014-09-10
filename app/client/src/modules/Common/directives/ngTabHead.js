var ngTabHead = function () {
  return {
    scope: false,
    restrict: 'EAC',
    require: '^ngTabs',
    link: function (scope, element, attributes, controller) {
      var index = controller.getTabHeadIndex();
      var value = attributes.ngTabHead;
      var active = /[-*\/%^=!<>&|]/.test(value) ? scope.$eval(value) : !!value;

      scope.tabs.index = scope.tabs.index || ( active ? index : null );

      element.bind('click', function () {
        scope.tabs.index = index;
        scope.$$phase || scope.$apply();
      });

      scope.$watch('tabs.index', function () {
        element.toggleClass('active', scope.tabs.index === index);
      });
    }
  };
};

module.exports = ngTabHead;