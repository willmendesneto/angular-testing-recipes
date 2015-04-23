# Angular-testing-recipes
> Unit and e2e testing recipes for AngularJS

Even with AngularJS providing us a pretty testable way of work, we still need some boilerplate code (and some gotchas) to be able to exercise our code properly in our tests. This repository is a reference guide to help you to test your code.


## Setup

Please check if you have NodeJS/IoJS installed. If not, install NodeJS/IoJS and after installation add gulp globally running the command

```bash
$ npm install -g gulp
```

For install required packages for run the repo

```bash
$ npm install && bower install
```


## Run tests

```bash
# run the tests without watch
$ gulp test
# run the tests without watch
$ gulp tdd
```


## Run default tasks
```bash
$ gulp
```


## How to contribute

Want to file a bug, or you would like to contribute with some code or improve documentation? Excellent! Angular Testing Recipes uses the same [Contribution guide of Angular project](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type) for commits/Pull Requests:

- feat: A new feature;
- fix: A bug fix;
- docs: Documentation only changes;
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc);
- refactor: A code change that neither fixes a bug or adds a feature;
- perf: A code change that improves performance;
- test: Adding missing tests;
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation;


## Table of contents

- [Controllers](controllers/)
- [Filters](filters/)
- [Services](services/)
- [Decorators](decorators/)
- [Directives](directives/)
- [Routes](routes/)
- [E2E](E2E/)
