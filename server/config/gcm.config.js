var gcm = require('node-gcm');

// Set up the sender with API key
var sender = new gcm.Sender('AIzaSyD4MzVr4aNTI9Sn51lO1kU6UiCuMLkUWio');

var message = new gcm.Message();

message.addData('key1', 'msg1');

var regTokens = ['YOUR_REG_TOKEN_HERE'];



// Now the sender can be used to send messages
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
	if(err) console.error(err);
	else 	console.log(response);
});
