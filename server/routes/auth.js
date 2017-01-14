const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const router = express.Router();

const client_id = '49859018c9a4462cbb4336259546f1e9';
const client_secret = '661daffd036e43c191ec9a8cf11665f3';
const redirect_uri = 'http://localhost:3001/auth/callback';

router.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;

    var authOptions = {
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

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          req.session.user = body;
          req.session.user.access_token = access_token;
          req.session.user.refresh_token = refresh_token;
          res.redirect('http://localhost:3000/home');
        });
      }
    });

});

router.get('/refresh_token', function(req, res) {
  console.log(req.session.user);

  // requesting access token from refresh token
  // var refresh_token = req.query.refresh_token;
  // var authOptions = {
  //   url: 'https://accounts.spotify.com/api/token',
  //   headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
  //   form: {
  //     grant_type: 'refresh_token',
  //     refresh_token: refresh_token
  //   },
  //   json: true
  // };
  //
  // request.post(authOptions, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var access_token = body.access_token;
  //     res.send({
  //       'access_token': access_token
  //     });
  //   }
  // });
});

module.exports = router;
