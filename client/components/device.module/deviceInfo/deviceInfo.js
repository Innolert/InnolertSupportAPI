'use strict';
(function(){

class DeviceInfoComponent {
  constructor() {
    var ctrl = this;
    ctrl.model = {};
    ctrl.model.selectedDevice = this.device;
    }


  $onInit(){}

  $onChanges(changesObj){
    this.model.selectedDevice = changesObj.device.currentValue
  }

}
angular.module('innolertApiApp.device')
  .component('deviceInfo', {
    templateUrl: 'components/device.module/deviceInfo/deviceInfoTmpl.html',
    controller: DeviceInfoComponent,
    controllerAs : "vm",
    bindings: {
      device: '<',
      onUpdate: '&'
    }
  });

})();
