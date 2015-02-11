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
// filter.spec.js
describe('Filter: trim', function () {
  'use strict';

  var trim;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($filter) {
    trim = $filter('trim');
  }));

  it('should return the input string without spaces in left and right sides', function () {
    var text = '    angularjs  ';
    expect(trim(text)).toBe('angularjs');
  });

  it('should return the input string empty if input element value is equal "undefined" or "null" ', function () {
    expect(trim(undefined)).toBe('');
    expect(trim(null)).toBe('');
  });

});
```


## Best Practices

> Upgrading your filter and your tests for filter

### Doesn't use any special characters and namespace

Recently was approached something that works on, but it wasn't right. In one of the issues openned on AngularJS Github repository was discussed a scenario which uses the concept of namespaces (like jQuery namespace "my.awesome.namespace"). This scenario was possible until the 1.3.2 version of the framework and beyond this format version did not work properly.

This issue raised a very interesting discussion, finished with something that was correct, but that wasn't included in filters documentation that we must be not use special characters to define the filter name. If you would like to track more information about the discussion worth giving a look at issue #10110 addressing this topic.

- [Issue #10110](https://github.com/angular/angular.js/issues/10110)


### Combining filters

If you use a $filter with another filter dependencies or use a filter with strategy pattern is simple as well, since you will have to test all filters and parameters. An example of a filter with this strategy pattern is the `snakeCase` filter using `trim` internally.

```javascript
angular.module('myApp')
  .filter('snakeCase', ['$filter', function ($filter) {
    return function (input) {
      if (input === null || input === undefined) {
        input = '';
      }

      // Using `trim` filter that already exist
      var $trim = $filter('trim');
      return $trim(input).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    };
  }]);
```

And the test for `snakeCase` filter is very simple. Nothing is modified because the trim filter already was tested in our app.

```javascript
describe('Filter: snakeCase', function () {
  'use strict';

  var snakeCase;

  beforeEach(module('keepr'));

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
