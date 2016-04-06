'use strict';

import mongoose from 'mongoose';

var EndUserSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  email : String,
  tokens : [mongoose.Schema.Types.Mixed],
  mobileNumber : String
});

export default mongoose.model('EndUser', EndUserSchema);
