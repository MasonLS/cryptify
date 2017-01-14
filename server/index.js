var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var auth = require('./routes/auth');

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.use('/', (req, res, next) => {
  res.redirect('http://localhost:3000/');
});

app.use('/auth', auth);

console.log('Listening on 3001');
app.listen(3001);
