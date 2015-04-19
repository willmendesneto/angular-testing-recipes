describe('routes', function(){
  'use strict';

  var $route, $rootScope, $location, $httpBackend;

  // load the application module
  beforeEach(module('myRouteApp'));

  beforeEach(inject(function (_$route_, _$rootScope_, _$location_, _$httpBackend_){
    $route = _$route_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', 'dashboard.tpl.html').respond('dashboard');
    $rootScope.showLogs = false;
  }));

  it('should navigate to dashboard', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/dashboard');
    });
    expect($location.path()).toBe('/dashboard');
    expect($route.current.templateUrl).toBe('dashboard.tpl.html');
    expect($route.current.controller).toBe('DashboardCtrl');
  });

  it('should redirect not registered urls to dashboard', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/incorrect-route');
    });
    expect($location.path()).toBe('/dashboard');
    expect($route.current.templateUrl).toBe('dashboard.tpl.html');
    expect($route.current.controller).toBe('DashboardCtrl');
  });
});
