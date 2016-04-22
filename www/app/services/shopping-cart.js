angular.module('app').factory('shoppingCart', function ($log, localStorageService) {
  var service = {};
  service.addItem = function (data, quantity) {
    var cart = localStorageService.get('shopping-cart');
    if (cart === null) {
      cart = {};
    }
    if (cart[data.itemId]) {
      cart[data.itemId].quantity += quantity;
    }
    else {
      cart[data.itemId] = data;
      cart[data.itemId].quantity = quantity;
    }
    localStorageService.set('shopping-cart', cart);
  };
  return service;
});
