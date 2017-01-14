var express = require('express');
var request = require('request');
var auth = require('./routes/auth');
var session = require('client-sessions');

var app = express();

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(express.static(__dirname + '/public'));

app.use(session({
  cookieName: 'session',
  secret: generateRandomString(16),
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use('/auth', auth);

console.log('Listening on 3001');
app.listen(3001);
