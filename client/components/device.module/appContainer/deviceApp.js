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
        selectedDevice : "max"
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
      console.log("in app" , device);
      this.model.selectedDevice = device;
    }

    toggleResitration() {
      var networkService = this.networkService;
      var registrationModelInstance = this.$uibModal.open({
        // template: '<device-resitration></device-resitration>',
        templateUrl: 'components/device.module/deviceRegistration/deviceRegistrationTmpl.html',
        size: 'md',
        controllerAs: 'vm',
        controller: function($uibModalInstance) {
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
        }

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
      controller: DeviceComponent,
      controllerAs: "vm"
    });

})();
