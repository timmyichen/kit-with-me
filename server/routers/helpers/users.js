const colors = require('../../lib/colors');
const animals = require('../../lib/animals');
const { User } = require('../../models');

function stripPassword(user) {
  const userWithoutPassword = user._doc;
  // don't send the password hash to user though
  delete userWithoutPassword.password;
  return userWithoutPassword;
}

function generateProfileName() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return color + animal;
}

async function generateUniqueProfileName() {
  let isUnique = false;
  let profileName;
  while (!isUnique) {
    profileName = generateProfileName();
    isUnique = !(await User.findOne({ profileName }));
  }
  return profileName;
}

module.exports = {
  stripPassword,
  generateUniqueProfileName,
};
