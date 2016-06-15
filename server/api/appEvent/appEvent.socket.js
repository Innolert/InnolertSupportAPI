/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var socketioConnections = require('../../config/socketio.connections');
var _ = require('lodash');
const fcm = require('../../components/fcm.sender');
import AppEventEvents from './appEvent.events';
import EndUser from '../endUser/endUser.model';

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
    console.log("We want to emit event , the author of the appEvent is " , doc.author);
    EndUser.findById(doc.author).exec()
    .then(endUser => {
      console.log("Found end user " , endUser);
      if (socketioConnections[endUser.parentUser] && socketioConnections[endUser.parentUser].indexOf(socket.client.id) != -1){
        console.log("Emitting the event");
        socket.emit(event, doc);
        // fcm.sendToUserIdAppEventUpdates(doc.parentUser,doc);
      }
    })

  };
}

function removeListener(event, listener) {
  return function() {
    AppEventEvents.removeListener(event, listener);
  };
}
