'use strict';
(function(){

class DeviceInfoComponent {
  constructor(NgMap,$timeout,$http) {
    var ctrl = this;
    ctrl.NgMap = NgMap;
    ctrl.$timeout = $timeout;
    ctrl.$http = $http;
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
    })
  }

  $onChanges(changesObj){
    this.model.selectedDevice = changesObj.device.currentValue
    this.NgMap.getMap()
    .then((map) => {
      this.$timeout(() => {
        google.maps.event.trigger(this.model.map.instance, "resize");
        this.model.map.instance.markers[0].setPosition(this.model.map.LatLng);
        this.model.map.instance.setCenter(this.model.map.LatLng);
        this.model.map.isLoaded = true;
      }, 1000)

    })
  }

}
angular.module('innolertApiApp.device')
  .component('deviceInfo', {
    templateUrl: 'components/device.module/deviceInfo/deviceInfoTmpl.html',
    controller: ['NgMap','$timeout','$http',DeviceInfoComponent],
    controllerAs : "vm",
    bindings: {
      device: '<',
      onUpdate: '&',
      onLocationUpdate: '&'
    }
  });

})();
