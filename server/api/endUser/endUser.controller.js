/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/endUsers              ->  index
 * POST    /api/endUsers              ->  create
 * GET     /api/endUsers/:id          ->  show
 * PUT     /api/endUsers/:id          ->  update
 * DELETE  /api/endUsers/:id          ->  destroy
 */

'use strict';

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
      console.log("after handling" , updates.device[0].state);
    }
    var updated = _.merge(entity, updates);
    console.log("after merging" , updated.device[0].state);
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
  return EndUser.find({parentUser: req.user._id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EndUser from the DB
export function show(req, res) {
  return EndUser.findById(req.params.id).exec()
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
  var resetDeviceLocked = state.deviceLocked && state.deviceLocked.isDeviceLocked,
      resetAudioRecording = state.audioRecorded && state.audioRecorded.isAudioRecording,
      resetVideoRecording = state.videoRecorded && state.videoRecorded.isVideoRecording;
  console.log(resetVideoRecording , !state.videoRecorded , state.videoRecorded , !state.videoRecorded.isVideoRecording , state.videoRecorded.isVideoRecording);
  if(resetDeviceLocked)
    state.deviceLocked.isEventPassedToDevice = false;
  if(resetAudioRecording)
    state.audioRecorded.isEventPassedToDevice = false;
  if(resetVideoRecording)
    state.videoRecorded.isEventPassedToDevice = false;
  return state;
}
