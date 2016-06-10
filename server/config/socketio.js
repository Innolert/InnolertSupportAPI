/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';
var _ = require('lodash');
var users = require('./users');

// When the user disconnects.. perform this
function onDisconnect(userId, socketId) {
  _.remove(users[userId],socketId)
  console.log("DISCONNECTED" , userId , socketId , users[userId]);
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });
  console.log("Keys on socket.client",socket.client.id);  
  console.log("Used _id : " , socket.decoded_token._id);  
  if(!users[socket.decoded_token._id])
      users[socket.decoded_token._id] = [] //first time the client connects
  users[socket.decoded_token._id].push(socket.client.id)
  console.log("New client is connecting", socket.decoded_token._id)

  console.log("Keys on users.socketio",Object.keys(users.socketio.sockets.connected))
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

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  require('./users').socketio = socketio;
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
