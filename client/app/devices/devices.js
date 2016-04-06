'use strict';

angular.module('innolertApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('devices', {
        url: '/devices',
        template: '<devices></devices>'
      });
  });
