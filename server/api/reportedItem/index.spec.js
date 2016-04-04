'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reportedItemCtrlStub = {
  index: 'reportedItemCtrl.index',
  show: 'reportedItemCtrl.show',
  create: 'reportedItemCtrl.create',
  update: 'reportedItemCtrl.update',
  destroy: 'reportedItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reportedItemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reportedItem.controller': reportedItemCtrlStub
});

describe('ReportedItem API Router:', function() {

  it('should return an express router instance', function() {
    reportedItemIndex.should.equal(routerStub);
  });

  describe('GET /api/reportedItems', function() {

    it('should route to reportedItem.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reportedItemCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reportedItems/:id', function() {

    it('should route to reportedItem.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reportedItemCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reportedItems', function() {

    it('should route to reportedItem.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reportedItemCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reportedItems/:id', function() {

    it('should route to reportedItem.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reportedItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reportedItems/:id', function() {

    it('should route to reportedItem.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reportedItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reportedItems/:id', function() {

    it('should route to reportedItem.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reportedItemCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
