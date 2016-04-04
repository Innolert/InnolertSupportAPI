'use strict';

var app = require('../..');
import request from 'supertest';

var newReportedItem;

describe('ReportedItem API:', function() {

  describe('GET /api/reportedItems', function() {
    var reportedItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/reportedItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reportedItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reportedItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reportedItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reportedItems')
        .send({
          name: 'New ReportedItem',
          info: 'This is the brand new reportedItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReportedItem = res.body;
          done();
        });
    });

    it('should respond with the newly created reportedItem', function() {
      newReportedItem.name.should.equal('New ReportedItem');
      newReportedItem.info.should.equal('This is the brand new reportedItem!!!');
    });

  });

  describe('GET /api/reportedItems/:id', function() {
    var reportedItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/reportedItems/' + newReportedItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reportedItem = res.body;
          done();
        });
    });

    afterEach(function() {
      reportedItem = {};
    });

    it('should respond with the requested reportedItem', function() {
      reportedItem.name.should.equal('New ReportedItem');
      reportedItem.info.should.equal('This is the brand new reportedItem!!!');
    });

  });

  describe('PUT /api/reportedItems/:id', function() {
    var updatedReportedItem;

    beforeEach(function(done) {
      request(app)
        .put('/api/reportedItems/' + newReportedItem._id)
        .send({
          name: 'Updated ReportedItem',
          info: 'This is the updated reportedItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReportedItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReportedItem = {};
    });

    it('should respond with the updated reportedItem', function() {
      updatedReportedItem.name.should.equal('Updated ReportedItem');
      updatedReportedItem.info.should.equal('This is the updated reportedItem!!!');
    });

  });

  describe('DELETE /api/reportedItems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reportedItems/' + newReportedItem._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reportedItem does not exist', function(done) {
      request(app)
        .delete('/api/reportedItems/' + newReportedItem._id)
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
