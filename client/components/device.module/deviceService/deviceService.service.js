'use strict';

angular.module('innolertApiApp.device')
  .service('deviceService', ['networkService',function (networkService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.removeEndUser = function(id){
        return networkService.DELETE('endUsers' , id);
    }

    this.newEndUser = function(endUser){
      return networkService.POST('endUsers' , endUser);
    }

    this.fetchEndUsers = function(){
      return networkService.GET("endUsers")
    }

    this.toggleVideoRecord = function(status,endUserId){
      var operation = status ? "stop_back_video_record" : "start_back_video_record";
      return networkService.POST("orders" , {message: operation, endUser: endUserId})
    }

    this.toggleRecord = function(status,endUserId){
      var operation = status ? "stop_voice_record" : "start_voice_record";
      return networkService.POST("orders" , {message: operation, endUser: endUserId})
    }

    this.getLocation = function(deviceId){
      return networkService.POST('orders', {endUser: deviceId , message: 'get_location'})
    }

    this.changeDeviceLockStatus = function(toLockDevice,withPassword,deviceId){
      console.log("sending : " , {endUser: deviceId , message: toLockDevice ? 'lock_device' : 'reset_password' , additionalData : toLockDevice ? withPassword : []});
      return networkService.POST('orders', {endUser: deviceId , message: toLockDevice ? 'lock_device' : 'reset_password' , additionalData : toLockDevice ? withPassword : []})
    }

  }]);
