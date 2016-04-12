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
  name : String,
  email: [String],
  apis: {
    facebook: String,
    googleplus: String,
    whatsapp: String,
    twitter: String,
    snapchat: String,
    instegram: String
  },
  mobileNumber: String,
  device: [{
    brand: String,
    id: String,
    imei: String,
    permissions: [mongoose.Schema.Types.Mixed],
    privateTokens :{
      gcm : String
    }
  }],
  parentUser: mongoose.Schema.Types.ObjectId,

});

export default mongoose.model('EndUser', EndUserSchema);
