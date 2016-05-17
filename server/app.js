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
if (config.seedDB && config.env === 'production') { require('./config/productionSeed'); }
else if(config.seedDB && config.env === 'development') { require('./config/developmentSeed');}

// Setup server
var app = express();
var server;
var serverHttp = require('http').createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});
var serverHttps = null;
if (app.get('env') === 'production') {
  var caArr = [];
  function readFileSyncToArray(element, index, array) {
    caArr.push(fs.readFileSync('../ssl/'+element , "utf8"));
  }
  [
    "STAR_innolert_com.ca-bundle",
    "innolert.csr"
  ].forEach(readFileSyncToArray)
  serverHttps = require('https').createServer({
    key: fs.readFileSync('../ssl/innolert.key'),
    cert: fs.readFileSync('../ssl/STAR_innolert_com.crt'),
    ca: caArr
  }, app);
}
serverHttps == null  ? server = serverHttp : server = serverHttps
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {

  app.angularFullstack = server.listen(app.get('env') !== 'production' ? config.port : 443, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', app.get('env') !== 'production' ? config.port : 443, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
