/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var users = require('../../config/users');
var _ = require('lodash');
import EndUserEvents from './endUser.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('endUser:' + event, socket);
    console.log("Creating listener for " , socket.decoded_token._id)
    EndUserEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    console.log("Emmiting event" , event);
    console.log()
    //console.log("Keys on socket",Object.keys(socket));
    //console.log("Keys on socket.client",Object.keys(socket.client));    
    //console.log("Keys on socket.client.sockets",socket.client.sockets);
    //console.log();
    //_.find(users.socketio.sockets, {id: '/#'+socket.client.id}).emit(event, doc)
    //users.socketio.sockets.sockets['/#'+socket.client.id].emit(event, doc);
    users.socketio.emit(event,doc)
    //socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    EndUserEvents.removeListener(event, listener);
  };
}
