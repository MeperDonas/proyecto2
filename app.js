var express = require('express');
var session = require('express-session');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const constants = require('./config/constants');
var indexRouter = require('./routes/index');


var mustacheExpress = require('mustache-express');


var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(constants.PORT, () => {
  console.log(`Activo el puerto ${constants.PORT}`)
})

module.exports = app;
