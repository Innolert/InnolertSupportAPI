'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show); // Oleg : send self id and type=<SOCIAL_NETWORK> to get data about it
router.post('/',auth.hasRole('user'), controller.create); // Oleg :all the orders to will be passed from this endpoint
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
