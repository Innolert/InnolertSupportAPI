import fs from 'fs';
import _ from 'lodash';
const User = require('../api/user/user.controller');
var FCM = require('fcm-node');
var serverKey = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8')).fcm;
var fcm = new FCM(serverKey)

export function sendWithMessage(message){
  send(message);
}


export function sendToUserIdMessage(userId, docToSend){
  User.findById(userId)
  .then(user => {
      user.devices.forEach((device, index, array) => {
        let message = {
          to: device.privateTokens.fcm,
          data: {
            isUser: true
          }
        };
        send(message);
      })
  })
}

function send(message){
  console.log("Sending message using fcm" , message);
  fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!" , err);
      } else {
          console.log("Successfully sent with response: ", response);
      }
  })
}
