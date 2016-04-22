angular.module('app.shoppingCart', []).config(function ($stateProvider) {
    $stateProvider.state('app.shoppingCart', {
      url: '/shopping-cart',
      views: {
        'menuContent': {
          templateUrl: 'app/shopping-cart/shopping-cart.html',
          controller: 'ShoppingCartCtrl'
        }
      }
    })
  })
  .controller('ShoppingCartCtrl', function ($scope, $log, localStorageService, shoppingCart) {
    $scope.price = shoppingCart.getFullPrice();
    $scope.cart = localStorageService.get('shopping-cart');
    $scope.changeQuantity = function () {
      localStorageService.set('shopping-cart', $scope.cart);
      $scope.price = shoppingCart.getFullPrice();
    };
    $scope.remove = function (id) {
      delete $scope.cart[id];
      localStorageService.set('shopping-cart', $scope.cart);
      $scope.price = shoppingCart.getFullPrice();
    }
  });
