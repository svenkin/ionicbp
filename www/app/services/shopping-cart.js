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
  service.getFullPrice = function () {
    var cart = localStorageService.get('shopping-cart');
    if (cart !== null) {
      var price = 0;
      angular.forEach(cart, function (item) {
        price += item.price * item.quantity;
      });
      return price;
    }
    else {
      return 0;
    }
  };
  return service;
});
