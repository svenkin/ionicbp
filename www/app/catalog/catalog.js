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
    $scope.colors = {
      'Ratiobohrer': 'category-green',
      'Spiralbohrer mit Morsekegel': 'category-red',
      'Spiralbohrer mit Zylinderschaft': 'category-yellow',
      'Stufenbohrer': 'category-blue',
      'Einlippenbohrer': 'category-orange',
      'Kombibohrer': 'category-turquoise',
      'Hochleistungsfräser': 'category-pink',
      'Kegel-Reibahlen': 'category-lavender',
      'Flachsenker': 'category-cyan',
      'Maschinen-Gewindebohrer': 'category-lightcoral',
      'Spiralisierte Tieflochbohrer': 'category-gold',
      'Aufbohrer': 'category-silver',
      'Hand-Reibahlen': 'category-brown',
      'Zweilippenbohrer': 'category-rosybrown',
      'Zentrierbohrer': 'category-black',
      'Maschinen-Muttergewindebohrer': 'category-olive',
      'Hand-Gewindebohrer': 'category-teal'
    };
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
