/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import fs from 'fs';
import config from './config/environment';
global.__base = __dirname;
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
if (config.env !== 'production') {
  var server = require('http').createServer(app);
}
else{
  var caArr = [];
  function readFileSyncToArray(element, index, array) {
    caArr.push(fs.readFileSync('../'+element+".crt" , "utf8"));
  }
  [
    "AddTrustExternalCARoot",
    "COMODORSAAddTrustCA",
    "COMODORSADomainValidationSecureServerCA"
  ].forEach(readFileSyncToArray)
  var server = require('https').createServer({
    key: fs.readFileSync('../innolert.key', 'utf8'),
    cert: fs.readFileSync('../innolert_com.crt', 'utf8'),
    passphrase:  fs.readFileSync('../passphrase', 'utf8'),
    ca : caArr
  }, app);
}
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {

  app.angularFullstack = server.listen(config.env !== 'production' ? config.port : 443, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.env !== 'production' ? config.port : 443, app.get('env'));
  });
  if (config.env === 'production') {
   require('http')
     .createServer(function (req, res) {
       res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
       res.end();
     })
     .listen(config.port, config.ip);
   }
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
