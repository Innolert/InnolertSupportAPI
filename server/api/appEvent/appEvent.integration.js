'use strict';

var app = require('../..');
import request from 'supertest';

var newAppEvent;

describe('AppEvent API:', function() {

  describe('GET /api/appEvents', function() {
    var appEvents;

    beforeEach(function(done) {
      request(app)
        .get('/api/appEvents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          appEvents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      appEvents.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/appEvents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/appEvents')
        .send({
          name: 'New AppEvent',
          info: 'This is the brand new appEvent!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAppEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created appEvent', function() {
      newAppEvent.name.should.equal('New AppEvent');
      newAppEvent.info.should.equal('This is the brand new appEvent!!!');
    });

  });

  describe('GET /api/appEvents/:id', function() {
    var appEvent;

    beforeEach(function(done) {
      request(app)
        .get('/api/appEvents/' + newAppEvent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          appEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      appEvent = {};
    });

    it('should respond with the requested appEvent', function() {
      appEvent.name.should.equal('New AppEvent');
      appEvent.info.should.equal('This is the brand new appEvent!!!');
    });

  });

  describe('PUT /api/appEvents/:id', function() {
    var updatedAppEvent;

    beforeEach(function(done) {
      request(app)
        .put('/api/appEvents/' + newAppEvent._id)
        .send({
          name: 'Updated AppEvent',
          info: 'This is the updated appEvent!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAppEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAppEvent = {};
    });

    it('should respond with the updated appEvent', function() {
      updatedAppEvent.name.should.equal('Updated AppEvent');
      updatedAppEvent.info.should.equal('This is the updated appEvent!!!');
    });

  });

  describe('DELETE /api/appEvents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/appEvents/' + newAppEvent._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when appEvent does not exist', function(done) {
      request(app)
        .delete('/api/appEvents/' + newAppEvent._id)
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
