angular.module('app.menu',[]).config(function ($stateProvider) {
    $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu/menu.html',
    controller: 'AppCtrl'
  })
})
.controller('AppCtrl', function ($scope, $log, localStorageService, $ionicContentBanner, $state) {
  $scope.logout = function () {
    localStorageService.set('user', '');
    $ionicContentBanner.show({
      autoClose: 3000,
      text: ['Erfolgreich ausgeloggt!'],
      type: 'info'
    });
    $state.go('app.login');
  }

});
