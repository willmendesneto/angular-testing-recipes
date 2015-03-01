// navbar.js
(function() {
  'use strict';

  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: '/navbar.tpl.html',
      controller: 'NavbarCtrl',
      controllerAs: 'navbarCtrl',
    };

    return directive;
  }

  angular.module('myApp')
    .directive('navbar', navbar);

}());