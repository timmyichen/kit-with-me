const router = require('express-router-async')();
const { User } = require('../models');
const run = require('../lib/asyncErrorHandling');
const { stripRestrictedInfo } = require('./helpers/users');

router.getAsync('/api/users', async (req, res) => {
  const [err, users] = await run(User.find({}));

  if (err) {
    throw new Error(err.message);
  }

  return res.json(users);
});

router.getAsync('/api/user/profile/:profileName', async (req, res) => {
  const [err, user] = await run(
    User.findOne({ profileName: req.params.profileName }),
  );

  if (err) {
    throw new Error(err.message);
  }

  const { _id, firstName, lastName, profileName } = user;

  return res.json({
    id: _id,
    profileName,
    firstName,
    lastName,
  });
});

router.get('/api/current_user', (req, res) => {
  if (!req.user) {
    return res.json({ error: 'not logged in' });
  }

  return res.json(stripRestrictedInfo(req.user));
});

module.exports = router;
