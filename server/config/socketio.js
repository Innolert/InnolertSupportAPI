/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';
var _ = require('lodash');
var socketioConnections = require('./socketio.connections');

// When the user disconnects.. perform this
function onDisconnect(userId, socketId) {
  socketioConnections[userId].splice(socketioConnections[userId].indexOf(socketId), 1);
  if (!socketioConnections[userId])
    delete socketioConnections[userId]
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });
  if (!socketioConnections[socket.decoded_token._id])
    socketioConnections[socket.decoded_token._id] = [] //first time the client connects
  socketioConnections[socket.decoded_token._id].push(socket.client.id)
    // Insert sockets below
  require('../api/email/email.socket').register(socket);
  require('../api/endUser/endUser.socket').register(socket);
  require('../api/reportedItem/reportedItem.socket').register(socket);
  require('../api/appEvent/appEvent.socket').register(socket);

}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io socketioConnections and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  require('./socketio.connections').socketio = socketio;
  socketio.use(require('socketio-jwt').authorize({
    secret: config.secrets.session,
    handshake: true
  }));

  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;
    socket.connectedAt = new Date();
    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket.decoded_token._id, socket.client.id);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);


    socket.log('CONNECTED');
  });

}
