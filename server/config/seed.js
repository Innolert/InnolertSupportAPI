/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import endUser from '../api/endUser/endUser.model';
import reportedItem from '../api/reportedItem/reportedItem.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });



  endUser.find({}).remove()
  .then(() => {
    console.log('finished populating endUsers');
  });

  reportedItem.find({}).remove()
  .then(() => {
    console.log('finished populating reportedItems');
  })
