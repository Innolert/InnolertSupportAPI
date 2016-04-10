'use strict';

var app = require('../..');
import request from 'supertest';

var newUploadItem;

describe('UploadItem API:', function() {

  describe('GET /api/uploadItems', function() {
    var uploadItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/uploadItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          uploadItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      uploadItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/uploadItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/uploadItems')
        .send({
          name: 'New UploadItem',
          info: 'This is the brand new uploadItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUploadItem = res.body;
          done();
        });
    });

    it('should respond with the newly created uploadItem', function() {
      newUploadItem.name.should.equal('New UploadItem');
      newUploadItem.info.should.equal('This is the brand new uploadItem!!!');
    });

  });

  describe('GET /api/uploadItems/:id', function() {
    var uploadItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/uploadItems/' + newUploadItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          uploadItem = res.body;
          done();
        });
    });

    afterEach(function() {
      uploadItem = {};
    });

    it('should respond with the requested uploadItem', function() {
      uploadItem.name.should.equal('New UploadItem');
      uploadItem.info.should.equal('This is the brand new uploadItem!!!');
    });

  });

  describe('PUT /api/uploadItems/:id', function() {
    var updatedUploadItem;

    beforeEach(function(done) {
      request(app)
        .put('/api/uploadItems/' + newUploadItem._id)
        .send({
          name: 'Updated UploadItem',
          info: 'This is the updated uploadItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUploadItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUploadItem = {};
    });

    it('should respond with the updated uploadItem', function() {
      updatedUploadItem.name.should.equal('Updated UploadItem');
      updatedUploadItem.info.should.equal('This is the updated uploadItem!!!');
    });

  });

  describe('DELETE /api/uploadItems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/uploadItems/' + newUploadItem._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when uploadItem does not exist', function(done) {
      request(app)
        .delete('/api/uploadItems/' + newUploadItem._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
