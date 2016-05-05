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
      console.log(map);
    })
  }

  $onChanges(changesObj){
    this.model.selectedDevice = changesObj.device.currentValue
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
angular.module('innolertApiApp.device')
  .component('deviceInfo', {
    templateUrl: 'components/device.module/deviceInfo/deviceInfoTmpl.html',
    controller: ['NgMap','$timeout',DeviceInfoComponent],
    controllerAs : "vm",
    bindings: {
      device: '<',
      onUpdate: '&',
      onLocationUpdate: '&'
    }
  });

})();
