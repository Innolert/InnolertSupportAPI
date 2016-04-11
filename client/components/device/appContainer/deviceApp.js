'use strict';
(function(){

class DeviceComponent {
  constructor() {
  }
}

angular.module('innolertApiApp.device')
  .component('deviceAppContainer', {
    templateUrl: 'components/device/appContainer/deviceAppTmpl.html',
    controller: DeviceComponent
  });

})();
