var moment = require('moment');

var usageTime = function() {
  return function(input, prm) {
    if (input > 0) {
      return moment.duration(input, 's').humanize() + ' approx. ';
    }
    else {
      return '';
    }
  }
};

module.exports = usageTime;