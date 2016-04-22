angular.module('app.dashboard', []).config(function ($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            }
        })
    })
    .controller('DashboardCtrl', function ($scope, $log, UserData,Orders) {
        $scope.test = function () {
            Orders.getOrdersByMbid(10002).then(function (ord) {
                $log.log('merge',ord);
                Orders.getAllItems().then(function (suc) {
               Orders.mergeOrderAndItems(ord.data);
            }, function (err) {
                $log.log(err);
            });
                
            }, function (err) {
                $log.log(err);
            })
        }
    });