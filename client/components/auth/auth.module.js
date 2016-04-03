'use strict';

angular.module('innolertApiApp.auth', [
  'innolertApiApp.constants',
  'innolertApiApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
