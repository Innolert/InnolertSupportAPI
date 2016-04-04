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
  updates : [Schema.Types.Mixed],
  author : Schema.Types.ObjectId
});

export default mongoose.model('ReportedItem', ReportedItemSchema);
