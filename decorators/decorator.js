(function() {
  'use strict';

  angular.module('myApp')
    .config(rootScopeConfig);

  function rootScopeConfig($provide) {
    $provide.decorator('$rootScope', rootScopeDecorator);
  }

  rootScopeConfig.$inject = ['$rootScope', '$provide'];

  function rootScopeDecorator($delegate) {
    // in th"is case $delegate == $rootScope
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

  rootScopeDecorator.$inject = ['$delegate'];
}());