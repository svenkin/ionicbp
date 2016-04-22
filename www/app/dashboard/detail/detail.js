angular.module('app.dashboard.detail', []).config(function ($stateProvider) {
    $stateProvider.state('app.dashboard-detail', {
      url: '/dashboard/detail/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/dashboard/detail/detail.html',
          controller: 'DashboardDetailCtrl',
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
  .controller('DashboardDetailCtrl', function ($scope, $log, $stateParams, localStorageService) {
    $scope.data = {};
    var id = $stateParams.id;
    var orders = localStorageService.get('orders');
    angular.forEach(orders, function (order) {
      if (order.orderId == id) {
        $scope.data.order = order;
      }
    });

  });
