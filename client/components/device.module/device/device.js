'use strict';
(function(){

class DeviceComponent {
  constructor() {
    this.model = {};
    this.model.device = this.device;
  }

  deviceBrand(){
    try{
      this.model.device.device[0].brand
    }
    catch(err){
      return "brand-unknown";
    }
    switch(this.model.device.device[0].brand){
      case "LG" : return "brand-lg";
      case "Samsung" : return "brand-samsung";
      case "Nexus" : return "brand-nexus";
      case "Iphone" : return "brand-iphone";
      default : return "brand-unknown";
    }
  }
}



angular.module('innolertApiApp.device')
  .component('device', {
    templateUrl: 'components/device.module/device/deviceTmpl.html',
    controller: DeviceComponent,
    controllerAs: "vm",
    bindings: {
      device: '=',
      onExtend: '&',
      onRemove: '&'
    }
  });

})();
