require('jquery-browserify');

var infoGraphic = function($parse) {
  return {
    scope: false,
    restrict: "E",
    replace: true,
    transclude: true,
    template: "<div><object type='image/svg+xml' class='ng-hide' height='100%' width='100%' data></object><div ng-transclude></div></div>",
    link: function(scope, element, attrs, ctrl) {
      var obj = element.children().eq(0);
      scope.$watch('trend', function(){
        obj.addClass("ng-hide");
        obj.attr("data", attrs.href);
        obj.removeClass("ng-hide");
        console.log('WATCH TREND', scope.trend);
      });
    }
  }
};

infoGraphic.$inject = ['$parse'];

module.exports = infoGraphic;