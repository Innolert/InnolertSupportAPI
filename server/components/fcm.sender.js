import fs from 'fs';
import _ from 'lodash';
var FCM = require('fcm-node');
var serverKey = JSON.parse(fs.readFileSync('../apis.key.json', 'utf8')).fcm;
var fcm = new FCM(serverKey)

export default function(message){
  fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!" , err);
      } else {
          console.log("Successfully sent with response: ", response);
      }
  })
}
