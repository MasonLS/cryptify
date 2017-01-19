import express from 'express';
import request from 'request';
import crypto from 'crypto';
import _ from 'lodash';
import spotify from '../spotify';

const router = express.Router();

// get a user's top tracks
router.get('/top-tracks', (req, res, next) => {
  spotify.getUserTopTracks(req.session.user.access_token)
    .then(json => {
      res.send(json);
    })
    .catch(next);
});

// keyword search tracks
router.get('/search/:trackName', (req, res, next) => {
  spotify.searchTracks(req.session.user.access_token, req.params.trackName)
    .then(json => {
      res.send(json);
    })
    .catch(next);
});

// get an artist's top tracks
router.get('/:artistId/top-tracks', (req, res, next) => {
  spotify.getArtistTopTracks(req.session.user.access_token, req.params.artistId)
    .then(json => {
      res.send(json);
    })
    .catch(next);
});

// get a track's password
router.get('/password/:trackId/:why', (req, res, next) => {
  const accessToken = req.session.user.access_token;
  const trackId = req.params.trackId;
  const why = req.params.why;
  let trackAudioFeatures;

  spotify.getAudioFeatures(accessToken, trackId)
    .then(audioFeatures => {
      trackAudioFeatures = audioFeatures;
      return spotify.getAudioAnalysis(accessToken, trackId);
    })
    .then(audioAnalysis => {
      const hash = crypto.createHmac('sha256', req.session.user.id);
      const buffer = new Buffer(_.flatten(audioAnalysis.segments.map(segment => segment.pitches)));

      hash.update(buffer);

      let extraParam;

      if (why === 'vocals') {
        extraParam = trackAudioFeatures.speechiness;
      }
      if (why === 'instrumentals') {
        extraParam = trackAudioFeatures.instrumentalness;
      }
      if (why === 'dancing') {
        extraParam = trackAudioFeatures.danceability;
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
    })
    .catch(next);
});

module.exports = router;
