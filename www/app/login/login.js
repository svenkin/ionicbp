angular.module('app.login', []).config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    })
  })
  .controller('LoginCtrl', function ($scope, $log, UserData, $ionicLoading, $ionicContentBanner, $state, localStorageService, $ionicSideMenuDelegate) {
    $scope.userData = {
      name: "",
      id: ""
    };
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.login = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log($scope.userData.id, $scope.userData.name);
      UserData.login($scope.userData.id, $scope.userData.name).then(function (suc) {
        $ionicLoading.hide();
        localStorageService.set('user', suc.data);
        $state.go('app.dashboard');
        $ionicSideMenuDelegate.canDragContent(true);
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
