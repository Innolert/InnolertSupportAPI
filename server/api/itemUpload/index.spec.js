'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var itemUploadCtrlStub = {
  index: 'itemUploadCtrl.index',
  show: 'itemUploadCtrl.show',
  create: 'itemUploadCtrl.create',
  update: 'itemUploadCtrl.update',
  destroy: 'itemUploadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var itemUploadIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './itemUpload.controller': itemUploadCtrlStub
});

describe('ItemUpload API Router:', function() {

  it('should return an express router instance', function() {
    itemUploadIndex.should.equal(routerStub);
  });

  describe('GET /api/itemUploads', function() {

    it('should route to itemUpload.controller.index', function() {
      routerStub.get
        .withArgs('/', 'itemUploadCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/itemUploads/:id', function() {

    it('should route to itemUpload.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'itemUploadCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/itemUploads', function() {

    it('should route to itemUpload.controller.create', function() {
      routerStub.post
        .withArgs('/', 'itemUploadCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/itemUploads/:id', function() {

    it('should route to itemUpload.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'itemUploadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/itemUploads/:id', function() {

    it('should route to itemUpload.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'itemUploadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/itemUploads/:id', function() {

    it('should route to itemUpload.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'itemUploadCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
