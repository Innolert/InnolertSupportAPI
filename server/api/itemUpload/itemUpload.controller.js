/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/itemUploads              ->  index
 * POST    /api/itemUploads              ->  create
 * GET     /api/itemUploads/:id          ->  show
 * PUT     /api/itemUploads/:id          ->  update
 * DELETE  /api/itemUploads/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ItemUpload from './itemUpload.model';

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

// Gets a list of ItemUploads
export function index(req, res) {
  return ItemUpload.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ItemUpload from the DB
export function show(req, res) {
  return ItemUpload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ItemUpload in the DB
export function create(req, res) {
  return ItemUpload.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ItemUpload in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return ItemUpload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ItemUpload from the DB
export function destroy(req, res) {
  return ItemUpload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
