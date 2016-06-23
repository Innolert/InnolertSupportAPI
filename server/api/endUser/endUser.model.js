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
    instagram: String
  },
  mobileNumber: String,
  device: [{
    brand: String,
    id: String,
    imei: String,
    permissions: [mongoose.Schema.Types.Mixed],
    privateTokens :{
      fcm : String
    },
    state: {
      isDeviceBusy: {
        type: Boolean,
        default: false
      },
      deviceLocked:{
        isDeviceLocked: {
          type: Boolean,
          default: false
        },
        isEventPassedToDevice: {
          type: Boolean,
          default: false
        }
      },
      videoRecorded: {
        isVideoRecording: {
          type: Boolean,
          default: false
        },
        isEventPassedToDevice: {
          type: Boolean,
          default: false
        }
      },
      audioRecorded: {
        isAudioRecording: {
          type: Boolean,
          default: false
        },
        isEventPassedToDevice: {
          type: Boolean,
          default: false
        }
      },
      wifi: {
        isWifiOn: {
          type: Boolean,
          default: false
        },
        isEventPassedToDevice: {
          type: Boolean,
          default: false
        }
      },
      bluetooth: {
        isBluetoothOn: {
          type: Boolean,
          default: false
        },
        isEventPassedToDevice: {
          type: Boolean,
          default: false
        }
      }
    }
  }],
  parentUser: mongoose.Schema.Types.ObjectId,
  files: {
    video : [String],
    voice : [String]
  },
  location: {
    lastLocation: {
      LatLng: {
        lat: {
          type: Number,
          default: null
        },
        lng: {
          type: Number,
          default: null
        }
      },
      time: {
        type: Date,
        default: Date.now
      }
    },
    history: []
  }
});

export default mongoose.model('EndUser', EndUserSchema);
