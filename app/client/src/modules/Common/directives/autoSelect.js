var selectOnFocus = function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        element[0].select();
      });
    }
  };
};

module.exports = selectOnFocus;