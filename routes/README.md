# Routes
> Testing recipes for routes

## Table of contents

- [Route specification](#route-specification)
- [Why to test angular routes in my app?](#why-to-test-angular-routes-in-my-app)
- [Boilerplate](#boilerplate)


## Route specification

AngularJS routes enable you to create different URLs for different content in your application. Routes are sometimes left out but it is usually seen as a good practice for double-entry bookkeeping. In our example, we will use a very simple route configuration with only one route pointing to home.

```
http://angular-testing-recipes/#dashboard
http://angular-testing-recipes/#products
```

For example, when the browser loads these links, the same AngularJS application will be loaded (located at http://angular-testing-recipes/index.html), but AngularJS will look at the route (the part of the URL after the #) and decide what HTML template to show. 

## Why to test angular routes in my app?

> Params are passing via url and your app have to manipulate these informations. Are they correct? Really? How to validate these data?

When you test route params/informations, is used many security concepts. Based in security, all data in/out via app is insecure, because this you should test all ways. Let`s think about this route:

```
http://angular-testing-recipes/#product/1/edit
```

```javascript
  ...
  $routeProvider.when('/product/:id/edit', {
    templateUrl: 'edit.html',
    controller: 'ProductCtrl'
  })
  ...
```

This route is used for edit a specific product of your app, ok? But how to check if `:id` param is a number really? A simple way is using resolve for this, job. 

Many apps do this in controllers, but it`s not correct because this responsible is more of route then controller and if resolve is used for it your app don`t load controller, view and other resources for that page.


```javascript
  ...
  $routeProvider.when('/product/:id/edit', {
    templateUrl: 'edit.html',
    controller: 'ProductCtrl', 
    resolve: {
      // id validation happens here
      ...
    }
  })
  ...
```


## Boilerplate

> This code is using [ngRoute module](ngRoute module), but the concept is the same for other route modules.

This feature is defined based in your necessity in app. For example, let`s take a look in this route spec:

```javascript
(function() {
  'use strict';

  angular.module('myRouteApp', ['ngRoute']).config(function($routeProvider){
    $routeProvider.when('/dashboard', {
      templateUrl: 'dashboard.tpl.html',
      controller: 'DashboardCtrl'
    })
    .otherwise({ redirectTo:'/dashboard' });
  });

}());
```

Based in this route specification, our tests for coverage this feature with behaviour expected is:

```javascript
describe('routes', function(){
  'use strict';

  var $route, $rootScope, $location, $httpBackend;

  // load the application module
  beforeEach(module('myRouteApp'));

  beforeEach(inject(function (_$route_, _$rootScope_, _$location_, _$httpBackend_){
    $route = _$route_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', 'dashboard.tpl.html').respond('dashboard');
    $rootScope.showLogs = false;
  }));

  it('should navigate to dashboard', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/dashboard');
    });
    expect($location.path()).toBe('/dashboard');
    expect($route.current.templateUrl).toBe('dashboard.tpl.html');
    expect($route.current.controller).toBe('DashboardCtrl');
  });

  it('should redirect not registered urls to dashboard', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/incorrect-route');
    });
    expect($location.path()).toBe('/dashboard');
    expect($route.current.templateUrl).toBe('dashboard.tpl.html');
    expect($route.current.controller).toBe('DashboardCtrl');
  });
});
```
