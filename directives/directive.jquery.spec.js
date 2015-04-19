describe('Testing directive using jquery plugin', function() {
  'use strict';

  var element,
    scope;

  //you need to indicate your module in a test
  beforeEach(module('myApp'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    var template = '<div id="format-toolbar1" class="settings-button" toolbar-tip="{content: \'#format-toolbar-options\', position: \'top\'}">' +
        '<img src="http://paulkinzett.github.com/toolbar/img/icon-cog-small.png">' +
    '</div>' +
    '<div id="format-toolbar-options">' +
        '<a href="#"><i class="icon-align-left"></i></a>' +
        '<a href="#"><i class="icon-align-center"></i></a>' +
        '<a href="#"><i class="icon-align-right"></i></a>' +
    '</div>';
    element = angular.element(template);
    element = $compile(element)(scope);
    scope.$digest();
    $rootScope.showLogs = false;
  }));

  it('should activate toggle click event in plugin', function() {
    expect(element).not.toHaveClass('pressed');
    element.click();
    expect(element).toHaveClass('pressed');
    element.click();
    expect(element).not.toHaveClass('pressed');
  });
});
