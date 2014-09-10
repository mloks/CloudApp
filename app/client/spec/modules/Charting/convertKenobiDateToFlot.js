require('chai').should();
var convertKenobiDateToFlot = require('../../../src/modules/Charting/convertKenobiDateToFlot');

describe('convertKenobiDateToFlot', function() {
  it('should convert 2013-03-26T10:07:14.812Z to 1364292434812', function() {
    convertKenobiDateToFlot("2013-03-26T10:07:14.812Z").should.equal(1364292434812);
  });
  it('should convert 2013-03-26T10:52:00.295Z to 1364295120295', function() {
    convertKenobiDateToFlot("2013-03-26T10:52:00.295Z").should.equal(1364295120295);
  });
});