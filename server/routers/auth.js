const router = require('express-router-async')();
const passport = require('../middleware/passport');

// we use passport.js to authenticate users.
// 'local' is the strategy used, just means login with username/password or equivalent
router.post(
  '/api/user/login',
  passport.authenticate('local-login', { failureRedirect: '/login-fail' }),
  (req, res) => {
    return res.redirect('/login-success');
  },
);

// API endpoint for creating a user
router.post(
  '/api/user/signup',
  passport.authenticate('local-signup'),
  (req, res) => {
    return res.redirect('/api/current_user');
  },
);

// passport attaches the .logout() method to the request
router.get('/logout', function(req, res) {
  req.logout();
  return res.redirect('/');
});

// TODO - remove these, used for testing auth
router.get('/login-fail', (req, res) => {
  res.send('no login :(');
});

router.get('/login-success', (req, res) => {
  res.send('yay login');
});

module.exports = router;
