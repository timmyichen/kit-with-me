const slug = require('slug');
const { User } = require('../../models');

function stripRestrictedInfo(u) {
  const user = u._doc;
  delete user.password;

  user.connections = user.connections.filter(c => c.status !== 'blockedBy');

  return user;
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

function connectionsToBuckets(connections) {
  const conStatuses = [
    'requested',
    'requestedBy',
    'friend',
    'blocked',
    'blockedBy',
  ];

  const buckets = conStatuses.reduce(
    (obj, status) => ({
      ...obj,
      [status]: {},
    }),
    {},
  );

  for (const con of connections) {
    buckets[con.status][con.userId] = con;
  }
  console.log(buckets);
  return buckets;
}

module.exports = {
  stripRestrictedInfo,
  generateUniqueProfileName,
  connectionsToBuckets,
};
