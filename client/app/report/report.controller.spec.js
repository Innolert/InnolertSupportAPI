'use strict';

describe('Component: ReportComponent', function () {

  // load the controller's module
  beforeEach(module('innolertApiApp'));

  var ReportComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ReportComponent = $componentController('ReportComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
