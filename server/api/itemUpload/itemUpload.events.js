/**
 * ItemUpload model events
 */

'use strict';

import {EventEmitter} from 'events';
import ItemUpload from './itemUpload.model';
var ItemUploadEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ItemUploadEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ItemUpload.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ItemUploadEvents.emit(event + ':' + doc._id, doc);
    ItemUploadEvents.emit(event, doc);
  }
}

export default ItemUploadEvents;
