/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import endUser from '../api/endUser/endUser.model';
import appEvent from '../api/appEvent/appEvent.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      isVerified: true 
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
      isVerified: true
    })
    .then(() => {
      console.log('finished populating users');
    });
  });



  endUser.find({}).remove()
  .then(() => {
    console.log('finished populating endUsers');
  });

  appEvent.find({}).remove()
  .then(() => {
    console.log('finished populating appEvent');
  })
