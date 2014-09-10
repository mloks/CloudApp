var moment = require('moment');

var getDateAsNumDaysDiff = function () {
  return function (input, prm) {
    if (input) {
      return moment().subtract('days', input).format("DD MMM YYYY");
    }
    else
      return '';
  }
};

module.exports = getDateAsNumDaysDiff;