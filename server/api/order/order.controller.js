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
import _ from 'lodash';
import Order from './order.model';
import fs from 'fs';
var FCM = require('fcm').FCM,
    fcm = new FCM(JSON.parse(fs.readFileSync('../apis.key.json', 'utf8')).fcm);

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

// Gets a list of Orders
export function index(req, res) {
  return Order.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  // return res.status(200).json()
  // return res.status(200).json(req.query.type)
  // res.status(200).json({test:123});
  EndUser.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(function(user){
      var json = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8'))[req.query.type];
      console.log(json);
      if(typeof device.privateTokens !== 'undefiend' && typeof device.privateTokens.fcm !== 'undefiend' && json.shareable){
        delete json.shareable
        var message = {
            registration_id: device.privateTokens.fcm,
            'data.result': json
        };
        fcm.send(message, function(err, messageId){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Sent with message ID: ", messageId);
            }
        });
        res.statusCode(200)
      }else{
        console.log("Something went wrong");
        console.log(device);
        console.log(json);
      }
    })
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  var parent = req.user._id;
  //TO-DO : verify req.body.message is authorized key word
  EndUser.findOne({parentUser: req.user._id , _id : req.body.endUser})
  .exec()
  .then((user) => {
    var userDevices = user.device;
    userDevices.forEach((device,index,array) => {
      if(typeof device.privateTokens !== 'undefiend' && typeof device.privateTokens.fcm !== 'undefiend'){
        var message = {
            registration_id: device.privateTokens.fcm,
            'data.operation': req.body.message
        };
        fcm.send(message, function(err, messageId){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Sent with message ID: ", messageId);
            }
        });
      }
    })
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
