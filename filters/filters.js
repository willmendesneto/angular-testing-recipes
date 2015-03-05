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

  angular.module('myApp')
    .filter('snakeCase', function($filter) {
      return function(input) {
        if (input === null || input === undefined) {
          input = '';
        }

        // Using `trim` filter that already exist
        var $trim = $filter('trim');
        return $trim(input)
          .replace(/([a-z\d])([A-Z]+)/g, '$1_$2')
          .replace(/[-\s]+/g, '_')
          .toLowerCase();
      };
    });

}());
