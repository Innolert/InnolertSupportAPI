'use strict';
(function(){

class DeviceComponent {
  constructor($scope) {
    this.model = {};
    this.model.device = $scope.vm.device;
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
