const express = require('express');
const request = require('request');
const auth = require('./routes/auth');
const tracks = require('./routes/tracks');
const session = require('client-sessions');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('./env');

const app = express();
const port = process.env.PORT || '3001';

function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(express.static(__dirname + '/build'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  cookieName: 'session',
  secret: generateRandomString(16),
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

if (env.NODE_ENV === 'production') {
// redirect to login if not authenticated
  app.use((req, res, next) => {
    if (req.path !== '/' && !req.session.user) {
      res.redirect('/');
    } else {
      next();
    }
  });
}

app.use('/auth/', auth);
app.use('/tracks/', tracks);

if (env.NODE_ENV === 'production') {
  app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });
}

app.use((err, req, res, next, error) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Server listening on port', port, '...');
});
