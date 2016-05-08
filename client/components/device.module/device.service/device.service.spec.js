'use strict';

describe('Service: device.service', function () {

  // load the service's module
  beforeEach(module('innolertApiApp.device.service'));

  // instantiate service
  var device.service;
  beforeEach(inject(function (_device.service_) {
    device.service = _device.service_;
  }));

  it('should do something', function () {
    expect(!!device.service).toBe(true);
  });

});
