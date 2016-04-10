'use strict';

angular.module('innolertApiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('report', {
        url: '/report',
        template: '<report></report>'
      });
  });
