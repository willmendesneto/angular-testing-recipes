
describe('Service: SampleHttpService', function () {
  'use strict';

  var SampleHttpService, httpBackend, q,
      response, MyModel;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, _SampleHttpService_, _$httpBackend_, $q) {
    q = $q;
    httpBackend = _$httpBackend_;
    SampleHttpService = _SampleHttpService_;
    response = [
      {id:1, name: 'Phone'},
      {id:2, name: 'Tablet'}
    ];

    MyModel = SampleHttpService.init({
      url: '/api/',
      cache: true
    });
    $rootScope.showLogs = false;
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('#$get', function () {
    httpBackend.whenGET('/api/products').respond(response);
    var products = null;
    MyModel.$get('products').then(function(data){
      products = data;
    });
    httpBackend.flush();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBe(2);
    expect(products[0].id).toBe(1);
    expect(products[1].id).toBe(2);
  });

  it('#$find', function () {
    httpBackend.whenGET('/api/products').respond(response);
    var products = null;
    MyModel.$find('products', {id: 1}).then(function(data){
      products = data;
    });
    httpBackend.flush();

    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe('Phone');
  });

  it('#$post', function () {
    var message = {id: 4, name: 'DVD Player'};

    httpBackend.whenPOST('/api/product', message).respond(function (method, url, data, headers) {

      expect(method).toBe('POST');
      expect(url).toBe('/api/product');
      expect(!!headers).toBe(true);
      var newProduct = angular.fromJson(data);
      response.push(newProduct);

      var result = [200];
      result.push({ data: newProduct });
      return result;
    });

    var result;
    MyModel.$post('product', message).then(function(){
      result = true;
    });
    httpBackend.flush();

    expect(response.length).toBe(3);
    expect(result).toBeTruthy();
  });

  it('#$put', function () {
    var message = {id: 2, name: 'Monitor'};

    httpBackend.whenPUT('/api/product', message).respond(function (method, url, data, headers) {
      var updatedProduct = angular.fromJson(data),
        resLength = response.length;

      expect(method).toBe('PUT');
      expect(url).toBe('/api/product');
      expect(!!headers).toBe(true);

      for (var i = 0; i < resLength; i++){
        if (updatedProduct.id === response[i].id) {
          response[i] = updatedProduct;
          var result = [200];
          result.push({ data: response[i] });
          return result;
        }
      }
    });

    var update = false;
    MyModel.$put('product', message).then(function(){
      update = true;
    });
    httpBackend.flush();

    expect(response.length).toBe(2);
    expect(response[1].id).toBe(2);
    expect(response[1].name).toBe('Monitor');
    expect(update).toBeTruthy();
  });

  it('#$delete', function () {
    var productId = 2;

    httpBackend.whenDELETE(/\/api\/product\/\d*/).respond(function(method, url, data, headers) {
      var id = parseInt(url.replace('/api/product/', ''));

      expect(method).toBe('DELETE');
      expect(url).toBe('/api/product/' + id);
      expect(!!headers).toBe(true);

      var resLength = response.length;
      for (var i = 0; i < resLength; i++){
        if (id === response[i].id) {
          response.splice(i, 1);
          var result = [200];
          result.push({ data: response });
          return result;
        }
      }
    });

    var deleted = false;
    MyModel.$delete('product/' + productId).then(function(){
      deleted = true;
    });
    httpBackend.flush();

    expect(response.length).toBe(1);
    expect(response[1]).toBeTypeOf('undefined');
    expect(deleted).toBeTruthy();
  });

});
