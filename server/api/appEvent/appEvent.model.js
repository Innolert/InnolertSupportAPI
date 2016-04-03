'use strict';

import mongoose from 'mongoose';

var AppEventSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  appName: String,
  appVersion: String,
  deviceId: String,
  phoneNumber: String,
  action: String
});

export default mongoose.model('AppEvent', AppEventSchema);
