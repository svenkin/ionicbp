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
    .controller('DashboardCtrl', function ($scope, $log, UserData) {
        $scope.test = function () {
            UserData.login(10002, 'Brown').then(function (suc) {
                $log.log('Success', suc);
            }, function (err) {
                $log.log(err);
            });
        }
    });