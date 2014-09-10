var validateManufacturer = function (valid) {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {

      var validateManufacturerName = function (viewValue) {

        scope.valueLength = valid.minLength(viewValue, 2);
        scope.valueRegex = valid.matchRegex(viewValue, /^[^A-z0-9]{2,}$/);

        if (scope.valueLength && scope.valueRegex) {
          ctrl.$setValidity('filter', true);
          return viewValue;
        }
        else {
          ctrl.$setValidity('filter', false);
          return undefined;
        }
      };

      ctrl.$parsers.unshift(validateManufacturerName);
      ctrl.$formatters.unshift(validateManufacturerName);
    }
  };
};

validateManufacturer.$inject = ['ValidationService'];

module.exports = validateManufacturer;