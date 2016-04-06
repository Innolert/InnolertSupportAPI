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
  email : [String],
  tokens : {
    gcm : String,
    apis : {
      fb: String,
      gp: String,
      wa: String,
      tw: String,
      sc: String,
      ig: String
    }
  },
  mobileNumber : String,
  device : {
    id : String,
    type : String,
    IMEI : String
  },
  parentUser : mongoose.Schema.Types.ObjectId,
  permissions : [mongoose.Schema.Types.Mixed]
});

export default mongoose.model('EndUser', EndUserSchema);
