'use strict';

import mongoose from 'mongoose';

var AppEventSchema = new mongoose.Schema({
  active: Boolean,
  date: Date,
  appName : String,
  appVersion : String,
  deviceId : String,
});

export default mongoose.model('AppEvent', AppEventSchema);
