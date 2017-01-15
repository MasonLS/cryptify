const express = require('express');
const request = require('request');

const router = express.Router();

// make sure user is authenticated
router.use('/', (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(403);
  } else {
    next();
  }
});

// get a user's top artists
router.get('/top', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/top/artists',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token }
  };

  request.get(options, (error, response, body) => {
    console.log(body);
    if(error) {
      console.log(error);
    }
  });
  res.end();
});

// search artists

module.exports = router;
