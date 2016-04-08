/**
 * UploadItem model events
 */

'use strict';

import {EventEmitter} from 'events';
var UploadItem = require('./uploadItem.model');
var UploadItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UploadItemEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UploadItem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UploadItemEvents.emit(event + ':' + doc._id, doc);
    UploadItemEvents.emit(event, doc);
  }
}

export default UploadItemEvents;
