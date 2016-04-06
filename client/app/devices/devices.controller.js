'use strict';
(function(){

class DevicesComponent {
  constructor($http,$scope,socket) {
    this.$http = $http;
    this.socket = socket;
    this.vm = {};
    this.vm.devices = [{
        name:"oleg",
        token:"",
        hardware : {
          bt : {
            state : true,
            state_rep : "on"
          },
          wifi : {
            state : true,
            state_rep : "on"
          },
          screen : {
            state : true,
            state_rep : "on"
          }
        }
      },{
        name:"max",
        token:"",
        hardware : {
          bt : {
            state : true,
            state_rep : "on"
          },
          wifi : {
            state : true,
            state_rep : "on"
          },
          screen : {
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
        key: "wifi"
      },
      {
        title : "Lock screen",
        key: "screen"
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
