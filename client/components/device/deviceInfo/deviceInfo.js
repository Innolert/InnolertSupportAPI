'use strict';
(function(){

class DeviceInfoComponent {
  constructor() {
  }
}

angular.module('innolertApiApp.device')
  .component('deviceInfo', {
    templateUrl: 'components/device/deviceInfo/deviceInfoTmpl.html',
    controller: DeviceInfoComponent
  });

})();
