'use strict';

angular.module('innolertApiApp', [
  'innolertApiApp.auth',
  'innolertApiApp.admin',
  'innolertApiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angularSpinner',
  'ngFlash',
  'innolertApiApp.device'

])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setTheme('smallButton', {
      color: 'black',
      radius: 2,
      width:3,
      top: '8px',
      position: 'relative',
    });
  }]);
