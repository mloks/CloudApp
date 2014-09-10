var array2string = function (){
  return function (input, prm) {

    if(prm === undefined) {
      prm = ", ";
    }

    if (input && angular.isArray(input)) {
      return input.join(prm);
    }
  }
};

array2string.$inject = [];

module.exports = array2string;