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
    .controller('DashboardCtrl', function ($scope, $log, UserData, Orders, Customer, $filter, $ionicLoading, $timeout,newOrder,localStorageService) {
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
//            
//            Customer.getCustomerById(20002);
            var id = localStorageService.get('user').fieldWorkerId || 'fail';
            Orders.getAllOrders(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderId', true);
                $scope.data.orders = ordered.splice(0, 5);
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
            var id = localStorageService.get('user').fieldWorkerId || 'fail';
            $scope.data.orders = [];
            Orders.getAllOrders(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderId', true);
                $scope.data.orders = ordered.splice(0, 5);
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }, 500)

            }, function (err) {
                $log.log(err);
            })
        }
    });