'use strict';
(function() {

  class DeviceComponent {
    constructor($uibModal, socket,deviceService) {
      var ctrl = this;
      ctrl.socket = socket;
      ctrl.$uibModal = $uibModal;
      ctrl.deviceService = deviceService;
      ctrl.model = {
        deviceList: null,
        selectedDevice: null
      };
    }

    $onInit() {
      this.deviceService.fetchEndUsers()
        .then((response) => {
          var ctrl = this;
          this.model.deviceList = response.data;
          this.socket.syncUpdates('endUser', this.model.deviceList,(event,item,array)=> {
            if(event == "updated")
              ctrl.model.selectedDevice = item;
          })
        })
    }
    updateList(){
      return this.model.deviceList
    };
    updateDeviceInfo(){
      return this.model.selectedDevice
    }
    attachDeviceToInfoComponent(device){
      this.model.selectedDevice = device;
    }
    showAdditionInfo(){
      return this.model.selectedDevice != null;
    }
    onRemove(device){
      this.deviceService.removeEndUser(device._id);
    }
    recordToggle(status){
      this.deviceService.toggleRecord(status,this.model.selectedDevice._id);
    }
    getLocation(){
      this.networkService.POST('orders', {endUser: this.model.selectedDevice._id , message: 'get_location'})
    }




    toggleResitration() {
      var deviceService = this.deviceService;
      var registrationModelInstance = this.$uibModal.open({
        // template: '<device-resitration></device-resitration>',
        templateUrl: 'components/device.module/deviceRegistration/deviceRegistrationTmpl.html',
        size: 'md',
        controllerAs: 'vm',
        controller: ['$uibModalInstance',function($uibModalInstance) {
          var ctrl = this;
          ctrl.$uibModalInstance = $uibModalInstance;
          ctrl.model = {
            newDevice: {
              name: null,
              mobileNumber: null,
              device:{
                brand: null
              }
            },
            supportedDevices: [{
              value: "Samsung",
              representation: "Samsung"
            }, {
              value: "LG",
              representation: "LG"
            }, {
              value: "Nexus",
              representation: "Nexus"
            }, {
              value: "Iphone",
              representation: "Iphone"
            }]
          }
          ctrl.save = function() {
            this.$uibModalInstance.close(ctrl.model.newDevice);
          };

          ctrl.cancel = function() {
            this.$uibModalInstance.dismiss(null);
          };
        }]

      });
      registrationModelInstance.result.then((data) => {
        deviceService.newEndUser(data)
      })
    }

    recordVideoToggle(status){
      this.deviceService.toggleVideoRecord(status,this.model.selectedDevice._id);
    }

  }

  angular.module('innolertApiApp.device')
    .component('deviceAppContainer', {
      templateUrl: 'components/device.module/appContainer/deviceAppTmpl.html',
      controller: ['$uibModal','socket','deviceService',DeviceComponent],
      controllerAs: "vm"
    });

})();
