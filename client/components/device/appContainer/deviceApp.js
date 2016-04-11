'use strict';
(function(){

class DeviceComponent {
  constructor() {
  }
}

angular.module('innolertApiApp')
  .component('deviceAppContainer', {
    templateUrl: 'components/device/appContainer/deviceAppTmpl.html',
    controller: DeviceComponent
  });

})();
