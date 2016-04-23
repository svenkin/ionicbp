angular.module('app.login', []).config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    })
  })
  .controller('LoginCtrl', function ($scope, $log, UserData, $ionicLoading, $ionicContentBanner, $state, localStorageService, $ionicSideMenuDelegate) {
    $scope.data={};
    $scope.data.choice = 'fieldWorker';
    $scope.userData = {
      name: "",
      id: ""
    };
    $scope.data.login = 'mitarbeiter'
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.login = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
        UserData.login($scope.userData.id, $scope.userData.name, $scope.data.choice).then(function (suc) {
          $ionicLoading.hide();
          localStorageService.set('user', suc.data);
          $scope.data.choice == 'fieldWorker' ? localStorageService.set('role', 'fieldWorker') : localStorageService.set('role', 'customer');
          $state.go('app.dashboard');
          $ionicSideMenuDelegate.canDragContent(true);
        }, function (error) {
          $ionicLoading.hide();
          $ionicContentBanner.show({
            autoClose: 3000,
            text: ['Fehler beim Login: ' + error.data],
            type: 'error'
          });
        });
        $ionicLoading.hide();
    };
  });
