'use strict';
(function(){

class NewDeviceComponent {
  constructor() {
    var ctrl = this;
  }

}

angular.module('innolertApiApp.device')
  .component('newDevice', {
    templateUrl: 'components/device.module/newDevice/newDeviceTmpl.html',
    controller: NewDeviceComponent,
    controllerAs: 'vm',
    bindings: {
      newDeviceResigtration: '&'
    }
  });

})();
