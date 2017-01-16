const express = require('express');
const request = require('request');

const router = express.Router();

// get a track's password
router.get('/password/:trackId', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/audio-features',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      ids: req.params.trackId
    }
  };

  // get the track's audio features from Spotify
  request.get(options, (error, response, body) => {
    if(error) {
      next(error);
    } else {
      // hash the track based on it audio features
      res.send(body);
    }
  });
});

// get a user's top tracks
router.get('/top', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/top/tracks',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      limit: 50
    }
  };

  request.get(options, (error, response, body) => {
    if(error) {
      console.log(error);
      next(error);
    } else {
      res.send(body);
    }
  });
});

// keyword search tracks
router.get('/search/:trackName', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/search',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      q: req.params.trackName,
      type: 'track',
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
