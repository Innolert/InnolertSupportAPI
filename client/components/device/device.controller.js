'use strict';

class DeviceController {
  //start-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('innolertApiApp')
  .controller('DeviceController', DeviceController);
