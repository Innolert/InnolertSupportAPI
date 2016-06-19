import fs from 'fs';
import _ from 'lodash';
const User = require('../api/user/user.controller');
var FCM = require('fcm-push');
var serverKey = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8')).fcm;
var fcm = new FCM(serverKey)

export function sendWithMessage(message){
  send(message);
}


export function sendToUserIdEndUserUpdates(userId, docToSend){
  User.findById(userId)
  .then(user => {
      user.devices.forEach((device, index, array) => {
        let message = {
          to: device.privateTokens.fcm,
          data: {
            updatedEndUser: JSON.stringify(docToSend)
          }
        };
        send(message, userId);
      })
  })
}

export function sendToUserIdAppEventUpdates(){
  //TODO - implement it later , add also the singature
}

function send(message, user){
  console.log("Sending message using fcm" , message);
  fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!" , err);
          let error = JSON.parse(err);
          if(error.results){
            _.forEach(error.results, function(value){
              if(value.error === "NotRegistered"){
                removeUnregisteredTokenFromUser()
                //remove it from user
              }
            })
          }
      } else {
          console.log("Successfully sent with response: ", response);
      }
  })
}
