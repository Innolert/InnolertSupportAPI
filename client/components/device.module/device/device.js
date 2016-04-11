'use strict';
(function(){

class DeviceComponent {
  constructor() {
  }
}

angular.module('innolertApiApp.device')
  .component('device', {
    templateUrl: 'components/device.module/device/deviceTmpl.html',
    controller: DeviceComponent
  });

})();
