angular.module('app.dashboard', []).config(function ($stateProvider) {
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    })
})
.controller('DashboardCtrl', function ($scope, $log) {

});
