'use strict';

import mongoose from 'mongoose';

var UploadItemSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('UploadItem', UploadItemSchema);
