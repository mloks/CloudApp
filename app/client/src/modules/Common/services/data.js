var moment = require('moment');

var DataService = function(_) {
  this._ = _;
};

DataService.$inject = ['_'];

DataService.prototype.fieldExists = function(collection, field) {
  var flag = false;
  angular.forEach(collection, function(item) {
    if(!angular.isUndefined(item.usage[field])) {
      flag = true;
    }
  });
  return flag;
};

DataService.prototype.dateToTime = function (date){
  return moment(date).unix();
};

DataService.prototype.timeToHours = function(secs) {
  var hours = secs / (60 * 60);
  return hours.toFixed(2);
};

DataService.prototype.calculateUsage = function (item, field) {
  var self = this, pointTime, pointValue, pointAverage;
  pointTime = item.timePeriod.description;
  pointAverage = item.usage[field]/item.timePeriod.dayCount;
  pointValue = self.timeToHours(pointAverage);
  return [pointTime, pointValue];
};

DataService.prototype.transformTrendData = function (data, field) {
  var self = this, dataPoint, dataSet=[];

  angular.forEach(data, function(item){
    dataPoint = self.calculateUsage(item, field);
    dataSet.push(dataPoint);
  });

  return dataSet;
};

DataService.prototype.transformStackedData = function (data) {

  var self = this, dataSet=[], temp = { 'Used': [], 'Underused': [], 'Not used': []};

  angular.forEach(data, function(item){
    temp['Used'].push([item.timePeriod.description, item.usage.usedPackageInstancesCount]);
    temp['Underused'].push([item.timePeriod.description, item.usage.underusedPackageInstancesCount]);
    temp['Not used'].push([item.timePeriod.description, item.usage.notUsedPackageInstancesCount]);
  });

  angular.forEach(temp, function(points, index){
    dataSet.push({label: index, data: points});
  });

  return dataSet;
};

DataService.prototype.getStartEndData = function (data, field) {

  var self = this;
  var _ = self._;
  var firstPointCalculated = self.calculateUsage(_.first(data), field);
  var lastPointCalculated = self.calculateUsage(_.last(data), field);

  return {
    startUsage: (firstPointCalculated[1] >= 0) ? firstPointCalculated[1] : 0,
    endUsage: (lastPointCalculated[1] >= 0) ? lastPointCalculated[1] : 0,
    startDate: firstPointCalculated[0],
    endDate: lastPointCalculated[0]
  };

};

module.exports = DataService;