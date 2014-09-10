var Downloads = function($scope, http, appConfig, _) {

  var getSelfLink = function (object, relation) {
    return _.find(object, function (item) {
      return item.rel === relation;
    });
  };

  $scope.downloadsCollection = {};

  $scope.getEnclosureLink = function(param){
    if(_.isUndefined(param)) {
      return undefined;
    }
    else{
      return getSelfLink(param, "enclosure");
    }
  };

  $scope.getItemType = function(item){
    if(_.isUndefined(item.members)) {
      return 'file';
    }
    else{
      return 'folder';
    }
  };

  $scope.getFileTypeStyle = function(path){

    var style = 'generic';

    if(_.isUndefined(path)){
      style = 'folder';
    }
    else{
      var ext = path.substr(path.lastIndexOf('.') + 1);
      switch(ext){

        case 'csv':
        case "xls":
        case "xlsx":
          style = 'csv';
          break;

        case "doc":
        case "docx":
          style = 'word';
          break;

        case 'msi':
          style = 'msi';
          break;

        case 'pdf':
          style = 'pdf';
          break;
      }

    }
    return style;
  };

  appConfig.then(function (response) {
    $scope.isUpdating = true;
    var kenobiUri = response.kenobi.Uri;
    http.get(kenobiUri + '/Downloads').then(function (response) {
      $scope.downloadsCollection = response.data;
      $scope.isUpdating = false;
    });
  });
};

Downloads.$inject = ['$scope', '$http', 'appConfig', '_'];

module.exports = Downloads;