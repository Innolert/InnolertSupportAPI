'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeapps = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('appEvent');
    });
  }

  $onInit() {
    this.$http.get('/api/appEvents').then(response => {
      this.awesomeapps = response.data;
      this.socket.syncUpdates('appEvent', this.awesomeapps);
    });
  }

  addApp() {
    if (this.newapp) {
      this.$http.post('/api/appEvents', { appName: this.newapp });
      this.newapp = '';
    }
  }

  deleteApp(app) {
    this.$http.delete('/api/appEvents/' + app._id);
  }
}

angular.module('innolertApiApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
