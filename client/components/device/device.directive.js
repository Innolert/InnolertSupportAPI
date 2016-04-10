'use strict';

angular.module('innolertApiApp')
  .directive('device', () => ({
    templateUrl: 'components/device/device.html',
    restrict: 'E',
    controller: 'DeviceController',
    controllerAs: 'dev'
  }));
