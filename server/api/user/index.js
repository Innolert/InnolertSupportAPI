'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.put('/:id',auth.isAuthenticated() ,controller.update);
router.put('/fcm/:id', auth.isAuthenticated(), controller.updateFCMToken);
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/verify/:id', controller.verify);
router.post('/', controller.create);

module.exports = router;
