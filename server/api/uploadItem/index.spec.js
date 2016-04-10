'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uploadItemCtrlStub = {
  index: 'uploadItemCtrl.index',
  show: 'uploadItemCtrl.show',
  create: 'uploadItemCtrl.create',
  update: 'uploadItemCtrl.update',
  destroy: 'uploadItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var uploadItemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './uploadItem.controller': uploadItemCtrlStub
});

describe('UploadItem API Router:', function() {

  it('should return an express router instance', function() {
    uploadItemIndex.should.equal(routerStub);
  });

  describe('GET /api/uploadItems', function() {

    it('should route to uploadItem.controller.index', function() {
      routerStub.get
        .withArgs('/', 'uploadItemCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/uploadItems/:id', function() {

    it('should route to uploadItem.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'uploadItemCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/uploadItems', function() {

    it('should route to uploadItem.controller.create', function() {
      routerStub.post
        .withArgs('/', 'uploadItemCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/uploadItems/:id', function() {

    it('should route to uploadItem.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'uploadItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/uploadItems/:id', function() {

    it('should route to uploadItem.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'uploadItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/uploadItems/:id', function() {

    it('should route to uploadItem.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'uploadItemCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
