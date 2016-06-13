/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var users = require('../../config/socketio.connections');
var _ = require('lodash');
import EndUserEvents from './endUser.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('endUser:' + event, socket);
    console.log("Creating listener for ", socket.decoded_token._id)
    EndUserEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    //Before emitting the event we've to check that the client is able to see doc
    if (users[doc.parentUser] && users[doc.parentUser].indexOf(socket.client.id) != -1)
      socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    EndUserEvents.removeListener(event, listener);
  };
}
