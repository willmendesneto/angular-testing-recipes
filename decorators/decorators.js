(function() {
  'use strict';

  angular.module('myApp')
    .config(rootScopeConfig);

  function rootScopeConfig($provide) {
    $provide.decorator('$rootScope', RootScopeDecorator);
  }

  rootScopeConfig.$inject = ['$provide'];

  function RootScopeDecorator($delegate) {
    // in this case $delegate == $rootScope
    // otherwise $delegate would be an array of
    // directives registered as the decorator name

    var times = 1;

    // augument the apply method to log how many times
    // it was called
    $delegate.$apply = loggerify($delegate.$apply);
    function loggerify(fn) {
      return function() {
        fn.apply(this, arguments);
        console.log(times);
        times += 1;
      }
    }
    return $delegate;
  }

  RootScopeDecorator.$inject = ['$delegate'];
}());
