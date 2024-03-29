'use strict';
(function(){

class DevicesComponent {
  constructor($http,$scope,socket) {
    this.$http = $http;
    this.socket = socket;
    this.vm = {};
    this.vm.devices = [{
        name:"Choose option",
        token:"",
        hardware : {
          bt : {
            state : true,
            state_rep : "on"
          },
          wf : {
            state : true,
            state_rep : "on"
          },
          scr : {
            state : true,
            state_rep : "on"
          }
        }
      }
    ]
    this.vm.operations = [
      {
        title : "Bt toggle",
        key: "bt"
      },
      {
        title : "wifi toggle",
        key: "wf"
      },
      {
        title : "Screen",
        key: "scr"
      }
    ];

  }

  operation(operation,device){
    device.hardware[operation.key].state = !device.hardware[operation.key].state
    var req = operation.key + device.hardware[operation.key].state_rep;
    device.hardware[operation.key].state_rep = (device.hardware[operation.key].state == true ? "on" : "off")
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
