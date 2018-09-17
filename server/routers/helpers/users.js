function stripPassword(user) {
  const userWithoutPassword = user._doc;
  // don't send the password hash to user though
  delete userWithoutPassword.password;
  return userWithoutPassword;
}

module.exports = {
  stripPassword,
};
