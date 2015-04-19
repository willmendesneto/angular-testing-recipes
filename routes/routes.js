(function() {
  'use strict';

  angular.module('myRouteApp', ['ngRoute']).config(function($routeProvider){
    $routeProvider.when('/dashboard', {
      templateUrl: 'dashboard.tpl.html',
      controller: 'DashboardCtrl'
    })
    .otherwise({ redirectTo:'/dashboard' });
  });

}());
