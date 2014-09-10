var moment = require('moment');

var formatDate = function() {
    return function(input, prm) {
      if (input) {
        return moment(input).format(prm);
      }
      else {
        return '';
      }
    }
};

module.exports = formatDate;