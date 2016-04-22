angular.module('app.catalog.detail', []).config(function ($stateProvider) {
    $stateProvider.state('app.detail', {
      url: '/catalog/detail/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/catalog/detail/detail.html',
          controller: 'DetailCtrl',
          params: {
            id: 0
          }
        }
      },
         params: {
            id: 0
          }

    })
  })
  .controller('DetailCtrl', function ($scope, $log, $stateParams, localStorageService) {
    console.log($stateParams);
    var id = $stateParams.id;
    $scope.data = localStorageService.get('Items')[id];
    console.log($scope.data);
  });
