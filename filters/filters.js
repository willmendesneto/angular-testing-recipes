(function() {
  'use strict';

  angular.module('myApp')
    .filter('trim', function () {
      return function (input) {
        var str;
        if (input === undefined || input === null) {
          input = '';
        }
        str = String(input);
        if (String.prototype.trim !== null) {
          return str.trim();
        } else {
          return str.replace(/^\s+|\s+$/gm, '');
        }
      };
    });
}());
