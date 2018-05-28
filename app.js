const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const drawRouter = require('./routes/draw');
const drawingsRouter = require('./routes/drawings');

//load env variables
require('dotenv').load();

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = `mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds117592.mlab.com:17592/artgal`;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up passport connection
const passportSetup = require('./config/passportSetup');


// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/layouts');
hbs.registerPartials(__dirname + '/views/partials/includes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/draw', drawRouter);
app.use('/drawings',drawingsRouter);

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
