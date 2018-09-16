const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const objectIdType = Schema.Types.ObjectId;

const userConnection = new Schema({
  _id: {
    type: objectIdType,
    ref: 'User',
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: ['requester', 'requestee', 'friend', 'blocked'],
    required: true,
  },
});

const contactInfoConnection = new Schema({
  _id: {
    type: objectIdType,
    ref: 'ContactInfo',
    unique: true,
    required: true,
  },
});

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  contactInfos: [
    {
      type: objectIdType,
      ref: 'ContactInfo',
    },
  ],
  connections: [userConnection],
  timeCreated: {
    type: Date,
    default: Date.now(),
  },
  timeDeleted: {
    type: Date,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
