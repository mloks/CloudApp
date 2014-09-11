var ApiService = function(http) {
  this.http = http;
};

ApiService.$inject = ['$http'];

ApiService.prototype.getItemList = function(scope) {
  return $http({url: '/api/crm/list', responseType: 'json', params: {}});
};

ApiService.prototype.sendApiRequest = function (method, uri, data) {
  return this.http({method: method, url: uri, data: data});
};

module.exports = ApiService;