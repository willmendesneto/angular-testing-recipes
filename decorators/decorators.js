(function() {
  'use strict';

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
    function loggerify(fn) {
      return function() {
        fn.apply(this, arguments);

        if (this.showLogs === undefined) {
          this.showLogs = true;
        }
        if (!!this.showLogs) {
          console.log(times);
        }
        this.times = times;
        times += 1;
      };
    }

    $delegate.$apply = loggerify($delegate.$apply);

    return $delegate;
  }

  RootScopeDecorator.$inject = ['$delegate'];

  angular.module('myApp')
    .config(rootScopeConfig);

}());
