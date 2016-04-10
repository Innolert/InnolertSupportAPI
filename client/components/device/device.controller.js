'use strict';
(function(){

class DeviceComponent {
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('innolertApiApp')
  .component('device', {
    templateUrl: 'components/device/device.html',
    controller: DeviceComponent,
    controllerAs: 'dev'
  });

})();
