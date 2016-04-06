/**
 * EndUser model events
 */

'use strict';

import {EventEmitter} from 'events';
import EndUser from './endUser.model';
var EndUserEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EndUserEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EndUser.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EndUserEvents.emit(event + ':' + doc._id, doc);
    EndUserEvents.emit(event, doc);
  }
}

export default EndUserEvents;
