/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/endUsers              ->  index
 * POST    /api/endUsers              ->  create
 * GET     /api/endUsers/:id          ->  show
 * PUT     /api/endUsers/:id          ->  update
 * DELETE  /api/endUsers/:id          ->  destroy
 */

'use strict';

import {EventEmitter} from 'events';
var ObserversBridgeEvents = new EventEmitter();
require('../../components/observers.bridge/observers.bridge').register(ObserversBridgeEvents);
import _ from 'lodash';
import EndUser from './endUser.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    if(updates.device && updates.device[0].state){
      updates.device[0].state = handleChangesInDeviceState(updates.device[0].state);
    }
    if(updates.apis){
      _.forEach(updates.apis, (value, key) => {
        ObserversBridgeEvents.emit(key, value);
      })
    }
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

// Gets a list of EndUsers
export function index(req, res) {
  if (req.user.role === 'admin') {
    return EndUser.find().exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else{
    return EndUser.find({parentUser: req.user._id}).exec()
      .then((users) => {
        return users
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  }

}

// Gets a single EndUser from the DB
export function show(req, res) {
  let endUser;
  if (req.user.role === 'admin') {
    endUser = EndUser.findById(req.params.id).exec()

  }
  else{
    endUser = EndUser.findOne({
      _id: req.params.id,
      parentUser: req.user._id
    }).exec()
  }
  return endUser
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new EndUser in the DB
export function create(req, res) {
  req.body.parentUser = req.user._id;
  return EndUser.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing EndUser in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return EndUser.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a EndUser from the DB
export function destroy(req, res) {
  return EndUser.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function handleChangesInDeviceState(state){
  console.log("the update is " , state);
  if(state.deviceLocked){
    state.deviceLocked.isEventPassedToDevice = false;
  }
  else if(state.audioRecorded){
    state.audioRecorded.isEventPassedToDevice = false;
  }
  else if(state.videoRecorded){
    state.videoRecorded.isEventPassedToDevice = false;
  }
  else if(state.wifi){
    state.wifi.isEventPassedToDevice = false;
  }
  else if(state.bluetooth){
    state.bluetooth.isEventPassedToDevice = false;
  }
  else {
    console.log("nothing matched");
  }
  return state;
}

export function setDeviceAsbusy(userData,resource){
  console.log("Setting device as busy");
  return EndUser.findById(userData.author)
  .exec()
  .then((user) => {
    var cases = {
      videoRecorded: () => {user.device[0].state.videoRecorded.isEventPassedToDevice = false;},
      audioRecorded: () => {user.device[0].state.audioRecorded.isEventPassedToDevice = false;}
    }
    if(cases[resource]){
      cases[resource]();
      user.device[0].state.isDeviceBusy = true;
      return user.save()
            .then((updated) => {
              return updated
            })
    }
    else{
      console.log("Unknow resource");
    }

  })
}
