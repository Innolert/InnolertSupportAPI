'use strict';

import mongoose from 'mongoose';

var ItemUploadSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('ItemUpload', ItemUploadSchema);
