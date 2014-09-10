var roundedCurrency = function ($filter, $locale) {
  var currency = $filter('currency'), formats = $locale.NUMBER_FORMATS;
  return function (amount, symbol) {
    var value = currency(amount, symbol);
    return value.replace(new RegExp('\\' + formats.DECIMAL_SEP + '\\d{2}'), '')
  }
};

roundedCurrency.$inject = ['$filter','$locale'];

module.exports = roundedCurrency;