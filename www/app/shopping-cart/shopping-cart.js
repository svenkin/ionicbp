angular.module('app.shoppingCart', []).config(function ($stateProvider) {
        $stateProvider.state('app.shoppingCart', {
            url: '/shopping-cart',
            views: {
                'menuContent': {
                    templateUrl: 'app/shopping-cart/shopping-cart.html',
                    controller: 'ShoppingCartCtrl'
                }
            }
        })
    })
    .controller('ShoppingCartCtrl', function ($scope, $log, $rootScope, $ionicHistory, $timeout, localStorageService, shoppingCart, $ionicModal, Customer, newOrder, $ionicLoading, $ionicContentBanner, $state) {
        $scope.data = {};
        $scope.data.price = shoppingCart.getFullPrice();
        $scope.data.cart = localStorageService.get('shopping-cart');
        $rootScope.$on('item-added-cart',
            function () {
                $scope.data.cart = localStorageService.get('shopping-cart');
                $scope.data.price = shoppingCart.getFullPrice();
            });
        var customerId = 0;

        $scope.changeQuantity = function (id, quantity) {
            if (quantity < 0 || typeof quantity != 'number') {
                $scope.data.cart[id].quantity = 0;
            } else {
                $scope.data.cart[id].quantity = quantity;
                localStorageService.set('shopping-cart', $scope.data.cart);
                $rootScope.$broadcast('item-added-cart');
            }
        };
        $scope.remove = function (id) {
            $log.log(id);
            delete $scope.data.cart[id];
            localStorageService.set('shopping-cart', $scope.data.cart);
            $rootScope.$broadcast('item-added-cart');
        };

        $ionicModal.fromTemplateUrl('app/shopping-cart/sendOrder/sendOrder.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.sendOrder = function () {
            $scope.data.user = localStorageService.get('user');
            $scope.modal.show();
        }
        $scope.data.style = {};
        $scope.data.loaded = false;
        $scope.data.compName = "Kunden-Id";

        $scope.clearCart = function () {
            $scope.data.cart = {};
            $scope.data.price = 0;
            localStorageService.remove('shopping-cart');
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();

        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.data.style = {};
        $scope.data.loaded = false;
        $scope.data.compName = "Kunden-Id";
        $scope.data.canSend = false;
        $scope.send = function () {
            if ($scope.data.custfound) {
                newOrder.send(customerId).then(function (suc) {

                    localStorageService.remove('shopping-cart');
                    $ionicContentBanner.show({
                        autoClose: 3000,
                        text: ['Erfolgreich Bestellung versendet'],
                        type: 'success',
                        cancelOnStateChange: false
                    });
                    $scope.modal.hide();
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $scope.data.cart = {};
                    $rootScope.$broadcast('item-added-cart');
                    $state.go('app.dashboard');

                }, function (err) {
                    $ionicContentBanner.show({
                        autoClose: 3000,
                        text: [err],
                        type: 'error'
                    })
                });
            } else {
                $log.warn('Bestellung wurde nicht versendet!');
                $scope.data.style = {
                    border: "1px solid red"
                }
                $scope.data.loaded = true;
                $scope.data.custfound = false;
                $scope.data.compName = "Kunden-Id";
            }
        }
        $scope.$watch('data.custId', function (val) {
            if (val !== null && val !== undefined && val !== 0) {
                $ionicLoading.show({
                    template: '<div style="text-align:center">Überprüfe Kunden-Id...<br/><ion-spinner icon="spiral"></ion-spinner></div>'
                })

                Customer.getCustomerById(val).then(function (suc) {
                    console.log(suc);
                    customerId = suc.customerId;
                    $scope.data.customer = suc;
                    $timeout(function () {
                        $scope.data.style = {
                            border: "1px solid green"
                        };
                        $ionicLoading.hide();
                        $scope.data.loaded = true;
                        $scope.data.custfound = true;
                        $scope.data.canSend = true;
                        $scope.data.compName = suc.companyName;
                    }, 500)

                }, function (err) {
                    console.log(err);
                    $scope.data.customer = {};
                    $timeout(function () {
                        $scope.data.style = {
                            border: "1px solid red"
                        }
                        $ionicLoading.hide();
                        $scope.data.loaded = true;
                        $scope.data.custfound = false;
                        $scope.data.canSend = false;
                        $scope.data.compName = "Kunden-Id";
                    }, 500)
                })
            } else {
                $scope.data.customer = {};
                $scope.data.loaded = false;
                $scope.data.canSend = false;
                $scope.data.style = {
                    border: "none"
                };
                $scope.data.compName = "Kunden-Id";
            }
        });

    });