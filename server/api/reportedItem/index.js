'use strict';

var express = require('express');
var controller = require('./reportedItem.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();
// Oleg : temporary only admin have an access
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
