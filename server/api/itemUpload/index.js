'use strict';

var express = require('express');
var controller = require('./itemUpload.controller');
var multiparty = require('connect-multiparty')
var fs = require('fs');
var multipartyMiddleware = multiparty()



var router = express.Router();

router.post('/', multipartyMiddleware, function(req, res) {
  var tempPath = req.files.file.path;
  var targetPath = './public/images/' + req.files.file.originalFilename;
  fs.rename(tempPath, targetPath, function(err) {
      if (err) throw err;
      // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
      fs.unlink(tempPath, function() {
          if (err) throw err;
          res.send('File uploaded to: ' + targetPath + ' - ' + req.files.file.size + ' bytes');
      });
  });
});
//
// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
