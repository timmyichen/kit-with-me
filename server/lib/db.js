const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/kit',
  { useNewUrlParser: true },
);

module.exports = {
  mongoose,
};
