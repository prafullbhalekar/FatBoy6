var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var createError = require('http-errors');

var matrimonyRoute = require('./routes/MatrimonyRoute');
var businessRoute = require('./routes/BusinessRoute');
var serviceRoute = require('./routes/ServiceRoute');
var userRoute = require('./routes/UserRoute');
var loginRoute = require('./routes/LoginRoute');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://Ritesh:Ritesh@ds223509.mlab.com:23509/whitepanda', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist/FatBoy6')));
app.use('/', express.static(path.join(__dirname, 'dist/FatBoy6')));

app.use('/matrimonyroute', matrimonyRoute);
app.use('/businessroute', businessRoute);
app.use('/serviceroute', serviceRoute);
app.use('/userroute', userRoute);
app.use('/loginroute', loginRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
