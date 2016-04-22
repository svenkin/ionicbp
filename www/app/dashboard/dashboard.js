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
    .controller('DashboardCtrl', function ($scope, $log, UserData, Orders, Customer, $filter, $ionicLoading, $timeout,newOrder) {
        $scope.data = {};
//        (function(){
//            newOrder.send(20010).then(function(){
//                
//            },function(){
//                
//            })
//        })();
    
        (function(){
             $ionicLoading.show({
                template: 'Loading...'
            });
            //            Customer.getCustomerById(20002);
            Orders.getAllOrders(10002).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderDate', true);
                $scope.data.orders = ordered.splice(ordered.length-5, 5);
                $log.log($scope.data.orders);
                $timeout(function () {
                    $ionicLoading.hide();
                }, 500)

            }, function (err) {
                $log.log(err);
                $ionicLoading.hide();
            })
        })();
        $scope.refresh = function () {
            $scope.data.orders = [];
            Orders.getAllOrders(10002).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderDate', true);
                $scope.data.orders = ordered.splice(ordered.length-5, 5);
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }, 500)

            }, function (err) {
                $log.log(err);
            })
        }
    });