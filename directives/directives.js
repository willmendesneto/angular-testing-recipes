(function() {
  'use strict';

  function SampleDirective() {

    function linkFn($scope, $element) {
      $element.on('click', function() {
        console.log('something');
      });

      $scope.foo = 'bar';
    }

    var directive = {
      template: '<div>' +
      ' <h1>Hello world!</h1>' +
      ' <h2>{{ bar }}</h2>' +
      ' <div ng-transclude></div>' +
      '</div>',
      link: linkFn,
      scope: {
        fooIsolate: '=',
        bar: '@',
        baz: '&'
      },
      transclude: true
    };

    return directive;
  }

  angular.module('myApp')
    .directive('sampleDirective', SampleDirective);
}());
