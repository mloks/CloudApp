var moment = require('moment');

var ageFilter = function () {
  return function (input, prm) {
    if (input) {
      var age = moment.duration(moment() - moment(input));
      return age.humanize() + ' ' + prm;
    }
    else
      return '';
  }
};

module.exports = ageFilter;