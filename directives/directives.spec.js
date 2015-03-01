describe('sampleDirective', function() {
  'use strict';

  var elem, scope, isolateScope,
      $compile, $rootScope;

  // load the application module
  beforeEach(module('myApp'));

  // inject the services to be used before each of the specs
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    // create a new scope
    scope = $rootScope.$new();

    // invoke the directive as an angular element
    elem = angular.element(
      '<div sample-directive foo-isolate="bar" bar="{{ ::baz }}" baz="doSomething()">' +
      ' <h1>foo</h1>' +
      '</div>'
    );

    // compile it against the previously created scope
    $compile(elem)(scope);
    // get the isolate scope of the directive
    isolateScope = elem.isolateScope();
  }));

  it('should have a template', function() {
    expect(elem[0].innerText).toContain('Hello world!');
  });

  it('should expose a property to the $scope', function() {
    expect(isolateScope.foo).toBe('bar');
  });

  it('should expose a property to the isolateScope as `=`', function() {
    scope.bar = 'baz';
    scope.$digest();

    expect(isolateScope.fooIsolate).toBe('baz');
  });

  it('should expose a property to the isolateScope as `@`', function() {
    scope.baz = 'foo';
    scope.$digest();

    expect(isolateScope.bar).toBe('foo');
  });

  it('should expose a property to the isolateScope as `&`', function() {
    spyOn(console, 'log');

    scope.doSomething = function() {
      console.log('lol');
    };

    isolateScope.baz();

    expect(console.log).toHaveBeenCalledWith('lol');
  });


  describe('#DOM events', function() {
    it('should log something when the user clicks in the element', function() {
      spyOn(console, 'log');
      elem.triggerHandler('click');

      expect(console.log).toHaveBeenCalledWith('something');
    });
  });

  describe('#transclusion', function() {
    it('should transclude the DOM', function() {
      expect(elem[0].innerHTML).toContain('<h1 class="ng-scope">foo</h1>');
    });
  });
});
