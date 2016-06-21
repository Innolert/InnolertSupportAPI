import fs from 'fs';
import _ from 'lodash';
const User = require('../api/user/user.controller');
var FCM = require('fcm-push');
var serverKey = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8')).fcm;
var fcm = new FCM(serverKey)

export function sendWithMessage(message){
  send(message);
}


export function sendToUserIdEndUserUpdates(userId, endUserId, event){
  User.findById(userId)
  .then(user => {
      user.devices.forEach((device, index, array) => {
        let message = {
          to: device.privateTokens.fcm,
          data: {
            event: event,
            endUserId: endUserId
          }
        };
        send(message, userId, index);
      })
  })
}

export function sendToUserIdAppEventUpdates(userId, endUserId, docToSend, event){
  User.findById(userId)
  .then(user => {
    user.devices.forEach((device, index, array) => {
      let message = {
        to: device.privateTokens.fcm,
        data: {
          event: event,
          appEvent: docToSend,
          endUserId: endUserId
        }
      }
      send(message, userId, index);
    })
  })
}

/**
 * [send the message to the device using fcm-push library]
 * [https://www.npmjs.com/package/fcm-push]
 * @param  {object} message     [**require! - message must contain `to` - the device registration from fcm and `data` - {object} with the data to be sent]
 * @param  {string} userId      [**optional - in case the device registration token is not valid anymore using the userId we can delete it from the model]
 * @param  {integer} deviceIndex [**optional - in case the device registration token is not valid anymore using the device index we can delete it from the model]
 * @return {void}             [TODO: implement return later - for now only print to the log ]
 */
function send(message, userId, deviceIndex){
  console.log("Sending message using fcm to" , message);
  fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!" , err);
          let error = JSON.parse(err);
          if(error.results  && userId && deviceIndex){
            _.forEach(error.results, function(value){
              if(value.error === "NotRegistered"){
                User.removeUnregisteredTokenFromUser(userId, message.to)
              }
            })
          }
      } else {
          console.log("Successfully sent with response: ", response);
      }
  })
}
