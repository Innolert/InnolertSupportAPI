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
  phoneNumber: String,
  action: String,
  data: [mongoose.Schema.Types.Mixed],
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EndUser' }],
});

export default mongoose.model('AppEvent', AppEventSchema);
