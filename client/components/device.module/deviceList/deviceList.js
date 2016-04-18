'use strict';
(function(){

class DeviceListComponent {
  constructor() {
    var ctrl = this;
    ctrl.model = {};
    ctrl.model.deviceList = this.list
  }
  $onInit(){

  }

  $onChanges(changesObj){
     this.model.deviceList = changesObj.list.currentValue
  }

  showDeviceInfo(device){
    this.onDeviceSelected({selectedDevice : device})
  }

  onRemove(device){
    console.log(device);
    this.removeDevice({toRemove:device})
  }
}

angular.module('innolertApiApp.device')
  .component('deviceList', {
    templateUrl: 'components/device.module/deviceList/deviceListTmpl.html',
    controller: DeviceListComponent,
    controllerAs: "vm",
    bindings: {
      list: '<',
      onUpdate: '&',
      onDeviceSelected: '&',
      removeDevice: '&'
    }
  });

})();
