const express = require('express');
const request = require('request');
const auth = require('./routes/auth');
const artists = require('./routes/artists');
const tracks = require('./routes/tracks');
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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  cookieName: 'session',
  secret: generateRandomString(16),
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

app.use('/auth/', auth);
app.use('/tracks/', tracks);
app.use('/artists/', artists);

app.listen(3001, () => {
  console.log('Server listening on port 3001...');
});
