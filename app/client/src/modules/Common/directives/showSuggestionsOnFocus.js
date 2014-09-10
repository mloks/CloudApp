var showSuggestionsOnFocus = function () {
  return {
    require: 'ngModel',
    link: function (originalScope, element, attrs, modelCtrl) {
      element.bind('focus', function (ev) {
        if (typeof(modelCtrl.$viewValue) === 'undefined')
          modelCtrl.$setViewValue(' ');
        else
          modelCtrl.$setViewValue(modelCtrl.$viewValue);
      });
    }
  }
};

module.exports = showSuggestionsOnFocus;