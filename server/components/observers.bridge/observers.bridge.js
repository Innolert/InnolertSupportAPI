const request = require('request');
const observerConfig = require('./observers.config');
export function register(ObserversBridgeEvents){
  ObserversBridgeEvents.on('instagram', (event) => {
    console.log(observerConfig);
    console.log("Sending event to observer" , event);
    let options = {
      url: observerConfig.urls.instagram,
      headers: {
        'Content-Type': 'Application/json'
      },
      formData: {
        accessToken: event
      }
    }
    request.post(options,cb)
  })
}


function cb(err, response, body){
  if(err){
      console.log("Error sending request");
  }
  else{
    console.log(body);
  }
}
