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
  .controller('CatalogCtrl', function ($scope, $log, Orders) {
    Orders.getAllItems().then(function (suc) {
      $log.log('Success', suc);
    }, function (err) {
      $log.log('Success', err);
    });
  });
