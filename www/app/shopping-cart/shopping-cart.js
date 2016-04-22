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
    .controller('ShoppingCartCtrl', function ($scope, $log, localStorageService, shoppingCart, $ionicModal) {
        $scope.price = shoppingCart.getFullPrice();
        $scope.cart = localStorageService.get('shopping-cart');
        $scope.changeQuantity = function () {
            localStorageService.set('shopping-cart', $scope.cart);
            $scope.price = shoppingCart.getFullPrice();
        };
        $scope.remove = function (id) {
            delete $scope.cart[id];
            localStorageService.set('shopping-cart', $scope.cart);
            $scope.price = shoppingCart.getFullPrice();
        };

        $ionicModal.fromTemplateUrl('app/shopping-cart/sendOrder/sendOrder.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.sendOrder = function () {
            $scope.modal.show();
        }

        $scope.openModal = function () {
            $scope.modal.show();
        };
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


    });