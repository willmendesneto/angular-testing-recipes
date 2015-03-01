# Filters
> Testing recipes for filters

## Table of contents

- [Boilerplate](#boilerplate)
- [Best Practices](#best-practices)
- [Doesn't use any special characters and namespace](#doesn-t-use-any-special-characters-and-namespace)
- [Combining filters](#combining-filters)


## Boilerplate

Before start we need to initialize the related filter and mock it's dependencies.

```javascript
// filters.spec.js
describe('Filter: trim', function () {
  'use strict';

  var trim;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($filter) {
    trim = $filter('trim');
  }));

  ...
});
```


## Best Practices


### Doesn't use any special characters or "namespaces"

Check [this issue](https://github.com/angular/angular.js/issues/10110) in the angular.js repository for more info.


### Combining filters

If you're combining filters or using strategy pattern its still simple to test.
Let's consider the ```snakeCase``` filter which uses the ```trim``` filter internally:

```javascript
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
  }]);
```

The unit tests for ```snakeCase``` filter will follow the same strategy as the ```trim``` filter, without worrying about 
each other. They must be all separated even one using the other as a dependency. 

```javascript
describe('snakeCase', function () {
  'use strict';

  var snakeCase;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($filter) {
    snakeCase = $filter('snakeCase');
  }));

  it('should return the input string with snakecase format', function () {
    var text = 'angular js';
    expect(snakeCase(text)).toBe('angular_js');
  });

  it('should return the input string empty if input element value is equal "undefined" or "null" ', function () {
    expect(snakeCase(undefined)).toBe('');
    expect(snakeCase(null)).toBe('');
  });
});
```

In some cases you may want to mock  dependencies to simplify the tests. 

