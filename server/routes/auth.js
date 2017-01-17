const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const router = express.Router();

const client_id = '49859018c9a4462cbb4336259546f1e9';
const client_secret = '661daffd036e43c191ec9a8cf11665f3';
const redirect_uri = 'http://localhost:3001/auth/callback';

router.get('/callback', (req, res, next) => {

  const code = req.query.code || null;

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
            refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        request.get(options, function(error, response, body) {
          if (!error) {
            req.session.user = body;
            req.session.user.access_token = access_token;
            req.session.user.refresh_token = refresh_token;
            res.redirect('http://localhost:3000/home');
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
