/*jshint node: true*/
// load environment variables
require('dotenv').load();


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var port = process.env.PORT || 8080;

// route files
var auth = require('./routes/auth');
var api = require('./routes/api');
var routes = require('./routes/index');

var app = express();

// ======= database connection ======
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
var db = mongoose.connection;

// confirmation and error messaging
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("The database connection is active.");
});

app.use(session({ secret: 'FCC is the best',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000* 30},
  store: new mongoStore({mongooseConnection: mongoose.connection})
                })); // session secret


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// === passport configuration =====
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static assets served from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', auth);
app.use('/api', api);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



var server = app.listen(port, function() {
  console.log("The server is listening on port "+port);
});


module.exports = app;
