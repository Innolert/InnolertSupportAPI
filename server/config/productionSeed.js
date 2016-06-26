/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

User.find({
    email: 'test@innolert.com'
  }).remove()
  .then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@innolert.com',
        password: 'test',
        isVerified: true
      })
      .then(() => {
        User.findOne({
            email: 'admin@innolert.com'
          })
          .exec()
          .then(user => {
            if (!user)
              User.create({
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@innolert.com',
                password: 'admin',
                isVerified: true
              })
          })
      });
  });
