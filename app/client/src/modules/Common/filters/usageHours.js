var usageHours = function ($filter) {
  return function(input) {

    if(angular.isUndefined(input)) {
      return '';
    }

    var value = Number(input);

    if(value >= 100) {
      return $filter('number')(value, 0);
    }
    else if(value < 100){
      return value.toPrecision(3);
    }

  };
};

usageHours.$inject = ['$filter'];

module.exports = usageHours;