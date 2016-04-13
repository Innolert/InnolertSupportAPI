'use strict';

(function() {

/**
 * This service is encapsulate all the rest requet to the server
 */
function networkService($http,$location) {
  var Util = {
    /**
     * GET     /api/GIVIN_URL
     * POST    /api/GIVIN_URL
     * GET     /api/GIVIN_URL/GIVIN_ID
     * PUT     /api/GIVIN_URL/GIVIN_ID
     * DELETE  /api/GIVIN_URL/GIVIN_ID
     */
      buildPath : function(){
        var baseUri = ($location.$$host == 'localhost') ? "http://localhost:9000/" : $location.host();
        var path = (baseUri.slice(-1) == "/") ? "api/" : "/api/";
        return  baseUri+path;
      },
      POST : function(endPoint,data){
        console.log("Sending POST to : " , this.buildPath()+endPoint , "With data : " , data);
        return $http.post(this.buildPath()+endPoint , data)
      },
      GET : function(endPoint){
        console.log("Sending GET to : " , this.buildPath()+endPoint);
        return $http.get(this.buildPath()+endPoint)
      },
      PUL : {},
      DELETE : function(endPoint , id){
        console.log("Sending DELETE to : " , this.buildPath()+endPoint , "With id : " ,id);
        $http({
          method: 'DELETE',
          url: this.buildPath()+endPoint+"/"+id
        })
      },
      UPDATE : {},
      SHOW : {}
  };

  return Util;
}

angular.module('innolertApiApp.util')
  .factory('networkService', ['$http','$location',networkService]);

})();
