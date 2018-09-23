const router = require('express-router-async')();
const { User } = require('../models');
const run = require('../lib/asyncErrorHandling');
const { UserError } = require('../lib/errors');
const { mongoose, objId } = require('../lib/db');
const { connectionsToBuckets } = require('./helpers/users');
const { asUserOrReject } = require('../middleware/asUser');

router.postAsync('/api/friends/request', asUserOrReject, async (req, res) => {
  const targetId = req.body.id;
  const originId = objId(req.user._id);

  const conBuckets = connectionsToBuckets(req.user.connections);

  let user;

  console.log(1);

  if (Object.keys(conBuckets.blockedBy).includes(targetId)) {
    throw new UserError('The action could not be completed');
  }

  if (Object.keys(conBuckets.requested).includes(targetId)) {
    throw new UserError('You have already sent a friend request');
  }

  if (Object.keys(conBuckets.friend).includes(targetId)) {
    throw new UserError('You are already friends');
  }

  if (Object.keys(conBuckets.blocked).includes(targetId)) {
    throw new UserError(
      'You must unblock this person to send a friend request',
    );
  }

  console.log(2);

  if (Object.keys(conBuckets.requestedBy).includes(targetId)) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      user = await User.findOneAndUpdate(
        {
          _id: originId,
          'connections.userId': objId(targetId),
        },
        {
          $set: {
            'connections.$.status': 'friend',
          },
        },
        { session },
      );

      await User.findOneAndUpdate(
        {
          _id: objId(targetId),
          'connections.userId': originId,
        },
        {
          $set: {
            'connections.$.status': 'friend',
          },
        },
        { session },
      );
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new UserError(err.message);
    }

    await session.commitTransaction();
    session.endSession();

    return res.json({ data: user, success: true });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    [user] = await Promise.all([
      User.findOneAndUpdate(
        { _id: originId },
        {
          $push: {
            connections: {
              userId: objId(targetId),
              status: 'requested',
            },
          },
        },
        { session },
      ),
      await User.findOneAndUpdate(
        { _id: objId(targetId) },
        {
          $push: {
            connections: {
              userId: originId,
              status: 'requestedBy',
            },
          },
        },
        { session },
      ),
    ]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new UserError(err.message);
  }

  await session.commitTransaction();
  session.endSession();

  return res.json({ data: user, success: true });
});

router.post('/api/friends/rescind-request', asUserOrReject, (req, res) => {});

router.post('/api/friends/accept-request', asUserOrReject, (req, res) => {});

router.post('/api/friends/decline-request', asUserOrReject, (req, res) => {});

router.post('/api/friends/block', asUserOrReject, (req, res) => {});

router.post('/api/friends/unblock', asUserOrReject, (req, res) => {});

router.post('/api/friends/unfriend', asUserOrReject, (req, res) => {});

module.exports = router;
