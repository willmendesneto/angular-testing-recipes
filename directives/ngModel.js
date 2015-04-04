// ngModelController.js
(function() {
  'use strict';

  function kpFocusLink(scope, element, controller) {
    controller.$focused = false;

    /**
     * Activate directive on focus event
     * @return
     */
    element.bind('focus', function(){
      scope.$apply(function(){
        controller.$focused = true;
      });
    })

    /**
     * Deactivate directive on blur event
     * @return
     */
    .bind('blur', function(){
      scope.$apply(function(){
        controller.$focused = false;
      });
    });

    /**
     * Destroy events on "$destroy" scope event
     * @return
     */
    scope.$on('$destroy', function() {
      element.unbind('blur focus');
    });
  }

  function kpFocus() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: kpFocusLink
    };

    return directive;
  }

  angular.module('myApp')
    .directive('kpFocus', kpFocus);

}());
