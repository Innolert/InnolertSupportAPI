'use strict';
(function(){

class NewDeviceComponent {
  constructor() {
  }
}

angular.module('innolertApiApp.device')
  .component('newDevice', {
    templateUrl: 'components/device.module/newDevice/newDeviceTmpl.html',
    controller: NewDeviceComponent
  });

})();
