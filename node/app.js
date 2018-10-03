let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let bodyParser = require('body-parser')
require('dotenv').config()

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let forgotPassword = require('./routes/forgot-password');
let resetPassword =  require('./routes/reset-password');
let fileUpload =  require('./routes/file-upload');
let fileDelete = require('./routes/file-delete');
let clientSignup = require('./routes/client-signup');

let app = express();


app.use(cors({ origin: process.env.ORIGIN_URL , credentials :  true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password', resetPassword);
app.use('/fileupload', fileUpload);
app.use('/filedelete', fileDelete);
app.use('/client-signup', clientSignup)

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
