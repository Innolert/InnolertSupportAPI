/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';
import EndUser from '../endUser/endUser.model';
var endUserController = require('../endUser/endUser.controller');
import _ from 'lodash';
import Order from './order.model';
import fs from 'fs';
const fcmSender = require('../../components/fcm.sender');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      console.log("sending entity " , entity)
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Orders
export function index(req, res) {
  return Order.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function requestConfig(req, res) {
  EndUser.findById(req.params.endUserId).exec()
    .then(handleEntityNotFound(res))
    .then(function(user) {
      var json = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8'))[req.query.type];
      var userDevices = user.device;
      userDevices.forEach((device, index, array) => {
        if (device.privateTokens && device.privateTokens.fcm && json.shareable) {
          delete json.shareable
          json.type = req.query.type;
          var message = {
            to: device.privateTokens.fcm,
            data: {
              result: JSON.stringify(json)
            }
          }
          fcmSender.sendWithMessage(message);
        } else {
          console.log("Something went wrong");
          console.log(device);
          console.log(json);
        }
      })
      res.status(200).end()
    })
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function sendOrder(req, res) {
  var parent = req.user._id;
  //TO-DO : verify req.body.message is authorized key word
  EndUser.findOne({
      parentUser: req.user._id,
      _id: req.body.endUser
    })
    .exec()
    .then((user) => {
      var userDevices = user.device;
      userDevices.forEach((device, index, array) => {
        if (device.privateTokens && device.privateTokens.fcm) {
          if (deviceIsAbleToGetOperation(device, req.body.message)) {
            var message = {
              to: device.privateTokens.fcm,
              data: {
                operation: req.body.message,
                additionalData: req.body.additionalData
              }
            };
            fcmSender.sendWithMessage(message);
          }
        }
        device = updateUserDeviceState(device, req.body.message);
      })
      user.save()
        .then(respondWithResult(res))
    })
    .catch(handleError(res));
}

// Updates an existing Order in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function updateUserDeviceState(device, message) {
  if (device.state.isDeviceBusy)
    device.state.isDeviceBusy = false; //oleg : reset it to be able to send message again
  var cases = {
    start_back_video_record: () => {
      device.state.videoRecorded.isEventPassedToDevice = true;
    },
    stop_back_video_record: () => {
      device.state.videoRecorded.isEventPassedToDevice = true;
    },
    start_voice_record: () => {
      device.state.audioRecorded.isEventPassedToDevice = true;
    },
    stop_voice_record: () => {
      device.state.audioRecorded.isEventPassedToDevice = true;
    },
    lock_device: () => {
      device.state.deviceLocked.isEventPassedToDevice = true;
    },
    reset_password: () => {
      device.state.deviceLocked.isEventPassedToDevice = true;
    },
    wfoN: () => {
      device.state.wifi.isEventPassedToDevice = true;
    },
    wfoff: () => {
      device.state.wifi.isEventPassedToDevice = true;
    },
    bton: () => {
      device.state.bluetooth.isEventPassedToDevice = true;
    },
    btoff: () => {
      device.state.bluetooth.isEventPassedToDevice = true;
    }
  }
  if (cases[message]) {
    cases[message]();
  }
  return device;
}

function deviceIsAbleToGetOperation(device, message) {
  var cases = {
    start_back_video_record: () => {
      return !device.state.videoRecorded.isEventPassedToDevice ||
        !device.state.videoRecorded.isVideoRecording;
    },
    stop_back_video_record: () => {
      return !device.state.videoRecorded.isEventPassedToDevice ||
        device.state.videoRecorded.isVideoRecording;
    },
    start_voice_record: () => {
      return !device.state.audioRecorded.isEventPassedToDevice ||
        !device.state.audioRecorded.isAudioRecording;
    },
    stop_voice_record: () => {
      return !device.state.audioRecorded.isEventPassedToDevice ||
        device.state.audioRecorded.isAudioRecording;
    },
    lock_device: () => {
      return !device.state.deviceLocked.isDeviceLocked &&
        !device.state.deviceLocked.isEventPassedToDevice;
    },
    reset_password: () => {
      return device.state.deviceLocked.isDeviceLocked &&
        !device.state.deviceLocked.isEventPassedToDevice;
    },
    wfoN: () => {
      return !device.state.wifi.isWifiOn ||
             !device.state.wifi.isEventPassedToDevice;
    },
    wfoff: () => {
      return device.state.wifi.isWifiOn ||
            !device.state.wifi.isEventPassedToDevice;
    },
    bton: () => {
      return !device.state.bluetooth.isBluetoothOn ||
             !device.state.bluetooth.isEventPassedToDevice;
    },
    btoff: () => {
      return  device.state.bluetooth.isBluetoothOn ||
             !device.state.bluetooth.isEventPassedToDevice;
    }
  }
  if (cases[message]) {
    console.log("Is device able to get " , message ," ? ", cases[message]());
    return cases[message]();
  } else {
    return true;
  }
}
