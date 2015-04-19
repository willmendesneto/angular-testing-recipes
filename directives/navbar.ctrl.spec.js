describe('Controller: NavbarCtrl', function () {
  'use strict';

  var navbarCtrl,
    scope,
    rootScope,
    location;

  // load the controller's module
  beforeEach(module('myApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    location = $location;
    rootScope = $rootScope;
    scope = rootScope.$new();
    navbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
    $rootScope.showLogs = false;
  }));

  describe('isActive', function(){

    it('should return "true" when paths are the same', function () {
      location.path('/');
      expect(navbarCtrl.isActive('/')).toBeTruthy();
    });

    it('should return "false" when paths aren\'t the same', function () {
      location.path('/');
      expect(navbarCtrl.isActive('/error')).toBeFalsy();
    });

    it('should return "true" when word starts are the same', function () {
      location.path('/contacts/1/edit');
      expect(navbarCtrl.isActive('/contacts')).toBeTruthy();
    });

    it('should return "true" when word starts are the same followed by query string', function () {
      location.path('/contacts?id=1');
      expect(navbarCtrl.isActive('/contacts')).toBeTruthy();
    });

  });
});
