var moment = require('moment');

angular
  .module('moment', [])
  .value('moment', moment);

module.exports = moment;