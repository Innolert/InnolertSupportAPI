'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var endUserCtrlStub = {
  index: 'endUserCtrl.index',
  show: 'endUserCtrl.show',
  create: 'endUserCtrl.create',
  update: 'endUserCtrl.update',
  destroy: 'endUserCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var endUserIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './endUser.controller': endUserCtrlStub
});

describe('EndUser API Router:', function() {

  it('should return an express router instance', function() {
    endUserIndex.should.equal(routerStub);
  });

  describe('GET /api/endUsers', function() {

    it('should route to endUser.controller.index', function() {
      routerStub.get
        .withArgs('/', 'endUserCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/endUsers/:id', function() {

    it('should route to endUser.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'endUserCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/endUsers', function() {

    it('should route to endUser.controller.create', function() {
      routerStub.post
        .withArgs('/', 'endUserCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/endUsers/:id', function() {

    it('should route to endUser.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'endUserCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/endUsers/:id', function() {

    it('should route to endUser.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'endUserCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/endUsers/:id', function() {

    it('should route to endUser.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'endUserCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
