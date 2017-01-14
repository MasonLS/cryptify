const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
  res.send('nothing');
});

module.exports = router;
