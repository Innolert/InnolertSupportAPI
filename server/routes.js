/**
 * Main application routes
 */
'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/uploadItems', require('./api/uploadItem'));
  var Upload = require('upload-file')
  app.post('/upload', function(req, res) {
    var upload = new Upload({
      maxNumberOfFiles: 10,
      // Byte unit
      maxFileSize: 1000 * 1024,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png|css)$/i,
      dest: 'uploads/path',
      minNumberOfFiles: 0
    });

    upload.on('end', function(fields, files) {
      console.log(fields);
      console.log(files);

      if (!fields.channel) {
        this.cleanup();
        this.error('Channel can not be empty');
        return;
      }

      res.send('ok')
    });

    upload.on('error', function(err) {
      res.send(err);
    });

    upload.parse(req);
  });

  app.use('/api/endUsers', require('./api/endUser'));
  app.use('/api/reportedItems', require('./api/reportedItem'));
  app.use('/api/appEvents', require('./api/appEvent'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/orders', require('./api/order'));
  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
