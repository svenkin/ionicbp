angular.module('app.catalog.detail', []).config(function ($stateProvider) {
    $stateProvider.state('app.catalog-detail', {
      url: '/catalog/detail/:id?isFromDashboard',
      views: {
        'menuContent': {
          templateUrl: 'app/catalog/detail/detail.html',
          controller: 'DetailCtrl',
          params: {
            id: 0,
            isFromDashboard: true
          }
        }
      }
    })
  })
  .controller('DetailCtrl', function ($scope, $log, localStorageService, shoppingCart, $ionicContentBanner, $stateParams, $rootScope, $state) {
    var id = $stateParams.id;
    $scope.gotoCart = function () {
      $state.go('app.shoppingCart');
    };
    $scope.items = localStorageService.get('Items')[id];
    $scope.toShoppingCart = function () {
      shoppingCart.addItem($scope.items, 1);
      $rootScope.$broadcast('item-added-cart');
      $ionicContentBanner.show({
        autoClose: 3000,
        text: ['Element zum Warenkorb hinzugefügt'],
        type: 'success'
      });
    };
  });
