'use strict';
(function(){

class DeviceComponent {
  constructor($scope) {
    this.model = {};
    this.model.device = $scope.vm.device;
  }
}

angular.module('innolertApiApp.device')
  .component('device', {
    templateUrl: 'components/device.module/device/deviceTmpl.html',
    controller: DeviceComponent,
    controllerAs: "vm",
    bindings: {
      device: '='
    }
  });

})();
