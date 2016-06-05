'use strict';
(function(){

class DeviceInfoComponent {
  constructor(NgMap,$timeout) {
    var ctrl = this;
    ctrl.NgMap = NgMap;
    ctrl.$timeout = $timeout;
    ctrl.model = {};
    ctrl.model.map = {
      isLoaded: false,
      instance: null,
      LatLng : {
        lat : 31.8883528, //default value the will be replaced
        lng : 37.9634055
      }
    }
    ctrl.model.selectedDevice = this.device;
  }

  $onInit(){
    /*Load the map instance*/
    this.NgMap.getMap()
    .then((map) => {
      this.model.map.instance = map;
    })
  }

  $onChanges(changesObj){
    var selectedDevice = this.model.selectedDevice = changesObj.device.currentValue;
    if(selectedDevice){
      console.log(selectedDevice);
      this.model.map.LatLng = this.model.selectedDevice.location.lastLocation.LatLng;
      this.$timeout(() => {
        google.maps.event.trigger(this.model.map.instance, "resize");
        if(!this.model.selectedDevice.location.LatLng) this.model.selectedDevice.location.LatLng = this.model.map.LatLng;
        this.model.map.instance.markers[0].setPosition(this.model.selectedDevice.location.LatLng);
        this.model.map.instance.setCenter(this.model.selectedDevice.location.LatLng);
        this.model.map.isLoaded = true;
        this.model.map.instance.setZoom(6);
      }, 2000)
    }


  }
  recordVideoToggle(){
    this.onVideoRecordToggle({status: this.model.selectedDevice.device[0].state.isVideoRecording});
    // this.model.isVideoRecording = !this.model.isVideoRecording;
  }
  recordToggle(){
    this.onRecordToggle({status : this.model.selectedDevice.device[0].state.isAudioRecording});
    // this.model.isAudioRecording = !this.model.isAudioRecording;
  }
  isDeviceAttached(){
    return this.model.selectedDevice && this.model.selectedDevice.device[0].hasOwnProperty('privateTokens') && this.model.selectedDevice.device[0].privateTokens.hasOwnProperty('fcm')
  }

  changeDeviceLockStatus(toLockDevice){
    // console.log(newStatus , this.model.lockDevicePassword);
    if(toLockDevice){
      this.onDeviceLockStatusChanged({toLockDevice: true, withPassword: this.model.lockDevicePassword})
    }else{
      this.onDeviceLockStatusChanged({toLockDevice: false})
    }
  }

}
angular.module('innolertApiApp.device')
  .component('deviceInfo', {
    templateUrl: 'components/device.module/deviceInfo/deviceInfoTmpl.html',
    controller: ['NgMap','$timeout',DeviceInfoComponent],
    controllerAs : "vm",
    bindings: {
      device: '<',
      onUpdate: '&',
      onVideoRecordToggle: '&',
      onRecordToggle: '&',
      onLocationUpdate: '&',
      onDeviceLockStatusChanged: '&'
    }
  });

})();
