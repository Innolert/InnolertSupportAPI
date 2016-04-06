'use strict';
(function(){

class DevicesComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('innolertApiApp')
  .component('devices', {
    templateUrl: 'app/devices/devices.html',
    controller: DevicesComponent
  });

})();
