import fs from 'fs';
import _ from 'lodash';
var FCM = require('fcm-node');
var serverKey = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8')).fcm;
var fcm = new FCM(serverKey)

export function sendWithMessage(message){
  send(message);
}

//data shlold be an object
export function sendWithRegistrationIdAndData(registrationId,data){
  if( !data instanceof Object)
    throw "Data must be an object" ;
  //TODO - oleg : if the registrationId is an array we should throw an error
  var message = {
      to: registrationId,
      data: data
  };
  send(message)
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
