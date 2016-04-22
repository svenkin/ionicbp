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
            UserData.getMbByLastName('').then(function (suc) {
                $log.log('Success', suc);
            }, function (err) {
                $log.log(err);
            })
            Orders.getAllItems().then(function (suc) {
                $log.log('Success', suc);
            }, function (err) {
                $log.log(err);
            });
        }
    });