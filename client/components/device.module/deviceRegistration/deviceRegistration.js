'use strict';
(function(){

class RegistrationComponent {
  constructor() {
    var ctrl = this;
  }

}

angular.module('innolertApiApp.device')
  .component('deviceResitration', {
    templateUrl: 'components/device.module/deviceRegistration/deviceRegistrationTmpl.html',
    controller: RegistrationComponent,
    controllerAs: 'vm'
  });


})();
