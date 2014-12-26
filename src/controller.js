(function() {
  'use strict';

  angular.module('myApp', [])
    .controller('SampleController', SampleController);

  function SampleController($scope) {
    var vm = this;

    vm.bar = bar;
    vm.doSomething = doSomething;
    vm.foo = 'bar';

    function bar() {
      vm.foo = 'baz';
    }

    function doSomething() {}

    $scope.$watch('baz', function(newVal) {
      if (newVal) {
        vm.baz = newVal + 'bar';
      }
    });

    $scope.$on('$destroy', function() {
      vm.doSomething();
    });

    //scope.$emit()
    //scope.$broadcast()
    //scope.$on()
    //scope.$apply()
  }
}());