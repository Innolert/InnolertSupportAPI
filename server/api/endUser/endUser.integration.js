'use strict';

var app = require('../..');
import request from 'supertest';

var newEndUser;

describe('EndUser API:', function() {

  describe('GET /api/endUsers', function() {
    var endUsers;

    beforeEach(function(done) {
      request(app)
        .get('/api/endUsers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          endUsers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      endUsers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/endUsers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/endUsers')
        .send({
          name: 'New EndUser',
          info: 'This is the brand new endUser!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEndUser = res.body;
          done();
        });
    });

    it('should respond with the newly created endUser', function() {
      newEndUser.name.should.equal('New EndUser');
      newEndUser.info.should.equal('This is the brand new endUser!!!');
    });

  });

  describe('GET /api/endUsers/:id', function() {
    var endUser;

    beforeEach(function(done) {
      request(app)
        .get('/api/endUsers/' + newEndUser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          endUser = res.body;
          done();
        });
    });

    afterEach(function() {
      endUser = {};
    });

    it('should respond with the requested endUser', function() {
      endUser.name.should.equal('New EndUser');
      endUser.info.should.equal('This is the brand new endUser!!!');
    });

  });

  describe('PUT /api/endUsers/:id', function() {
    var updatedEndUser;

    beforeEach(function(done) {
      request(app)
        .put('/api/endUsers/' + newEndUser._id)
        .send({
          name: 'Updated EndUser',
          info: 'This is the updated endUser!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEndUser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEndUser = {};
    });

    it('should respond with the updated endUser', function() {
      updatedEndUser.name.should.equal('Updated EndUser');
      updatedEndUser.info.should.equal('This is the updated endUser!!!');
    });

  });

  describe('DELETE /api/endUsers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/endUsers/' + newEndUser._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when endUser does not exist', function(done) {
      request(app)
        .delete('/api/endUsers/' + newEndUser._id)
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
