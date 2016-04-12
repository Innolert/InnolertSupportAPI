'use strict';

(function() {

/**
 * This service is encapsulate all the rest requet to the server
 */
function networkService($http) {
  var Util = {
    /**
     * GET     /api/GIVIN_URL
     * POST    /api/GIVIN_URL
     * GET     /api/GIVIN_URL/GIVIN_ID
     * PUT     /api/GIVIN_URL/GIVIN_ID
     * DELETE  /api/GIVIN_URL/GIVIN_ID
     */
      baseUrl : "http://localhost:9000/api/",
      POST : function(endPoint){
        return $http.post(this.baseUrl+endPoint)
      },
      GET : function(endPoint){
        return $http.get(this.baseUrl+endPoint)
      },
      PUL : {},
      DELETE : {},
      UPDATE : {},
      SHOW : {}
  };

  return Util;
}

angular.module('innolertApiApp.util')
  .factory('networkService', networkService);

})();
