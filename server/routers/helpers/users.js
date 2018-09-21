const slug = require('slug');
const { User } = require('../../models');

function stripPassword(user) {
  const userWithoutPassword = user._doc;
  // don't send the password hash to user though
  delete userWithoutPassword.password;
  return userWithoutPassword;
}

async function generateUniqueProfileName(user) {
  const { firstName, lastName } = user;
  const combinedName = slug(firstName + lastName);
  let profileName = combinedName + Math.floor(Math.random() * 20 + 1);
  let foundUser = true;

  while (foundUser) {
    const re = new RegExp(`^${profileName}`, 'i');
    foundUser = !!(await User.findOne({ profileName }, {}));
    if (foundUser) {
      profileName = combinedName + Math.floor(Math.random() * 20 + 1);
    }
  }

  return profileName;
}

module.exports = {
  stripPassword,
  generateUniqueProfileName,
};
