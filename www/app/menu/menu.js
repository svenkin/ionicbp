angular.module('app.menu', []).config(function ($stateProvider) {
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html',
            controller: 'AppCtrl'
        })
    })
    .controller('AppCtrl', function ($scope, $log, $cordovaDialogs, localStorageService, $ionicContentBanner, $state, $rootScope, shoppingCart, localStorageService, $ionicHistory,$ionicPopup) {
        $rootScope.$on('item-added-cart',
            function () {
                $scope.price = shoppingCart.getFullPrice();
            });
        $scope.logout = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Wirklich ausloggen?',
                okType: 'button-energized'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $state.go('login');
                    $ionicContentBanner.show({
                        autoClose: 3000,
                        text: ['Erfolgreich ausgeloggt!'],
                        type: 'success'
                    });
                    localStorageService.clearAll();
                } else {}
            });
        };

        $scope.goDashboard = function () {
            var role = localStorageService.get("role");
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            switch (role) {
            case "fieldWorker":
                $state.go('app.dashboard');
                break;
            case 'customer':
                $state.go('app.customerDashboard');
            }
        }
    });