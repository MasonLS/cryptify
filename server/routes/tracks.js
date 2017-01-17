const express = require('express');
const request = require('request');
const crypto = require('crypto');
const _ = require('lodash');
const router = express.Router();

// get a user's top tracks
router.get('/top-tracks', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/top/tracks',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      limit: 50
    }
  };

  request.get(options, (error, response, body) => {
    if (error) {
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
    if (error) {
      next(error);
    } else {
      res.send(body);
    }
  })
});

// get an artist's top tracks
router.get('/:artistId/top-tracks', (req, res, next) => {
  const options = {
    url: 'https://api.spotify.com/v1/artists/' + req.params.artistId + '/top-tracks',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      country: req.session.user.country
    }
  };

  request.get(options, (error, response, body) => {
    if (error) {
      next(error);
    } else {
      res.send(body);
    }
  });
});

// get a track's password
router.get('/password/:trackId/:why', (req, res, next) => {
  const audioFeatureOptions = {
    url: 'https://api.spotify.com/v1/audio-features',
    headers: { 'Authorization': 'Bearer ' + req.session.user.access_token },
    qs: {
      ids: req.params.trackId
    }
  };

  request.get(audioFeatureOptions, (error, response, body) => {
    if (error) {
      next(error);
    } else {
      const audioFeatures = JSON.parse(body).audio_features[0];
      const audioAnalysisOptions = {
        url: audioFeatures.analysis_url,
        headers: { 'Authorization': 'Bearer ' + req.session.user.access_token }
      }
      request.get(audioAnalysisOptions, (error, response, body) => {
        if (error) {
          next(error);
        } else {
          const audioAnalysis = JSON.parse(body);
          const hash = crypto.createHmac('sha256', req.session.user.id);
          const buffer = new Buffer(_.flatten(audioAnalysis.segments.map(segment => segment.pitches)));

          hash.update(buffer);

          let extraParam;

          if (req.params.why === 'vocals') {
            extraParam = audioFeatures.speechiness;
          }
          if (req.params.why === 'instrumentals') {
            extraParam = audioFeatures.instrumentalness;
          }
          if (req.params.why === 'dancing') {
            extraParam = audioFeatures.danceability;
          }

          hash.update(String(extraParam));

          const hashedTrackChars = hash.digest('hex').slice(0,16).split('');

          const password = hashedTrackChars.map((char, i) => {
            if (Number.isNaN(+char) && i % 2 === 0) {
              return char.toUpperCase();
            }
            return char;
          })
          .join('');

          res.json(password);
        }
      })
    }
  });
});

module.exports = router;
