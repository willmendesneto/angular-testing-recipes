describe('sampleFilter', function () {
  'use strict';

  var trim;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $filter) {
    trim = $filter('trim');
    $rootScope.showLogs = false;
  }));

  it('should remove the whitespaces in the start and the end of a text', function () {
    var text = '    angularjs  ';
    expect(trim(text)).toBe('angularjs');
  });

  it('should return an string empty if the value is equal `undefined` or `null`', function () {
    expect(trim(undefined)).toBe('');
    expect(trim(null)).toBe('');
  });
});

describe('dummyFilter', function () {
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
