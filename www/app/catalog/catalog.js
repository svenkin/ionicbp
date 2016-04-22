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
  .controller('CatalogCtrl', function ($scope, $log, localStorageService) {
    $scope.allProducts = [];
    $scope.allProducts = localStorageService.get('Items');
  });
