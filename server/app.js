/**
 * Main application file
 */

'use strict';
var http = require('http'),
  https = require('http');
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
if (config.env !== 'production') {
  var server = http.createServer(app);
}
else{
  var caArr = [];
  function readFileSyncToArray(element, index, array) {
    caArr.push(fs.readFileSync('../ssl/'+element , "utf8"));
  }
  [
    "STAR_innolert_com.ca-bundle",
    "innolert.csr"
  ].forEach(readFileSyncToArray)
  var server = http.createServer({
    key: fs.readFileSync('../ssl/innolert.key'),
    cert: fs.readFileSync('../ssl/STAR_innolert_com.crt'),
    ca: caArr
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
  require('http')
  .createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  })
  .listen(config.port, config.ip);
  app.angularFullstack = server.listen(config.env !== 'production' ? config.port : 443, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.env !== 'production' ? config.port : 443, app.get('env'));
  });

}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
