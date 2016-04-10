'use strict';

angular.module('innolertApiApp')
  .directive('deviceApp', () => ({
    templateUrl: 'components/device-app/deviceapp.html',
    restrict: 'E',
    controller: 'DeviceAppController',
    controllerAs: 'devApp'
  }));
