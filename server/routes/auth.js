const express = require('express');
const request = require('request');
const querystring = require('querystring');
const env = require('../env');

const router = express.Router();

const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const redirectURI = 'http://localhost:3001/auth/callback';

router.get('/callback', (req, res, next) => {
  const code = req.query.code || null;

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectURI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token,
            refreshToken = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + accessToken },
          json: true
        };

        request.get(options, function(error, response, body) {
          if (!error) {
            req.session.user = body;
            req.session.user.access_token = accessToken;
            req.session.user.refresh_token = refreshToken;

            if (env.NODE_ENV === 'development') {
              res.redirect('http://localhost:3000/home');
            } else {
              res.redirect('/home');
            }
          } else {
            next(error);
          }
        });
      } else {
        next(error);
      }
    });

});

module.exports = router;
