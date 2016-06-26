/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

User.find({
    email: 'test@example.com'
  }).remove()
  .then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test',
        isVerified: true
      })
      .then(() => {
        User.findOne({
            email: 'admin@example.com'
          })
          .exec()
          .then(user => {
            if (!user)
              User.create({
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin',
                isVerified: true
              })
          })
      });
  });
