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
  .controller('ShoppingCartCtrl', function ($scope, $log) {

  });
