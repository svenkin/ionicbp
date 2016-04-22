angular.module('app.catalog.detail', []).config(function ($stateProvider) {
    $stateProvider.state('app.catalog.detail', {
      url: '/detail/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/catalog/detail/detail.html',
          controller: 'DetailCtrl',
          params: {
            id: null
          }
        }
      }

    })
  })
  .controller('DetailCtrl', function ($scope, $log, $stateParams) {
    console.log($stateParams);
  });
