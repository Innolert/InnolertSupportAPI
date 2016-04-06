'use strict';

import mongoose from 'mongoose';

var EndUserSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('EndUser', EndUserSchema);
