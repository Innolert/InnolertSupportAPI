'use strict';

import mongoose from 'mongoose';

var AppEventSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('AppEvent', AppEventSchema);
