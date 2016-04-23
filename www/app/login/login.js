angular.module('app.login', []).config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
        })
    })
    .controller('LoginCtrl', function ($scope, $log, UserData, $ionicLoading, $ionicContentBanner, $state, localStorageService, $ionicSideMenuDelegate, Customer) {
        $scope.data = {};
        $scope.data.choice = 'fieldWorker';
        $scope.userData = {};
        $scope.data.login = 'mitarbeiter'
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.login = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            $log.log($scope.data.login, $scope.userData.id, $scope.userData.name);
            switch ($scope.data.login) {
            case 'mitarbeiter':
                $log.log('test');
                UserData.login($scope.userData.id, $scope.userData.name).then(function (suc) {

                    localStorageService.set('user', suc.data);
                    localStorageService.set('role', 'fieldWorker');
                    $ionicLoading.hide();
                    $state.go('app.dashboard');
                    $ionicSideMenuDelegate.canDragContent(true);
                }, function (error) {
                    $ionicLoading.hide();
                    $ionicContentBanner.show({
                        autoClose: 3000,
                        text: ['Fehler beim Login'],
                        type: 'error'
                    });
                });
                break;
            case 'kunde':
                Customer.getCustomerById($scope.userData.id).then(function (suc) {
                    $log.log(suc);
                    localStorageService.set('role', 'customer');
                    localStorageService.set('customer', suc);

                    $ionicSideMenuDelegate.canDragContent(true);
                    $state.go('app.dashboard');
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicContentBanner.show({
                        autoClose: 3000,
                        text: ['Id konnte nicht gefunden werden'],
                        type: 'error'
                    });
                    $ionicLoading.hide();
                })
                break;
            default:
                $ionicLoading.hide();
                break;

            }



        };
    });