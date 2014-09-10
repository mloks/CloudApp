var CollectionService = function(http, kenobi, ajax, $q) {
  this.http = http;
  this.kenobi = kenobi;
  this.ajax = ajax;
  this.$q = $q;
};

CollectionService.$inject = ['$http', 'KenobiService', 'ajax', '$q'];

CollectionService.prototype.getPackageCollection = function(scope) {

  var params = { pageSize: 'all'};
  scope.isWaiting = true;
  var deferred = this.$q.defer();
  var unsubscribe = this.ajax.ajax(this.kenobi.apiRequestWithFilter('/packages', scope.filter, params, true))
  .onValue(function (result) {
    while(scope.migrateOptions.length > 0) {
      scope.migrateOptions.pop();
    }
    unsubscribe();
    if(result.members.length > 0){
      var index = 0;
      angular.forEach(result.members, function(item){
        scope.migrateOptions.push({
          label: 'Migrate to ' + item.name + ' - ' + item.version,
          action: {
            action: 'migrateToSpecificVersion',
            targetPackage: {
              manufacturer: item.manufacturer,
              name: item.name,
              version: item.version
            }
          }
        });
      });
    }
    scope.isWaiting = false;
  });
  return deferred.promise;
};

CollectionService.prototype.getCombinedRequests = function(requests, filter) {

  var $q = this.$q;
  var ajax = this.ajax;
  var kenobi = this.kenobi;

  var promises = requests.map(function(request){
    var deffered  = $q.defer();
    ajax.ajax(kenobi.apiRequestWithFilter(request.uri, request.filter, request.params, true))
    .onValue(function(data) { deffered.resolve(data); });
    return deffered.promise;
  });

  return $q.all(promises);
};

CollectionService.prototype.packageAction = function (method, uri, data) {
  return this.http({method: method, url: uri, data: data});
};

module.exports = CollectionService;