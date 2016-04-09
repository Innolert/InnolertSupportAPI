'use strict';
(function(){

class ReportComponent {
  constructor($http) {
    this.$http = $http;
    this.vm = {};
    this.vm.images = [1,2]
    this.$http.get('/api/reportedItems').then(response => {
      this.vm.images = response.data;
      // this.socket.syncUpdates('appEvent', this.awesomeapps);
    });
  }
}

angular.module('innolertApiApp')
  .component('report', {
    templateUrl: 'app/report/report.html',
    controller: ReportComponent
  });

})();
