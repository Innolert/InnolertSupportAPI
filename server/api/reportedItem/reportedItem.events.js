/**
 * ReportedItem model events
 */

'use strict';

import {EventEmitter} from 'events';
import ReportedItem from './reportedItem.model';
var ReportedItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReportedItemEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ReportedItem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ReportedItemEvents.emit(event + ':' + doc._id, doc);
    ReportedItemEvents.emit(event, doc);
  }
}

export default ReportedItemEvents;
