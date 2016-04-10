'use strict';

class DeviceListController {
  //start-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('innolertApiApp')
  .controller('DeviceListController', DeviceListController);
