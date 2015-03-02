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


## Table of contents

- [Controllers](controllers/)
- [Filters](filters/)
- [Services](services/)
- [Decorators](decorators/)
- [Directives](directives/)
- [E2E](E2E/)