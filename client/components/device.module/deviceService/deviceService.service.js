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

    this.toggleVideoRecord = function(){
      var operation = status ? "stop_back_video_record" : "start_back_video_record";
      return networkService.POST("orders" , {message: operation, endUser: endUserId})
    }

  }]);
