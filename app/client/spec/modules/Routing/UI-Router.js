var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Controller: CourseCtrl', function () {

  beforeEach(angular.mock.module('main'));
  var MainCtrl, scope;
  var views = ['tpl/navigation/home.html', 'tpl/navigation/application.html'];

  views.forEach(function(view) {
    beforeEach(module(view));
  });

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('CourseCtrl', { $scope: scope });
  }));

  it('should should transition to home', inject(function ($state, $rootScope) {
    $state.transitionTo('home');
    $rootScope.$apply();
    expect($state.current.name).toBe('home');
  }));

});