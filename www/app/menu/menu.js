angular.module('app.menu',[]).config(function ($stateProvider) {
    $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu/menu.html',
    controller: 'AppCtrl'
  })
})
.controller('AppCtrl', function ($scope, $log) {

});
