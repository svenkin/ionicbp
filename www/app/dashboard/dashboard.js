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
    .controller('DashboardCtrl', function ($scope, $log, UserData, Orders, Customer, $filter, $ionicLoading, $timeout, newOrder, localStorageService, $state, $rootScope) {
        var stateBefore = '';
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            if (from.name === 'login') {
                stateBefore = from.name;
                loadData();
            }else{
                stateBefore = '';
            }
        });
        $scope.data = {};

        function loadData() {
            console.log('Lade daten')
            $scope.$on('$ionicView.beforeEnter', function () {
                if (stateBefore === 'login') {
                    console.log('show')
                    $ionicLoading.show({
                        template: '<div style="text-align:center">Lade Daten...<br/><ion-spinner icon="spiral"></ion-spinner></div>'
                    });
                }
            })
            var id = localStorageService.get('user').fieldWorkerId || 'fail';
            Orders.getAllOrders(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderId', true);
                $scope.data.orders = ordered.splice(0, 5);
                $timeout(function () {
                    $ionicLoading.hide();
                }, 500)

            }, function (err) {
                $log.log(err);
                $ionicLoading.hide();
            })
        };
        loadData();

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