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
        lat : 25.7405442,
        lng : -100.392488
  		}
    }
    ctrl.model.selectedDevice = this.device;
  }

  $onInit(){
    /*Load the map instance*/
    this.NgMap.getMap()
    .then((map) => {
      this.model.map.instance = map;
      this.$timeout(() => {
        google.maps.event.trigger(this.model.map.instance, "resize");
        if(!this.model.selectedDevice.location.LatLng) this.model.selectedDevice.location.LatLng = this.model.map.LatLng;
        this.model.map.instance.markers[0].setPosition(this.model.selectedDevice.location.LatLng);
        this.model.map.instance.setCenter(this.model.map.LatLng);
        this.model.map.isLoaded = true;
      }, 2000)
    })
  }

  $onChanges(changesObj){
    this.model.selectedDevice = changesObj.device.currentValue
    this.model.map.instance.markers[0].setPosition(this.model.selectedDevice.location.LatLng);
    this.model.map.instance.setCenter(this.model.selectedDevice.location.LatLng);
    console.log(changesObj);
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
