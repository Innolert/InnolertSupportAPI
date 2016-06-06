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
    console.log(changesObj);
    var selectedDevice = this.model.selectedDevice = changesObj.device.currentValue;
    if(selectedDevice){
      if(!changesObj.device.previousValue && changesObj.device.currentValue){
        console.log("First time attached");
        this.showNotification("The device is currently busy, please try again later");
      }
      else if(changesObj.device.currentValue._id != changesObj.device.previousValue._id){
        console.log("new device");
        this.showNotification("new device");
      }
      else{
        console.log("same device with changes");
        if(changesObj.device.currentValue.device[0].state.isDeviceBusy)
          this.showNotification("The device is currently busy, please try again later");
      }
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
    console.log("calling recordVideoToggle" , {status: this.model.selectedDevice.device[0].state.videoRecorded.isVideoRecording});
    this.onVideoRecordToggle({status: this.model.selectedDevice.device[0].state.videoRecorded.isVideoRecording});
    this.model.selectedDevice.device[0].state.videoRecorded.isEventPassedToDevice = true;
  }
  recordToggle(){
    console.log("calling recordToggle" , {status : this.model.selectedDevice.device[0].state.audioRecorded.isAudioRecording});
    this.onRecordToggle({status : this.model.selectedDevice.device[0].state.audioRecorded.isAudioRecording});
    this.model.selectedDevice.device[0].state.audioRecorded.isEventPassedToDevice = true;
  }
  isDeviceAttached(){
    return this.model.selectedDevice && this.model.selectedDevice.device[0].hasOwnProperty('privateTokens') && this.model.selectedDevice.device[0].privateTokens.hasOwnProperty('fcm')
  }

  changeDeviceLockStatus(toLockDevice){
    console.log("calling changeDeviceLockStatus" ,{toLockDevice: true, withPassword: this.model.lockDevicePassword});
    this.model.selectedDevice.device[0].state.deviceLocked.isEventPassedToDevice = true;
    if(toLockDevice){
      this.onDeviceLockStatusChanged({toLockDevice: true, withPassword: this.model.lockDevicePassword})
    }else{
      this.onDeviceLockStatusChanged({toLockDevice: false})
    }
  }

  showNotification(message){
    this.onNotification({message: message,type: 'success',duration: 3000});
  }

}
angular.module('innolertApiApp.device')
  .component('deviceInfo', {
    templateUrl: 'components/device.module/deviceInfo/deviceInfoTmpl.html',
    controller: ['NgMap','$timeout', DeviceInfoComponent],
    controllerAs : "vm",
    bindings: {
      device: '<',
      onUpdate: '&',
      onVideoRecordToggle: '&',
      onRecordToggle: '&',
      onLocationUpdate: '&',
      onDeviceLockStatusChanged: '&',
      onNotification: '&'
    }
  });

})();
