'use strict';
(function(){

class DeviceListComponent {
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('innolertApiApp')
  .component('deviceList', {
    templateUrl: 'components/device-list/devicelist.html',
    controller: 'DeviceListComponent',
    controllerAs: 'devList'
  });

})();
