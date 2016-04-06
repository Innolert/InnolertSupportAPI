'use strict';
(function(){

class DevicesComponent {
  constructor($http,$scope,socket) {
    this.$http = $http;
    this.socket = socket;
    this.vm = {};
    this.vm.devices = [{
        name:"oleg",
        token:"d12XFPYu188:APA91bFpdprgfh3SMZfOjKCNeJtO2k-kpnuG7KNY2ZI9MxFe1wDhSWtIRiscisqvIhjqka2BUz8DRdmWdefEiJnnhbouOWErvBuEZZJPSJPYT1uwr2LenzZkVSd7zkSOFKnEYRL9JckO",
      },{
        name:"max",
        token:"fn-qFJ6yJL0:APA91bHdhQn6GBqZAFNuW7tXbZm3e7okfLqmMe2pptiBeCsjOue3eYKEONe_ycMPTGF_fsNuUIhxNKbToSizmhRN_ZwjSfPumahdWfGtSuse_TWmDPwSpkNRiY_De5gjDV1UdZ9rV3ny"
      }
    ]
    this.vm.operations = [
      {
        title : "Bt toggle",
        key: "bt",
        state : true
      },
      {
        title : "wifi toggle",
        key: "wifi",
        state: true
      },
      {
        title : "Lock screen",
        key: "screen",
        state: true
      }
    ];

  }

  operation(operaion,device){
    var req = (operaion.state==true? operaion.key+"on" : operaion.key+"off");
    operaion.state =!operaion.state;
    console.log(req,device.token);
    this.$http.post('/api/orders', { message:  req , token : device.token});
  }

}

angular.module('innolertApiApp')
  .component('devices', {
    templateUrl: 'app/devices/devices.html',
    controller: DevicesComponent
  });

})();
