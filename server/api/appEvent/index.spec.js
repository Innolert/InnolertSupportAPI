'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var appEventCtrlStub = {
  index: 'appEventCtrl.index',
  show: 'appEventCtrl.show',
  create: 'appEventCtrl.create',
  update: 'appEventCtrl.update',
  destroy: 'appEventCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var appEventIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './appEvent.controller': appEventCtrlStub
});

describe('AppEvent API Router:', function() {

  it('should return an express router instance', function() {
    appEventIndex.should.equal(routerStub);
  });

  describe('GET /api/appEvents', function() {

    it('should route to appEvent.controller.index', function() {
      routerStub.get
        .withArgs('/', 'appEventCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/appEvents/:id', function() {

    it('should route to appEvent.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'appEventCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/appEvents', function() {

    it('should route to appEvent.controller.create', function() {
      routerStub.post
        .withArgs('/', 'appEventCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/appEvents/:id', function() {

    it('should route to appEvent.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'appEventCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/appEvents/:id', function() {

    it('should route to appEvent.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'appEventCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/appEvents/:id', function() {

    it('should route to appEvent.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'appEventCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
