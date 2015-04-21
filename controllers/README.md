# Controller
> Testing recipes for controllers

## Table of contents

- [Boilerplate](#boilerplate)
- [Watchers](#watchers)
- [Working with events](#working-with-events)
  - [$emit](#emit)
  - [$broadcast](#broadcast)
  - [$destroy](#$destroy)
- [Best Practices](#best-practices)
  - [$apply instead $digest](#apply-instead-digest)

## Boilerplate

Before start we need to initialize the related controller and mock it's dependencies.

```js
describe('SampleController', function() {
    'use strict';

    var $rootScope,
        ctrl, scope;

    // load the related module before each spec runs
    beforeEach(module('moduleName'));

    // inject the $controller service to load the SampleController
    // and the $rootScope
    beforeEach(inject(function(_$rootScope_, _$controller_) {
        // save the injected $rootScope into a variable available across the whole file
        $rootScope = _$rootScope_;

        // create a brand new scope
        scope = $rootScope.$new();

        // load the SampleController mocking the $scope to the one created before
        ctrl = $controller('SampleController', {
            $scope: scope
        };
    }));

    ...
});
```

## Watchers

Watches expressions are very commons in angularjs and your verification is very usefull. For validate our test, the code in controller is:

```javascript
  ...
  $scope.$watch('baz', function(newVal) {
    if (newVal) {
      vm.baz = newVal + 'bar';
    }
  });
  ...
````

With watch created, our code coverage is:

```javascript
  it('should have a watcher', function() {
    scope.baz = 'foo';
    scope.$apply();
    expect(ctrl.baz).toBe('foobar');
  });
```

> For more information, please take a look in [angularjs $watch official documentation](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch)


## Working with events


Usually in AngularJS applications we can to create, work and manipulate events created via `$on()`. This method add a listener for event based in AngularJS scope.

But this events should be tested easily. For help in this job, Jasmine provide spies (`spyOn()` method), that accept many kinds of configuration.


### $emit

This method uses [Event Emitter async pattern](http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-event-emitters) and enable communication between components based in 1 x 1 communication via.

```javascript
  // controllers.js
  ...
  function sendMessage() {
    $scope.$emit('sample:message', { foo: 'bar' });
  }
  ...
```

One way to test these events is based in this example.

```javascript
  ...
  it('should emit an event', function() {
    spyOn(scope, '$emit');

    ctrl.sendMessage();
    expect(scope.$emit).toHaveBeenCalled();
    expect(scope.$emit).toHaveBeenCalledWith('sample:message', {
      foo: 'bar'
    });
  });
  ...
```


### $broadcast

This method used [Broadcast pattern](http://weblogs.asp.net/minhajuddin/event-broadcasting-using-the-observer-design-pattern). This pattern is very powerfull, because enable communication with all components that have a listener in this channel based in 1 x N.

```javascript
  // controllers.js
  ...
  function broadcastEvent() {
    $scope.$broadcast('sample:broadcast', { foo: 'bar' });
  }
  ...
```

This test code example is very similar with `$emit` test, but your core implementation is very diferent. Let`s check the code test.

```javascript
  // controllers.spec.js
  ...
  it('should broadcast an event', function() {
    spyOn(scope, '$broadcast');

    ctrl.broadcastEvent();
    expect(scope.$broadcast).toHaveBeenCalled();
    expect(scope.$broadcast).toHaveBeenCalledWith('sample:broadcast', {
      foo: 'bar'
    });
  });
  ...
```


### $destroy

This event is very usefull for callbacks methods when the bind event is removed. For test it, `spyOn` method is used too.


```javascript
  // controllers.js
  ...
  function doSomething() {}

  $scope.$on('$destroy', function() {
    vm.doSomething();
  });
  ...
```

```javascript
  // controllers.spec.js
  ...
  it('should do something on $destroy', function() {
    spyOn(ctrl, 'doSomething');
    scope.$destroy();
    expect(ctrl.doSomething).toHaveBeenCalled();
  });
  ...
```


## Best Practices


### $apply instead $digest

Creating a new $scope and $compile your content, we wrap our changes to $scope using $apply to replace `{{vm.foo}}` with the final value and compile it. Doing it like this, it renders with the right context. We don’t need to call $digest separately as $apply internally calls $digest once finishes evaluating all changes. You should use `$apply` instead of `$digest`, because `$digest` is already invoked in $apply method internally.


```javascript
  ...
  it('should have a watcher', function() {
    scope.baz = 'foo';
    scope.$apply();
    expect(ctrl.baz).toBe('foobar');
  });
  ...
```
