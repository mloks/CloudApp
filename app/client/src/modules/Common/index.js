require('./modules/ngUpload');
require('./modules/ngTagsInput');
var _ = require('underscore');

var extractLink = function (object, relation) {
  return _.find(object, function (item) {
    return item.rel === relation;
  });
};

angular.module('Common', [])

  .constant('_', _)
  .constant('extractLink', extractLink)
  .constant('msdElasticConfig', { append: ''})
  .constant('entitySelfUri', function (param, relation) {
    if( ! angular.isUndefined(param)) {

      var mode = (typeof param === 'object') ? 'encode' : 'decode';
      if(_.isUndefined(relation)){
        relation = 'self';
      }
      switch(mode){
        case 'encode':
          var currentLink = extractLink(param, relation).href.split('?')[0];
          return currentLink.replace(/\//g, ",");
          break;

        case 'decode':
          return param.replace(/,/g, "\/");
          break;
      }

    }
  })
  .constant('uniqid', require('./constant/uniqid'))
  .constant('objecthash', require('./constant/objecthash'))
  .constant('FilterMap', require('./constant/FilterMap'))
  .constant('FilterHelp', require('./constant/FilterHelp'))

  .service('ApiService', require('./services/api'))
  .service('DataService', require('./services/data'))

  .controller('HeaderController', require('./controllers/header'))
  .controller('ListController', require('./controllers/list'))
  .controller('DetailsController', require('./controllers/details'))
  .controller('DashboardController', require('./controllers/dashboard'))

  .filter('array2string', require('./filters/array2string'))
  .filter('maybeEmpty', require('./filters/maybeEmpty'))
  .filter('roundedcurrency', require('./filters/roundedCurrency'))
  .filter('fileSize', require('./filters/fileSize'))
  .filter('formatDate', require('./filters/formatDate'))
  .filter('usagetime', require('./filters/usageTime'))
  .filter('usagehours', require('./filters/usageHours'))
  .filter('age', require('./filters/age'))
  .filter('getDateAsNumDaysDiff', require('./filters/dateNumDaysDiff'))
  .filter('characters', require('./filters/charLimit'))
  .filter('words', require('./filters/charWords'))
  .filter('percentage', require('./filters/percentage'))

  .directive('showSuggestionsOnFocus', require('./directives/showSuggestionsOnFocus'))
  .directive('autoFocus', require('./directives/autoFocus'))
  .directive('autoSelect', require('./directives/autoSelect'))
  .directive('goDetails', require('./directives/goDetails'))
  .directive('goClick', require('./directives/goClick'))
  .directive('ngTabs', require('./directives/ngTabs'))
  .directive('ngTabHead', require('./directives/ngTabHead'))
  .directive('ngTabBody', require('./directives/ngTabBody'))
  .directive('duration', require('./directives/validateDuration'))
  .directive('elastic', require('./directives/elastic'))
  .directive('infoGraphic', require('./directives/infoGraphic'))
  .directive('validateManufacturer', require('./directives/validateManufacturer'));