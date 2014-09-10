var objecthash = function(object){
  var index = angular.toJson(object), hash = 0;
  for (var i = 0; i < index.length; i++) {
    var character = index.charCodeAt(i);
    hash = ((hash<<5)-hash)+character;
    hash = hash & hash;
  }
  return 'o:' + hash;
};

module.exports = objecthash;