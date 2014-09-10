require('chai').should();
var sinon = require('sinon');

var ChartDataFormatter = require('../../../src/modules/Charting/ChartDataFormatter');

describe('ChartDataFormatter', function() {
  var test;
  var convertDate;

  beforeEach(function() {
    convertDate = sinon.stub();
    test = new ChartDataFormatter(convertDate);
  });

  describe('formatPackageInstancesUsageData', function() {
    describe('given empty source data', function() {
      var result;

      beforeEach(function() {
        result = test.formatPackageInstancesUsageData([]);
      });

      it('should return a series', function() {
        result.should.have.length(1);
      });

      it('should contain only empty series', function() {
        result[0].data.should.be.empty;
      });
    });

    describe('given a single result', function() {
      var convertedStartTime = 'converted start time';
      var convertedEndTime = 'converted end time';
      var kenobiStartTime = 'some start time';
      var kenobiEndTime = 'some end time';
      var data = [
        {
          timePeriod: {
            startTime: kenobiStartTime,
            endTime: kenobiEndTime
          },
          installed: 100,
          used: 50
        }
      ];
      var result;

      beforeEach(function() {
        convertDate.withArgs(kenobiStartTime).returns(convertedStartTime);
        convertDate.withArgs(kenobiEndTime).returns(convertedEndTime);
        result = test.formatPackageInstancesUsageData(data);
      });

      it('should return a series', function() {
        result.should.have.length(1);
      });

      it('should return a single data point in the series', function() {
        result[0].data.should.have.length(1);
      });

      describe('returns a data point', function() {

        it('with converted date', function() {
          result[0].data[0][0].should.equal(convertedStartTime);
        });

        it('with percentage used', function() {
          result[0].data[0][1].should.equal(50);
        });
      });
    });
  });
});