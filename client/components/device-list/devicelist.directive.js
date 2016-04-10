'use strict';

angular.module('innolertApiApp')
  .directive('deviceList', () => ({
    templateUrl: 'components/device-list/devicelist.html',
    restrict: 'E',
    controller: 'DeviceListController',
    controllerAs: 'devList'
  }));
