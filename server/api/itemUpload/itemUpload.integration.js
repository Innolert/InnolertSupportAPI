'use strict';

var app = require('../..');
import request from 'supertest';

var newItemUpload;

describe('ItemUpload API:', function() {

  describe('GET /api/itemUploads', function() {
    var itemUploads;

    beforeEach(function(done) {
      request(app)
        .get('/api/itemUploads')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          itemUploads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      itemUploads.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/itemUploads', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/itemUploads')
        .send({
          name: 'New ItemUpload',
          info: 'This is the brand new itemUpload!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newItemUpload = res.body;
          done();
        });
    });

    it('should respond with the newly created itemUpload', function() {
      newItemUpload.name.should.equal('New ItemUpload');
      newItemUpload.info.should.equal('This is the brand new itemUpload!!!');
    });

  });

  describe('GET /api/itemUploads/:id', function() {
    var itemUpload;

    beforeEach(function(done) {
      request(app)
        .get('/api/itemUploads/' + newItemUpload._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          itemUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      itemUpload = {};
    });

    it('should respond with the requested itemUpload', function() {
      itemUpload.name.should.equal('New ItemUpload');
      itemUpload.info.should.equal('This is the brand new itemUpload!!!');
    });

  });

  describe('PUT /api/itemUploads/:id', function() {
    var updatedItemUpload;

    beforeEach(function(done) {
      request(app)
        .put('/api/itemUploads/' + newItemUpload._id)
        .send({
          name: 'Updated ItemUpload',
          info: 'This is the updated itemUpload!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedItemUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedItemUpload = {};
    });

    it('should respond with the updated itemUpload', function() {
      updatedItemUpload.name.should.equal('Updated ItemUpload');
      updatedItemUpload.info.should.equal('This is the updated itemUpload!!!');
    });

  });

  describe('DELETE /api/itemUploads/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/itemUploads/' + newItemUpload._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when itemUpload does not exist', function(done) {
      request(app)
        .delete('/api/itemUploads/' + newItemUpload._id)
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
