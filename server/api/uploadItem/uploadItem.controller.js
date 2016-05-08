/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/uploadItems              ->  index
 * POST    /api/uploadItems              ->  create
 * GET     /api/uploadItems/:id          ->  show
 * PUT     /api/uploadItems/:id          ->  update
 * DELETE  /api/uploadItems/:id          ->  destroy
 */
'use strict';

import _ from 'lodash';
import EndUser from '../endUser/endUser.model';
var Upload = require('upload-file');
var shortid = require('shortid');
var env = require(__base + '/config/environment/index.js');
var reportItemController = require(__base + "/api/reportedItem/reportedItem.controller.js");

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

// Gets a list of UploadItems
export function index(req, res) {
    return UploadItem.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single UploadItem from the DB
export function show(req, res) {
    return UploadItem.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new UploadItem in the DB
export function create(req, res) {
    var uri = (env.env == 'development' ? 'http://localhost:9000/' : 'http://staging.innolert.com/')
    var destination = 'public/images';
    var fileName = null;
    var upload = new Upload({
        maxNumberOfFiles: 10,
        // Byte unit
        maxFileSize: 10000 * 1024,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|css|3gp)$/i,
        dest: destination,
        minNumberOfFiles: 0,
        rename: function(name, file) {
            fileName = shortid.generate() + "." + file.filename.split(".").pop();
            return fileName;
        }
    });

    upload.on('end', function(fields, files) {
            console.log(fields,files);
            if (typeof fields.type !== 'undefiend') {
                switch (fields.type) {
                    case '3gp':
                        if(fields.operation === "stop_voice_record"){
                        updateEndUserRecord(fields.author, uri + destination.split("/").pop() + "/" + fileName)
                        .then(() => {
                          res.send('File has been saved into ' + destination +"/"+ files.file.filename)
                        })
                        }
                        break;
                    default:
                }
            }else {
                if (!fields.description) {
                    this.cleanup();
                    this.error('Channel can not be empty');
                    return;
                }
                reportItemController.create({
                    filePath: uri + destination.split("/").pop() + "/" + fileName,
                    updates: [fields.description],
                    author: fields.author
                })
                res.send('File has been saved into ' + destination + files.file.filename)
              }
            })

    upload.on('error', function(err) {
        res.send(err);
    });
    upload.parse(req);
}

function updateEndUserRecord(userId, url) {
    return EndUser.findById(userId)
          .exec()
          .then((user) => {
              user.files.voice.push(url);
              user.save();
          })
}

// Updates an existing UploadItem in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return UploadItem.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a UploadItem from the DB
export function destroy(req, res) {
    return UploadItem.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
