# Service
> Testing recipes for Services

## Table of contents

- [Boilerplate](#boilerplate)
- [Public properties](#public-properties)
- [Exposed methods](#expose-methods)
- [Methods from other services](#methods-from-other-services)
- [$http]($http)
- [Promises](#promises)

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

...

## Methods from other services

...


## $http

...

## Promises

...


