'use strict';
(function(){

class DeviceListComponent {
  constructor() {
  }
}

angular.module('innolertApiApp.device')
  .component('deviceList', {
    templateUrl: 'components/device/deviceList/deviceListTmpl.html',
    controller: DeviceListComponent
  });

})();
