'use strict';
(function(){

class DeviceComponent {
  constructor(networkService) {
    var ctrl = this;
    ctrl.networkService = networkService;
    ctrl.model = {};
    networkService.GET("endUsers")
    .then((response) => {
      this.model.deviceList = response.data
    })

  }
  updateList(data){
      return this.model.deviceList
  }
}

angular.module('innolertApiApp.device')
  .component('deviceAppContainer', {
    templateUrl: 'components/device.module/appContainer/deviceAppTmpl.html',
    controller: DeviceComponent,
    controllerAs: "vm"
  });

})();
