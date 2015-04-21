# Decorators
> Testing recipes for decorators

## Table of contents

- [About decorators](#about-decorators)
- [Boilerplate](#boilerplate)

## About decorators

When is necessary modify behaviour in a specific angularjs component, such as directives, services and others, Decorators is a greatest idea to resolve this problem
of a very elegant way. Decorators works intercepting the creation of a specific service, allowing it to override or modify the default behaviour of the service.

In this way, the object returned by the decorator may be the original service, or a new service object which replaces or wraps and delegates to the original service. And the better approach is that you can reuse and share these modifications in others apps easily. 


## Boilerplate

Before start we need to initialize the related decorator and mock it's dependencies.

```javascript
describe('Decorator: $rootScope', function() {
  'use strict';

  var $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.showLogs = false;
  }));

  it('should log how many times the $apply method was called', function() {

    $rootScope.$apply();
    expect($rootScope.times).toBe(1);
    $rootScope.$apply();
    expect($rootScope.times).toBe(2);
    $rootScope.$apply();
    expect($rootScope.times).toBe(3);
  });
});
```
