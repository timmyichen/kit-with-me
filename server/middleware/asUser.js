const asUserOrRedirect = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};

const asUserOrReject = async (req, res, next) => {
  if (!req.user) {
    return res.status(400).send('You must be logged in');
  }
  next();
};

module.exports = {
  asUserOrRedirect,
  asUserOrReject,
};
