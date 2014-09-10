var ngTabs = function () {
  return {
    scope: true,
    restrict: 'EAC',
    controller: ['$scope', function ($scope) {
      $scope.tabs = {
        index: 0,
        count: 0
      };

      this.headIndex = 0;
      this.bodyIndex = 0;

      this.getTabHeadIndex = function () {
        return $scope.tabs.count = ++this.headIndex;
      };

      this.getTabBodyIndex = function () {
        return ++this.bodyIndex;
      };
    }]
  };
};

module.exports = ngTabs;