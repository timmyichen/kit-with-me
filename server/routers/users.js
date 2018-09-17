const router = require('express-router-async')();
const { User } = require('../models');
const run = require('../lib/asyncErrorHandling');
const { stripPassword } = require('./helpers/users');

// API endpoint for getting a list of all users from the db
router.getAsync('/api/users', async (req, res) => {
  const [err, users] = await run(User.find({}));

  if (err) {
    throw new Error(err.message);
  }

  return res.json(users);
});

// this gets the current user information
router.get('/api/current_user', (req, res) => {
  if (!req.user) {
    return res.json();
  }

  return res.json(stripPassword(req.user));
});

module.exports = router;
