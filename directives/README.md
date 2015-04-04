# Directives

## Table of contents

- [Boilerplate](#boilerplate)
- [Template](#template)
- [DOM events](#dom-events)
- [scope](#scope)
- [isolateScope](#isolatescope)
  - [equals (=)](#equals-)
  - [At sign (@)](#at-sign-)
  - [ampersand (&)](#ampersand-)
- [Transclusion](#transclusion)
- [Working with ngModelController](#working-with-ngmodelcontroller)
- [jQlite/jQuery Events](#jqlite-jquery-events)
- [Working with thin directives](#working-with-thin-directives)


## Boilerplate

```javascript
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
```

## Template

The directive has give to us 2 optional parameters:

- `template`: string (accept html or text format) that will be compiled for directive's usage;
- `templateUrl`: link for external html template file that will be load and compiled for directive's usage;

> Unless your template is very small, it's typically better to break it apart into its own HTML file and load it with the `templateUrl` option.

```html
<div>
  <h1>Hello world!</h1>
  <div ng-transclude></div>
</div>
```

## DOM Events

In Directives there are many cases we need to work with pure DOM, using bindings and other DOM specs. In our example the click event is simulated for tests.

```javascript
  ...
  describe('#DOM events', function() {
    it('should log something when the user clicks in the element', function() {
      spyOn(console, 'log');
      elem.triggerHandler('click');

      expect(console.log).toHaveBeenCalledWith('something');
    });
  });
  ...
```


## scope


## isolateScope


### equals (=)


### At sign (@)


### ampersand (&)


## Transclusion

We've seen that you can pass in models to a directive using the isolate scope, but sometimes it's desirable to be able to pass in an entire template rather than a string or an object. For enable this option is very simple, it's only a boolean parameter passed in your directive creation.

```javascript
transclude: true
```

`transclude` makes the contents of a directive with this option have access to the scope outside of the directive rather than inside.

> Only use `transclude: true` when you want to create a directive that wraps arbitrary content.

For test this directive behaviour, our directive test is:

```javascript
  ...
  describe('#transclusion', function() {
    it('should transclude the DOM', function() {
      expect(elem[0].innerHTML).toContain('<h1 class="ng-scope">foo</h1>');
    });
  });
  ...
```

## Working with ngModelController

Many times when you should use integrations with forms in your application, such as create a new validation/behaviour based in specific format (credit card, for example) or simulate an event in form elements, the `ngModelController` is the better way to do this.

A simple example is to use a directive for force javascript `.focus()` event in a field for field validation. Our directive will be called `kpFocus` and your content is:

```javascript
// ngModelController.js
(function() {
  'use strict';

  function kpFocusLink(scope, element, controller) {
    controller.$focused = false;

    /**
     * Activate directive on focus event
     * @return
     */
    element.bind('focus', function(){
      scope.$apply(function(){
        controller.$focused = true;
      });
    })

    /**
     * Deactivate directive on blur event
     * @return
     */
    .bind('blur', function(){
      scope.$apply(function(){
        controller.$focused = false;
      });
    });

    /**
     * Destroy events on "$destroy" scope event
     * @return
     */
    scope.$on('$destroy', function() {
      element.unbind('blur focus');
    });
  }

  function kpFocus() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: kpFocusLink
    };

    return directive;
  }

  angular.module('myApp')
    .directive('kpFocus', kpFocus);

}());
```


For attend this specifications, our test will be:

```javascript
// ngModelController.spec.js
describe('Directive: kpFocus', function () {
'use strict';

  var element,
    scope;

  // load the directive's module
  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $compile) {

    scope = $rootScope.$new();
    scope.x = '1234567890xpto';
    element = $compile('<input kp-focus type="text" placeholder="My awesome placeholder" ng-model="x" required />')(scope);
    scope.$digest();
  }));

  it('should have a kp-focus defined', function() {
    expect(element).toBeDefined();
  });

  it('should have a form field required in focus', function() {
    spyOn(scope, '$apply');

    element.val('baz');
    element.triggerHandler('focus');

    expect(scope.$apply).toHaveBeenCalled();

    element.triggerHandler('blur');
    expect(scope.$apply).toHaveBeenCalled();
  });
});
```

## jQlite/jQuery Events

AngularJS uses jQlite in your core by default, but your can use jQuery in your directives too. If jQuery is available, `angular.element` is an alias for the jQuery function, or delegates to Angular's built-in subset of jQuery, called "jQuery lite" or "jqLite.", a tiny, API-compatible subset of jQuery that allows Angular to manipulate the DOM in a cross-browser compatible way.

A good tip is create/use Jasmine matchers in this task, for do this job more easy for us. Was created `toHaveClass()` matcher for check if element has some specific class in our expect methods and verifying toggle click event.

```javascript
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
  }));

  it('should activate toggle click event in plugin', function() {
    expect(element).not.toHaveClass('pressed');
    element.click();
    expect(element).toHaveClass('pressed');
    element.click();
    expect(element).not.toHaveClass('pressed');
  });
});
```

## Working with thin directives

The thin directives conception is based in construction of an angular directive using other components (as Controllers Services, factories, etc.) based on a directive for better integration and testability. With this approach the tests are much simpler, as you delegate some responsibilities to other Angular components.

A practic example using thin directive concept is based in navbar directive. For this task we will create three files to works directly with this directive:

- `navbar.tpl.html`: Template of our policy with the information and values ​​to be updated;
- `navbar.ctrl.js`: Controller for our navbar menu. He will be responsible for making the integration so that our controller works perfectly;
- `navbar.js`: our directive really. This file is very compact, it will have only a few simple settings;

```javascript
// navbar.js
(function() {
  'use strict';

  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'navbar.tpl.html',
      controller: 'NavbarCtrl',
      controllerAs: 'navbarCtrl',
    };

    return directive;
  }

  angular.module('myApp')
    .directive('navbar', navbar);

}());
```

```html
<!-- navbar.tpl.html -->
<div class="header" >
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:navbarCtrl.isActive('/')}"><a ng-href="/#/">Item #1</a></li>
    <li ng-class="{active:navbarCtrl.isActive('#/contacts')}"><a ng-href="/#/contacts">Item #2</a></li>
  </ul>
  <h3 class="text-muted">NAVBAR</h3>
</div>
```

`navbarCtrl.isActive ()` method is used for NavbarCtrl controller accessing the directive, but for now we will not create the controller, but yes our directive.

```javascript
// navbar.ctrl.js
(function() {
  'use strict';

  function NavbarCtrl($scope, $location) {
    this.isActive = function(path){
      var currentPath = $location.path().split('/')[1];
      if (currentPath.indexOf('?') !== -1) {
        currentPath = currentPath.split('?')[0];
      }
      return currentPath === path.split('/')[1];
    };
  }

  angular.module('myApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', '$location'];

}());
```

With all components that work with our directive, let's test our code. Now we can create more modular tests, attending controller and directive.

```javascript
// navbar.spec.js
describe('Directive: navbar', function () {
  'use strict';

  var element,
    template,
    httpBackend,
    rootScope,
    scope;

  // load the directive's module
  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    rootScope = $rootScope;
    scope = rootScope.$new();
    httpBackend = _$httpBackend_;

    template = '<div class="header">' +
      '<ul class="nav nav-pills pull-right">' +
      '  <li ng-class="{active:navbarCtrl.isActive(\'/\')}"><a ng-href="/#/">Item #1</a></li>' +
      '  <li ng-class="{active:navbarCtrl.isActive(\'#/contacts\')}"><a ng-href="/#/contacts">Item #2</a></li>' +
      '</ul>' +
      '<h3 class="text-muted">NAVBAR</h3>' +
    '</div>';
    httpBackend.whenGET('/navbar.tpl.html').respond(template);

    element = angular.element(template);
    element = $compile(element)(scope);

  }));

  it('should create a navbar header with ".header" class in element', function () {
    expect(element.hasClass('header')).toBeTruthy();
  });

  it('should set "ng-scope" class in template', function () {
    expect(element.hasClass('ng-scope')).toBeTruthy();
  });

});
```

```javascript
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
```

Thin directives are interesting for create components with middle and/or high complexity characteristics as delegates to other elements of AngularJS, improving your maintenance, testability and other aspects. If you can know more about thin directives [take a look in this post showing this approach](http://willmendesneto.github.io/2014/09/23/working-with-thin-directives-in-angularjs/)
