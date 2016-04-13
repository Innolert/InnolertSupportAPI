'use strict';

import mongoose from 'mongoose';

var ReportedItemSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  filePath : String,
  updates : [mongoose.Schema.Types.Mixed],
  author : {
    type :mongoose.Schema.Types.ObjectId,
    required : true
  }
});

export default mongoose.model('ReportedItem', ReportedItemSchema);
