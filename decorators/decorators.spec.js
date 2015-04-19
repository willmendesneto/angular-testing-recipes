describe('Decorator: $rootScope', function() {
  'use strict';

  var $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.showLogs = false;
  }));

  it('should log how many times the $apply method was called', function() {

    $rootScope.$apply();
    expect($rootScope.times).toBe(1);
    $rootScope.$apply();
    expect($rootScope.times).toBe(2);
    $rootScope.$apply();
    expect($rootScope.times).toBe(3);
  });
});
