const router = require('express-router-async')();
const { User } = require('../models');
const run = require('../lib/asyncErrorHandling');
const { stripPassword } = require('./helpers/users');

router.getAsync('/api/users', async (req, res) => {
  const [err, users] = await run(User.find({}));

  if (err) {
    throw new Error(err.message);
  }

  return res.json(users);
});

router.get('/api/current_user', (req, res) => {
  if (!req.user) {
    return res.json({ error: 'not logged in' });
  }

  return res.json(stripPassword(req.user));
});

module.exports = router;
