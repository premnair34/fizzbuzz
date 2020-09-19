const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api/index');
const app = express();
require('dotenv').config();
const swaggerDocument = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const createSwaggerExpressMiddleware = require('swagger-express-middleware');
const errorHandler = require('./api/common/error-handler');
// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,cache-control,content-type,accept');


  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
//swagger implementation

createSwaggerExpressMiddleware(swaggerDocument, app, (middlewareError, middleware) => {
  app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(middleware.metadata(),
      middleware.parseRequest(),
      middleware.validateRequest());
  // Error handler to send the swagger validation response
  app.use((err, req, res, next) => {
      err.statusCode = err.status;
      err.origin = req.protocol + '://' + req.get('host') + req.originalUrl;
      errorHandler.errorHandlingMiddleware(err, req, res, next);

  });
  app.use('/api', api);  
  app.use(function(req, res, next) {
    res.sendFile("index.html", { root: path.join(__dirname, './public')});
  });
});
module.exports = app;
