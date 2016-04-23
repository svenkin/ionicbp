// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'Requestfactory',
    'angular-momentjs',
    'highcharts-ng',
    'app.menu',
    'app.login',
    'app.catalog',
    'app.catalog.detail',
    'app.dashboard.detail',
    'app.shoppingCart',
    'app.dashboard',
    'app.dashboard.customer',
    'jett.ionic.content.banner',
    'LocalStorageModule',
    'ngCordova'
  ])

  .run(function ($ionicPlatform, $moment, localStorageService, $state) {
    $moment.locale('de');

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      var user = localStorageService.get('user') || 'fail';
        var cust = localStorageService.get('customer') || 'fail';
      if (user !== 'fail' || cust !== 'fail') {
          localStorageService.remove('shopping-cart');
          if(user !== 'fail'){
              $state.go('app.dashboard');
          } else {
               $state.go('app.customerDashboard');
          }

      } else {
        $state.go('login');
        localStorageService.clearAll();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    localStorageServiceProvider.setPrefix('ZAK');
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
  })
  .constant('BaseUrl', 'http://zakitchallenge.azurewebsites.net/');
