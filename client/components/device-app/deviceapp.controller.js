'use strict';
(function(){

class DeviceAppComponent {
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('innolertApiApp')
  .component('deviceApp', {
    templateUrl: 'components/device-app/deviceapp.html',
    restrict: 'E',
    controller: 'DeviceAppComponent',
    controllerAs: 'devApp'
  });

})();
