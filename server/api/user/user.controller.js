'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
var emailController = require(__base + '/api/email/email.controller');
import jwt from 'jsonwebtoken';
import _ from 'lodash';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

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

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
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

/**
 * Update details about the user like fcm
 * TODO: check if the device already registred, if so update the current device fcm find it using device id or imei
 */
export function updateFCMToken(req, res){
  return User.findOne({ _id: req.user._id})
        .then((user) => {
          console.log(user.devices,req.body.privateTokens);
          if(!_.some(user.devices, req.body.privateTokens)){
            user.devices.push({ privateTokens: { fcm : req.body.privateTokens.fcm } } );
            return user.save()
                  .then(user => {
                    return user;
                  })
                  .then(respondWithResult(res))
          }
          return user;
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var protocol = (req.secure) ?'https://' : 'http://';
      var url = protocol + req.headers.host +"/";
      emailController.newUser(url, req.body.email , user._id);
      res.writeHead(302, {
        'Location': url
      });
      res.end();
      // res.writeHead(301, { Location: "http://" + req.headers['host'] + req.url }).end();
    })
    .catch(validationError(res));
}

/**
  * Verify the user after clicking the link in the mail
  */
  export function verify(req,res){
    var userId = req.params.id;
    var protocol = (req.secure) ?'https://' : 'http://';
    var url = protocol + req.headers.host +"/";
    return User.findById(userId).exec()
      .then(user => {
          user.isVerified = true;
          return user.save()
            .then(() => {
              res.writeHead(302, {
                'Location': url
              });
              res.end();
            })
            .catch(validationError(res));

      });

  }

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}

export function findById(id){
  return User.findById(id).exec().then(user => { return user });
}

export function removeUnregisteredTokenFromUser(userId, token){
  findById(userId)
  .then(user => {
    if(user){
      User.update({
        _id: user._id
      },
      {
        $pull: {
          devices: {
            privateTokens: {
              fcm: token
            }
          }
        }
      })
    }
  })
}
