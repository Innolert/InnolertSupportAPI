'use strict';
(function() {

  class DeviceComponent {
    constructor(networkService, $uibModal, socket) {
      var ctrl = this;
      ctrl.socket = socket;
      ctrl.networkService = networkService;
      ctrl.$uibModal = $uibModal;
      ctrl.model = {
        deviceList: null,
        selectedDevice : null
      };
    }

    $onInit() {
      this.networkService.GET("endUsers")
        .then((response) => {
          this.model.deviceList = response.data;
          this.socket.syncUpdates('endUser', this.model.deviceList);
        })
    }
    updateList() {
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
      this.networkService.DELETE('endUsers' , device._id)
      // this.model.deviceList.splice(this.model.deviceList.indexOf(device),1)
      // console.log(device);
    }

    toggleResitration() {
      var networkService = this.networkService;
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
        console.log("the return data from the model is :", data);
        networkService.POST('endUsers' , data)
          .then((response) => {
            console.log(response);
          })
      })
    }


  }

  angular.module('innolertApiApp.device')
    .component('deviceAppContainer', {
      templateUrl: 'components/device.module/appContainer/deviceAppTmpl.html',
      controller: ['networkService','$uibModal','socket',DeviceComponent],
      controllerAs: "vm"
    });

})();
