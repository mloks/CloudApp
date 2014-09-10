var validateDuration = function(filterService) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (filterService.durationValue(viewValue) !== undefined) {
          // it is valid
          ctrl.$setValidity('duration', true);
          return viewValue;
        }
        else {
          if(viewValue !== '') {
            ctrl.$setValidity('duration', false);
          }
          return undefined;
        }
      });
    }
  }
};

validateDuration.$inject = ['FilterService'];

module.exports = validateDuration;