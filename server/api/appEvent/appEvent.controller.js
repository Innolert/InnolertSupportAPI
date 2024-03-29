/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/appEvents              ->  index
 * POST    /api/appEvents              ->  create
 * GET     /api/appEvents/:id          ->  show
 * PUT     /api/appEvents/:id          ->  update
 * DELETE  /api/appEvents/:id          ->  destroy
 */

'use strict';
import EndUser from '../endUser/endUser.model';
var endUserController = require('../endUser/endUser.controller');
import _ from 'lodash';
import mongoose from 'mongoose';
import AppEvent from './appEvent.model';

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

// Gets a list of AppEvents
export function index(req, res) {
  if (req.user.role === 'admin') {
    return AppEvent.find().exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return EndUser.find({ parentUser: req.user._id }).exec()
      .then(function(endUsers) {
        return AppEvent.find({ author: { $in: _.map(endUsers, '_id') } }).exec()
          .then(respondWithResult(res))
          .catch(handleError(res));
      })
        .catch(handleError(res));
  }
}

// Gets a single AppEvent from the DB
export function show(req, res) {
  if (req.user.role === 'admin') {
    return AppEvent.findOne({ _id: req.params.id }).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return EndUser.find({ parentUser: req.user._id }).exec()
      .then(function(endUsers) {
        return AppEvent.findOne({ _id: req.params.id, author: { $in: _.map(endUsers, '_id') } }).exec()
          .then(respondWithResult(res))
          .catch(handleError(res));
      })
        .catch(handleError(res));
  }
}

// Creates a new AppEvent in the DB
export function create(req, res) {
  console.log(req.body.action);
  if(req.body.action){
    switch (req.body.action) {
      case "GPS_LOCATION":
        updateEndUserLastLocation(req.body);
        break;
      case "CAMERA_BUSY":
        endUserController.setDeviceAsbusy(req.body,'videoRecorded');
        break;
      case "MICROPHONE_BUSY":
        endUserController.setDeviceAsbusy(req.body,'audioRecorded');
        break;
    }
  }
  return AppEvent.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

function updateEndUserLastLocation(userData){
  EndUser.findById(userData.author)
  .exec()
  .then((user) => {
    user.location.lastLocation.LatLng.lat = userData.data.location.Latitude;
    user.location.lastLocation.LatLng.lng = userData.data.location.Longtitude;
    user.location.lastLocation.time = new mongoose.Types.ObjectId().getTimestamp()
    user.location.history.push(user.location.lastLocation);
    user.save();
  })
}


// Updates an existing AppEvent in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return AppEvent.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a AppEvent from the DB
export function destroy(req, res) {
  return AppEvent.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
