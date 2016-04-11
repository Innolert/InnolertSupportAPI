'use strict';
(function(){

class NewDeviceComponent {
  constructor($uibModal) {
    var ctrl = this;
    ctrl.$uibModal =  $uibModal;
  }

  open(){
    this.$uibModal.open({
      templateUrl: 'components/device.module/newDevice/newDeviceForm.html',
      controller: function(){},
      size: 'md'
    });

  }
}

angular.module('innolertApiApp.device')
  .component('newDevice', {
    templateUrl: 'components/device.module/newDevice/newDeviceTmpl.html',
    controller: NewDeviceComponent,
    controllerAs: 'vm'
  });

})();
