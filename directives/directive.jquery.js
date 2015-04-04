(function() {
  'use strict';

  function toolbarTip() {
    var directive = {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).toolbar(scope.$eval(attrs.toolbarTip));
        }
    };

    return directive;
  }

  angular.module('myApp')
    .directive('toolbarTip', toolbarTip);

}());
