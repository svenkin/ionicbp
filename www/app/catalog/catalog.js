angular.module('app.catalog', []).config(function ($stateProvider) {
    $stateProvider.state('app.catalog', {
      url: '/catalog',
      views: {
        'menuContent': {
          templateUrl: 'app/catalog/catalog.html',
          controller: 'CatalogCtrl'
        }
      }
    })
  })
  .controller('CatalogCtrl', function ($scope, $log, localStorageService, shoppingCart, $rootScope, $ionicContentBanner, $ionicListDelegate) {
    $scope.allProducts = [];
    $scope.allProducts = localStorageService.get('Items');
    $scope.toCart = function (product) {
      shoppingCart.addItem(product, 1);
      $rootScope.$broadcast('item-added-cart');
      $ionicContentBanner.show({
        autoClose: 3000,
        text: ['Element zum Warenkorb hinzugefügt'],
        type: 'success'
      });
      $ionicListDelegate.closeOptionButtons();
    }
  });
