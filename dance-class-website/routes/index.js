const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {mapApiKey: process.env.MAP_API_KEY
  });
});

module.exports = router;
