const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  const { user } = req;

  res.json({ user });
});

module.exports = router;
