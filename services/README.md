# Service
> Testing recipes for Services

## Table of contents

- [Boilerplate](#boilerplate)
- [Public properties](#public-properties)
- [Exposed methods](#exposed-methods)
- [$http](#-http)
- [Promises and Methods from other services](#promises-and-methods-from-other-services)

## Boilerplate

Before start we need to initialize the service and mock it's dependencies in our tests:

```js
describe('SampleService', function() {
  'use strict';

  var sampleService;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_sampleService_) {
    sampleService = _sampleService_;
  }));

  ...
});
```

## Public properties

To test public properties, all you need to do is access them directly from the `sampleService`:

Test:

```js
it('should expose a property', function() {
    expect(sampleService.foo).toBe('bar');
});
```

Code:

```js
var service = {
  foo: 'bar'
};

return service;
```

## Exposed methods


## $http

Is very common to use `$http` in our services for manipulate HTTP Requests. For test envolving this kind of requisition we should use `$httpBackend` for mock responses based in HTTP verbs.

```javascript

describe('Service: SampleHttpService', function () {
  'use strict';

  var SampleHttpService, httpBackend, q,
      response, MyModel;

  beforeEach(module('myApp'));

  beforeEach(inject(function (_SampleHttpService_, _$httpBackend_, $q) {
    q = $q;
    httpBackend = _$httpBackend_;
    SampleHttpService = _SampleHttpService_;
    response = [
      {id:1, name: 'Phone'},
      {id:2, name: 'Tablet'}
    ];

    MyModel = SampleHttpService.init({
      url: '/api/',
      cache: true
    });
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('#$get', function () {
    httpBackend.whenGET('/api/products').respond(response);
    var products = null;
    MyModel.$get('products').then(function(data){
      products = data;
    });
    httpBackend.flush();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBe(2);
    expect(products[0].id).toBe(1);
    expect(products[1].id).toBe(2);
  });

  it('#$find', function () {
    httpBackend.whenGET('/api/products').respond(response);
    var products = null;
    MyModel.$find('products', {id: 1}).then(function(data){
      products = data;
    });
    httpBackend.flush();

    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe('Phone');
  });

  it('#$post', function () {
    var message = {id: 4, name: 'DVD Player'};

    httpBackend.whenPOST('/api/product', message).respond(function (method, url, data, headers) {

      expect(method).toBe('POST');
      expect(url).toBe('/api/product');
      expect(!!headers).toBe(true);
      var newProduct = angular.fromJson(data);
      response.push(newProduct);

      var result = [200];
      result.push({ data: newProduct });
      return result;
    });

    var result;
    MyModel.$post('product', message).then(function(){
      result = true;
    });
    httpBackend.flush();

    expect(response.length).toBe(3);
    expect(result).toBeTruthy();
  });

  it('#$put', function () {
    var message = {id: 2, name: 'Monitor'};

    httpBackend.whenPUT('/api/product', message).respond(function (method, url, data, headers) {
      var updatedProduct = angular.fromJson(data),
        resLength = response.length;

      expect(method).toBe('PUT');
      expect(url).toBe('/api/product');
      expect(!!headers).toBe(true);

      for (var i = 0; i < resLength; i++){
        if (updatedProduct.id === response[i].id) {
          response[i] = updatedProduct;
          var result = [200];
          result.push({ data: response[i] });
          return result;
        }
      }
    });

    var update = false;
    MyModel.$put('product', message).then(function(){
      update = true;
    });
    httpBackend.flush();

    expect(response.length).toBe(2);
    expect(response[1].id).toBe(2);
    expect(response[1].name).toBe('Monitor');
    expect(update).toBeTruthy();
  });

  it('#$delete', function () {
    var productId = 2;

    httpBackend.whenDELETE(/\/api\/product\/\d*/).respond(function(method, url, data, headers) {
      var id = parseInt(url.replace('/api/product/', ''));

      expect(method).toBe('DELETE');
      expect(url).toBe('/api/product/' + id);
      expect(!!headers).toBe(true);

      var resLength = response.length;
      for (var i = 0; i < resLength; i++){
        if (id === response[i].id) {
          response.splice(i, 1);
          var result = [200];
          result.push({ data: response });
          return result;
        }
      }
    });

    var deleted = false;
    MyModel.$delete('product/' + productId).then(function(){
      deleted = true;
    });
    httpBackend.flush();

    expect(response.length).toBe(1);
    expect(response[1]).toBeTypeOf('undefined');
    expect(deleted).toBeTruthy();
  });

});
```

We should add 2 methods in `afterEach()` method too:

1- $httpBackend.verifyNoOutstandingExpectation():

> Verifies that all of the requests defined via the expect api were made. If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.

> Typically, you would call this method following each test case that asserts requests using an "afterEach" clause.

2 - $httpBackend.verifyNoOutstandingRequest():

> Verifies that there are no outstanding requests that need to be flushed. Typically, you would call this method following each test case that asserts requests using an "afterEach" clause.


## Promises and Methods from other services

For work with promises the AngularJS give to us `$q`, a service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.

For resolve these promises in our tests, we should work with data returned for `.then()` method. Let's take a loog in a very simple example based in `DummyService`.

```javascript

...
  describe('#useAnotherMethod', function() {
    it('should use another promise based method', function() {
      var onUseAnotherMethod = jasmine.createSpy('onUseAnotherMethod');

      spyOn(dummyService, 'anotherMethod').and.returnValue($q.when([2, 3, 4]));

      sampleService.useAnotherMethod().then(onUseAnotherMethod);
      $rootScope.$apply();

      expect(dummyService.anotherMethod).toHaveBeenCalled();
      expect(onUseAnotherMethod).toHaveBeenCalledWith([2, 3, 4]);
    });

    it('#anotherMethod', function () {
      dummyService.anotherMethod().then(function (data) {
        expect(data.length).toBe(3);
      });
    });
  });
```

For resolve our tests we can 2 ways:

- For more elaborated tests we should use `jasmine.createSpy` for create a spy for the event and spyOn for get the response data;
- For simple tests we can resolve using `.then()` method and in your callback add the expects;

## Services in module NG

Angular provide some modules by default (such as $window, $document, $location, $timeout, $interval and others) and they are very importants in our apps and for our tests too.

For example in this code we are using `$interval` as example. This code should be increase 300 miliseconds in out internal log timer.

```javascript
(function() {
  'use strict';

  angular.module('myApp')
    .service('TimerService', TimerService);

  function TimerService($interval) {

    var intervalId;
    var plusTimer = 300;

    this.log = {
      timer: 0,
      min: 0,
      max: 86399
    };

    this.plus = function(){
      this.log.timer = parseInt(this.log.timer, 10) + plusTimer;
      if(this.log.timer > this.log.max){
          this.log.timer = this.log.max;
      }
    };

    this.repeatPlus = function(){
      this.plus();
      this.repeatCancel(intervalId);
      var self = this;
      intervalId = $interval(function(){
          self.plus();
      }, 200);
    };

    this.repeatCancel = function(){
      $interval.cancel(intervalId);
    };
  }

  TimerService.$inject = ['$interval'];

}());
```

Based in this service, these are the tests.

```javascript
describe('Controller: TimerService', function () {
  'use strict';

  var TimerService,
    $interval,
    defaultLog = {
      timer: 0,
      min: 0,
      max: 86399
    };

  beforeEach(module('myApp'));

  beforeEach(inject(function (_TimerService_, _$interval_) {
    $interval = _$interval_;
    TimerService = _TimerService_;
  }));

  it('should set the default log object', function () {
    expect(TimerService.log).toEqual(defaultLog);
  });

  describe('plus method', function(){
    it('should be add 300 seconds to timer', function () {
      TimerService.plus();
      expect(TimerService.log.timer).toEqual(300);
    });

    it('should be add 300 seconds to timer considering the max value permitted', function () {
      TimerService.log.timer = 86300;
      TimerService.plus();
      expect(TimerService.log.timer).toEqual(defaultLog.max);
    });
  });

  describe('repeatPlus method', function(){
    it('should be add 1500 seconds to timer after 1 seconds', function () {
      TimerService.repeatPlus();
      $interval.flush(800);
      TimerService.repeatCancel();
      expect(TimerService.log.timer).toEqual(1500);
    });
  });

});
```

In AngularJS tests you shoudn't use [Jasmine Clocks](http://jasmine.github.io/2.2/introduction.html#section-Jasmine_Clock). If you need a `setInterval` for example, use should `$interval` and use the `flush()` method for remove interval in tests, improving more performatic tests.

Your can find all the angularjs built in services in [Angular documentation](https://docs.angularjs.org/api/ng/service)