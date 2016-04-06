'use strict';

var gcm = require('node-gcm');

class clientGCM {
  constructor(){
    this.gcm = gcm;
    //set up API key
    this.sender = new gcm.Sender('AIzaSyD4MzVr4aNTI9Sn51lO1kU6UiCuMLkUWio');
		this.regTokens = [];
  }
}


module.exports = clientGCM
