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
    .controller('DashboardCtrl', function ($scope, $log, UserData,Orders,Customer) {
    $scope.data = {};
        $scope.test = function () {
//            Customer.getCustomerById(20002);
            Orders.getAllOrders(10002).then(function (ord) {
                $scope.data.orders = ord;
            }, function (err) {
                $log.log(err);
            })
        }
    });