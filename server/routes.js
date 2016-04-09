/**
 * Main application routes
 */
'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below

  app.use('/api/uploadItems', require('./api/uploadItem')); 
  app.use('/api/endUsers', require('./api/endUser'));
  app.use('/api/reportedItems', require('./api/reportedItem'));
  app.use('/api/appEvents', require('./api/appEvent'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/orders', require('./api/order'));
  app.use('/auth', require('./auth').default);
  app.use('/uploads/images', function(req,res){
    res.sendFile(req._parsedOriginalUrl.path , { root: __base });
  });    

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
