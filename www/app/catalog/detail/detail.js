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
  .controller('DetailCtrl', function ($scope, $log, $ionicHistory, localStorageService, shoppingCart, $ionicContentBanner, $stateParams, $rootScope, $state) {
    $scope.price = shoppingCart.getFullPrice();
    $rootScope.$on('item-added-cart',
      function () {
        $scope.price = shoppingCart.getFullPrice();
      });
    var id = $stateParams.id;
    $scope.gotoCart = function () {
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('app.shoppingCart');
    };
    $scope.data = {};
    $scope.data.isCustomer = false;
    $scope.$on('$ionicView.beforeEnter',function(){
        if(localStorageService.get("role") === 'customer'){
            $scope.data.isCustomer = true;
        }
        
    })
    
    $scope.items = localStorageService.get('Items')[id];
    $scope.data = {};
    $scope.data.quantity = 1;

    $scope.toShoppingCart = function () {
      if ($scope.data.quantity > 0) {
        shoppingCart.addItem($scope.items, $scope.data.quantity);
        $rootScope.$broadcast('item-added-cart');
        $ionicContentBanner.show({
          autoClose: 3000,
          text: ['Element zum Warenkorb hinzugefügt'],
          type: 'success'
        });
      } else {
        $ionicContentBanner.show({
          autoClose: 3000,
          text: ['Gültige Zahl eingeben!'],
          type: 'error'
        });
      }
    };
  });
