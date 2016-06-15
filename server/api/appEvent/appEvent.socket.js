/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var socketioConnections = require('../../config/socketio.connections');
var _ = require('lodash');
const fcm = require('../../components/fcm.sender');
import AppEventEvents from './appEvent.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('appEvent:' + event, socket);

    AppEventEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    if (socketioConnections[doc.parentUser] && socketioConnections[doc.parentUser].indexOf(socket.client.id) != -1){
      socket.emit(event, doc);
      // fcm.sendToUserIdAppEventUpdates(doc.parentUser,doc);
    }
  };
}

function removeListener(event, listener) {
  return function() {
    AppEventEvents.removeListener(event, listener);
  };
}
