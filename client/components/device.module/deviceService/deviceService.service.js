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
      return networkService.POST('orders', {endUser: deviceId, message: 'get_location'})
    }

    this.changeDeviceLockStatus = function(toLockDevice,withPassword,deviceId){
      return networkService.POST('orders', {endUser: deviceId, message: toLockDevice ? 'lock_device' : 'reset_password' , additionalData : toLockDevice ? withPassword : []})
    }

    this.toggleWifi = function(status, deviceId) {
      let operation = status ? "wfoff" : "wfoN"
      return networkService.POST('orders', {endUser: deviceId, message: operation});
    }

    this.toggleBluetooth = function(status, deviceId){
      let operation = status ? "btoff" : "bton"
      return networkService.POST('orders', {endUser: deviceId, message: operation});
    }
  }]);
