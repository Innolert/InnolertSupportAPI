'use strict';

var express = require('express');
var controller = require('./itemUpload.controller');
var multipartyMiddleware = require('connect-multiparty')()
var router = express.Router();

router.post('/', multipartyMiddleware, controller.create);

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
