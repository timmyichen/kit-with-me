const router = require('express-router-async')();
const passport = require('../middleware/passport');

// we use passport.js to authenticate users.
// 'local' is the strategy used, just means login with username/password or equivalent
router.post(
  '/api/user/login',
  passport.authenticate('local-login'),
  (req, res) => {
    res.json({ user: req.user });
  },
);

// API endpoint for creating a user
router.post(
  '/api/user/signup',
  passport.authenticate('local-signup'),
  (req, res) => {
    res.json({ user: req.user });
  },
);

// passport attaches the .logout() method to the request
router.get('/logout', function(req, res) {
  req.logout();
  return res.redirect('/');
});

module.exports = router;
