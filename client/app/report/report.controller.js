'use strict';
(function(){

class ReportComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('innolertApiApp')
  .component('report', {
    templateUrl: 'app/report/report.html',
    controller: ReportComponent
  });

})();
