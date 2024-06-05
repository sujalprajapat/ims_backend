var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var branch = require('./routes/branch');
var role = require('./routes/role');
var ref = require('./routes/ref');
var status = require('./routes/status');
var course = require('./routes/course');
var followup = require('./routes/followup');
var inquiry = require('./routes/inquiry')


var app = express();

app.use(cors(
  {
    origin:"http://localhost:3000",
    methods:["POST","GET"],
    credentials : true,
  }
))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/role',role);
app.use('/branch',branch);
app.use('/status',status);
app.use('/followup',followup);
app.use('/reference',ref);
app.use('/inquiry',inquiry);
app.use('/course',course);

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
  res.render('error');
});

module.exports = app;
