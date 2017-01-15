const express = require('express');
const request = require('request');

const router = express.Router();

// get a user's top artists
router.get('/top', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/top/artists',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      limit: 50
    }
  };

  request.get(options, (error, response, body) => {
    if(error) {
      next(error);
    } else {
      res.send(body);
    }
  });
});

// keyword search artists
router.get('/search/:artistName', (req, res, next) => {
  const artistName = req.params.artistName.replace(' ', '%20');
  const options = {
    url: 'https://api.spotify.com/v1/search',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      q: artistName,
      type: 'artist',
      limit: 30,
      market: 'from_token'
    }
  };

  request.get(options, (error, response, body) => {
    if(error) {
      next(error);
    } else {
      res.send(body);
    }
  })
});

module.exports = router;
