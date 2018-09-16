const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectIdType = Schema.Types.ObjectId;

const contactInfo = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    enum: ['address', 'phone', 'email', 'facebook', 'instagram', 'twitter'],
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
    maxLength: 40,
  },
  description: {
    type: String,
    maxLength: 250,
  },
  sharedWith: [
    {
      type: objectIdType,
      ref: 'User',
    },
  ],
  owner: {
    type: objectIdType,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('ContactInfo', contactInfo);
