(function() {
  'use strict';

  angular.module('myApp')
    .factory('sampleService', SampleService)
    .factory('dummyService', DummyService);

  function SampleService($http, $q, dummyService) {
    var service = {
      foo: 'bar',
      bar: bar,
      baz: baz,
      getData: getData,
      getResults: getResults,
      useAnotherMethod: useAnotherMethod
    };

    return service;

    function bar() {
      service.foo = 'baz';
    }

    function baz() {
      return dummyService.someMethod();
    }

    function getData() {
      return $http.get('/api/something')
        .success(function(result) {
          return result;
        })
        .error(function(reason) {
          return $q.reject(reason);
        });
    }

    function getResults(index) {
      var result = [1, 2, 3, 4, 5],
          resultLen = result.length;
      var deferred = $q.defer();

      if (index >= 0 && index < result.length) {
        deferred.resolve(result[index]);
      }

      deferred.reject('Do not exist');

      return deferred.promise;
    }

    function useAnotherMethod() {
      return dummyService.anotherMethod().then(function(result) {
        return result;
      });
    }
  }

  SampleService.$inject = ['$http', '$q', 'dummyService'];




  function DummyService($q) {
    var service = {
      someMethod: someMethod,
      anotherMethod: anotherMethod
    };

    return service;

    function someMethod() {
      return 'bla';
    }

    function anotherMethod() {
      var deferred = $q.defer();

      deferred.resolve([1, 2, 3]);

      return deferred.promise;
    }
  }

  DummyService.$inject = ['$q'];

}());
