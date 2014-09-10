var percentage = function ($filter) {
  return function(input, decimals) {
    if(input == 0) {
      return '0%';
    }
    if(decimals === undefined) {
      decimals = 0;
    }
    return $filter('number')(input*100, decimals)+'%';
  };
};

percentage.$inject = ['$filter'];

module.exports = percentage;