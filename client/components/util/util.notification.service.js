'use strict';

(function() {

/**
 * This service is encapsulate all the rest requet to the server
 */
function networkService(Notification) {
  var service = {
    showSuccess: function(message){
      Notification.success(message);
    },
    showInfo: function(message){
      Notification.info(message)
    }
  };

  return service;
}

angular.module('innolertApiApp.util')
  .factory('notificationService', ['Notification',networkService]);

})();
