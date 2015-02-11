# Protractor
> Some aspects for Protractor usage in projects


## Table of contents
- [Why End to End (E2E) tests](#why-end-to-end-e2e-tests)
- [Why Protractor](#why-protractor)
- [Boilerplate](#boilerplate)
- [Best Practices](#best-practices)
  - [Page Objects](#page-objects)
    - [Why Page Objects](#why-page-objects)
    - [Page Object - Boilerplate](#page-object---boilerplate)
    - [Using Page Objects](#using-page-objects)
  - [Working with promises](#working-with-promises)
  - [Performance in your End to End Tests](#performance-in-your-end-to-end-tests)
  - [Using NodeJS in Protractor tests](#using-nodejs-in-protractor-tests)


## Why End to End (E2E) tests

End to End tests are pretty good tests for validate some aspects of your application , such as functionalities and interactions. For example, you will use End to End test in this cases:

- Validate if your component works on in your application, generating a "happy way";
- Validate interaction in your browser between backend and frontend, based in a complete operation, like a login, search and other validations;

> Unit Tests and End to End tests ever works together.


## Why Protractor

Protractor is a tool created for attend developers of an easier way, with a reasonable setup, low context-switching and sensible syntax using all power of WebDrivers can do for us.

Your configuration is very easy, that help in your use in applications.


## Boilerplate

> Basic step for use end-to-end tests

```javascript
describe('angularjs homepage todo list', function() {

  beforeEach(function() {
    // before function
    ...
  });

  afterEach(function() {
    //after function
    ...
  });

  it('should add a todo', function() {
    browser.get('http://www.angularjs.org');

    element(by.model('todoText')).sendKeys('write a protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
});
```


## Best Practices


### Page Objects


#### Why Page Objects

Page Object is a object model with properties and methods, wrapping page elements and interactions event (click, submit, etc). Your objective is simplify the test scripts and upgrade your code reuse in end-to-end tests, reducing amount of duplicate code and centralyzing UI modifications and fixes in only one file.


#### Page Object - Boilerplate

> A example of Page object construction

```javascript
var PageObject = function() {
    // properties
    this.property = element(by.id('property'))
    ...
}

module.exports = new PageObject();
```


#### Using Page Objects

You should use Page Objects in your application tests. It's a best practice for manutenibility and sanity for your tests. A simple example using Page Objects in your protractor tests.

```javascript

describe('angularjs homepage todo list', function() {
  var pageObject = require('page.js');

  beforeEach(function() {
    // before function
    browser.get('<your-url>');
    ...
  });

  afterEach(function() {
    //after function
    ...
  });

  it('Page Object should be "Angular Testing Recipes" in your text content by default', function() {
    expect(pageObject.property.getText()).toEqual('Angular Testing Recipes');
  });
});
```


### Working with promises

All page events returns for you test like as promise. In this case, your have to resolve the promises get your result and finish your test correctly. For example

```javascript
PageObject.property.click();
// your assertions are here
```

can be used this way too

```javascript
PageObject.property.click().then(function(){
   // your assertions are here
   ...
});
```

You can use `waitForAngular()` method for that Protractor waits for AngularJS event finalization.

```javascript
browser.waitForAngular();
```

`expect()` method resolve the promises in your tests. For example:

```javascript
expect(PageObject.property.getText()).toEqual('your test');
```

### Performance in your End to End Tests

Test your application with animation disabled. In many times has no sense to test your app with animations enabled and with this resource disabled the tests run more fast.

```javascript
allowAnimations(false);
```

Disable angular debug informations

```javascript
$compileProvider.debugInfoEnabled(false);
```


### Using NodeJS in Protractor tests

In some cases you can the option of use NodeJS with protractor methods for more elaborated tests. In this example we are testing a ordenation click event in a tablesorter component, but using NodeJS for set table headers in our tests and caching table headers elements (get all elements that `by.css()` method return, resolving your promise and managing tests based in `items` values).

```javascript
// spec.js
describe('TableSorter: testing component', function () {

  var tableSorter;

  it('changes active table order based in user\'s choice', function () {

    browser.get('/');

    element.all(by.css('.table-sorter-order')).then(function(items) {

      expect(items.length).toBe(1);

      //  Testing all elements with ordenation method
      ['Name', 'Email'].forEach(function(text, key){

        describe('Testing Item "'+text+'"', function(){
          //  Order Asc
          it('ASC ordenation', function () {
            expect(items[key].getText()).toBe(text);
            items[key].click();
            tableSorter = element(by.css('.table-sorter-order.asc'));
            expect(tableSorter.getText()).toEqual(text);
          });
          //  Order Desc
          it('DESC ordenation', function () {
            items[key].click();
            tableSorter = element(by.css('.table-sorter-order.desc'));
            expect(tableSorter.getText()).toEqual(text);
          });
        });
      });
    });
  });

});
```
