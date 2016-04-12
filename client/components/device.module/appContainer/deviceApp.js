'use strict';
(function(){

class DeviceComponent {
  constructor(networkService,$uibModal) {
    var ctrl = this;
    ctrl.networkService = networkService;
    ctrl.$uibModal = $uibModal;
    ctrl.model = {};
    networkService.GET("endUsers")
    .then((response) => {
      this.model.deviceList = response.data
    })

  }
  updateList(data){
      return this.model.deviceList
  };

  toggleResitration(){
    var registrationModelInstance = this.$uibModal.open({
      template: '<device-resitration></device-resitration>',
      controller: function () {

      },
      size: 'md'
    });

  }
}

angular.module('innolertApiApp.device')
  .component('deviceAppContainer', {
    templateUrl: 'components/device.module/appContainer/deviceAppTmpl.html',
    controller: DeviceComponent,
    controllerAs: "vm"
  });

})();
