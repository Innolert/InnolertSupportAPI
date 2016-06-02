'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show); // Oleg : send self id and type=<SOCIAL_NETWORK> to get data about it
router.post('/',auth.hasRole('user'), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
