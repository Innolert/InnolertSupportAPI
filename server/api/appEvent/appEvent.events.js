/**
 * AppEvent model events
 */

'use strict';

import {EventEmitter} from 'events';
import AppEvent from './appEvent.model';
var AppEventEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AppEventEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  AppEvent.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AppEventEvents.emit(event + ':' + doc._id, doc);
    AppEventEvents.emit(event, doc);
  }
}

export default AppEventEvents;
