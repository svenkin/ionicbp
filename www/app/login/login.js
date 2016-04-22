angular.module('app.login', []).config(function ($stateProvider) {
        $stateProvider.state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
    })
    .controller('LoginCtrl', function ($scope, $log,UserData) {
       $scope.test = function () {
            UserData.login(10002, 'Brown').then(function (suc) {
                $log.log('Success', suc);
            }, function (err) {
                $log.log(err);
            });
        }
    });