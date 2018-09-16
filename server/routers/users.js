const router = require('express-router-async')();
const { User } = require('../models');
const go = require('../lib/asyncErrorHandling');

// API endpoint for getting a list of all users from the db
router.getAsync('/api/users', async (req, res) => {
  const [err, users] = await go(User.find({}));

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

  const userWithoutPassword = req.user._doc;
  // don't send the password hash to user though
  delete userWithoutPassword.password;
  return res.json(userWithoutPassword);
});

module.exports = router;
