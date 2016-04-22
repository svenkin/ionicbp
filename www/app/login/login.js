angular.module('login', []).config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'app/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
  })
  .controller('LoginCtrl', function ($scope, $log, UserData, $ionicLoading, $ionicContentBanner, $state, localStorageService) {
    $scope.userData = {
      name: "",
      id: ""
    };
    $scope.login = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log($scope.userData.id, $scope.userData.name);
      UserData.login($scope.userData.id, $scope.userData.name).then(function (suc) {
        $ionicLoading.hide();
        localStorageService.set('user', suc.data);
        $state.go('app.dashboard');
      }, function (error) {
        $ionicLoading.hide();
        $ionicContentBanner.show({
          autoClose: 3000,
          text: ['Fehler beim Login!'],
          type: 'error'
        });
      })
    };
  });
