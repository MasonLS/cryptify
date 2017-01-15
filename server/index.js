const express = require('express');
const request = require('request');
const auth = require('./routes/auth');
const artists = require('./routes/artists');
const tracks = require('./routes/artists');
const session = require('client-sessions');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', auth);
app.use('/artists', artists);
app.use('/tracks', tracks);

app.listen(3001, () => {
  console.log('Server listening on port 3001...');
});
