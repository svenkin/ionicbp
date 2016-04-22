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
            Orders.getOrdersByMbid(10002).then(function (suc) {
                $log.log('Success', suc);
            }, function (err) {
                $log.log(err);
            });
        }
    });