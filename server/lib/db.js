const mongoose = require('mongoose');
const mongodb = require('mongodb');

mongoose.connect(
  'mongodb://localhost/kit',
  {
    useNewUrlParser: true,
    replicaSet: 'rs',
  },
);

function objId(id) {
  return new mongodb.ObjectID(id);
}

module.exports = {
  mongoose,
  objId,
};
