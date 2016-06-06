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
import endUserController from '../endUser/endUser.controller';
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
  return AppEvent.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single AppEvent from the DB
export function show(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
  console.log(id,req.params.id);
  return AppEvent.find({ author : id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new AppEvent in the DB
export function create(req, res) {
  if(typeof req.body.action !== 'undefined'){
    console.log(req.body.action);
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
