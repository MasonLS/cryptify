import express from 'express';
import request from 'request';
import querystring from 'querystring';

const router = express.Router();

const clientId = process.env.SPOTIFY_CLIENT_ID || '49859018c9a4462cbb4336259546f1e9';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectURI = process.env.NODE_SERVER + '/auth/callback' || 'http://localhost:3000/auth/callback';

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
      console.log(response.statusCode, body);
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

            res.redirect('/home');
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
