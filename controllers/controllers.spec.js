describe('SampleController', function() {
  'use strict';

  var $rootScope,
    ctrl, scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function( _$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();

    ctrl = _$controller_('SampleController', {
      $scope: scope
    });
    $rootScope.showLogs = false;
  }));

  it('should expose a property', function() {
    expect(ctrl.foo).toBe('bar');
  });

  it('should expose a method', function() {
    ctrl.bar();
    expect(ctrl.foo).toBe('baz');
  });

  it('should have a watcher', function() {
    scope.baz = 'foo';
    scope.$apply();
    expect(ctrl.baz).toBe('foobar');
  });

  it('should do something on $destroy', function() {
    spyOn(ctrl, 'doSomething');
    scope.$destroy();
    expect(ctrl.doSomething).toHaveBeenCalled();
  });

  it('should emit an event', function() {
    spyOn(scope, '$emit');

    ctrl.sendMessage();
    expect(scope.$emit).toHaveBeenCalled();
    expect(scope.$emit).toHaveBeenCalledWith('sample:message', {
      foo: 'bar'
    });
  });

  it('should broadcast an event', function() {
    spyOn(scope, '$broadcast');

    ctrl.broadcastEvent();
    expect(scope.$broadcast).toHaveBeenCalled();
    expect(scope.$broadcast).toHaveBeenCalledWith('sample:broadcast', {
      foo: 'bar'
    });
  });
});
