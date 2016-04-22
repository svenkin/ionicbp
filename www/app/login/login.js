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
    .controller('LoginCtrl', function ($scope, $log,UserData, $ionicLoading) {
      $scope.userData = {
        name: "",
        id: ""
      };
      $scope.login = function () {
        $ionicLoading.show({
          template: 'Loading...'
        });

        UserData.login($scope.userData.id, $scope.userData.name).then(function (suc) {
          console.log('success', suc);
          $ionicLoading.hide();
        }, function (error) {
          console.log(error);
          $ionicLoading.hide();
        })
      };
       $scope.test = function () {

            UserData.login(10002, 'Brown').then(function (suc) {
                $log.log('Success', suc);
            }, function (err) {
                $log.log(err);
            });
        }
    });
