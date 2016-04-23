angular.module('app.menu', []).config(function ($stateProvider) {
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html',
            controller: 'AppCtrl'
        })
    })
    .controller('AppCtrl', function ($scope, $log, $cordovaDialogs, localStorageService, $ionicContentBanner, $state, $rootScope, shoppingCart) {
        $rootScope.$on('item-added-cart',
            function () {
                $scope.price = shoppingCart.getFullPrice();
            });
        $scope.logout = function () {
          $cordovaDialogs.confirm('Wirklich ausloggen?', 'Logout', ['Nein','Ja'])
            .then(function(buttonIndex) {
              if (buttonIndex == 1) {
                $ionicContentBanner.show({
                  autoClose: 3000,
                  text: ['Erfolgreich ausgeloggt!'],
                  type: 'success'
                });
                $state.go('login');
                localStorageService.clearAll();
              }
            });
        }
    });
