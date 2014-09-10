var ngTabBody = function () {
  return {
    scope: false,
    restrict: 'EAC',
    require: '^ngTabs',
    link: function (scope, element, attributes, controller) {
      var index = controller.getTabBodyIndex();

      scope.$watch('tabs.index', function () {
        element.toggleClass(attributes.ngTabBody + ' ng-show', scope.tabs.index === index);
      });
    }
  };
};

module.exports = ngTabBody;