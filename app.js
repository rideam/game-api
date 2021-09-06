var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');  
const BasicStrategy = require('passport-http').BasicStrategy; 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

passport.use(new BasicStrategy(
    function(username, password, done) {
      if (username === process.env.USERNAME && password === process.env.PASSWORD){
        return done(null, {username: process.env.USERNAME }); 
      }
      else {
        return done(null, false); 
      }
    })
  );
  

var gamesRouter = require('./routes/games');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/games', [ gamesRouter ]); 
app.use('/games', [passport.authenticate('basic', {session: false}), gamesRouter]); 


module.exports = app;
