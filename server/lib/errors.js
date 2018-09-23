const util = require('util');

function NotFoundError(...args) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  const msg = util.format(...args);
  this.message = msg;
  this.name = 'NotFoundError';
  this.status = 404;
}

util.inherits(NotFoundError, Error);

function UnauthorizedError(...args) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  const msg = util.format(...args) || 'Unauthorized, please log in.';
  this.message = msg;
  this.name = 'UnauthorizedError';
  this.status = 403;
}

util.inherits(UnauthorizedError, Error);

function UserError(...args) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  const msg = util.format(...args);
  this.message = msg;
  this.name = 'UserError';
  this.status = 400;
}

util.inherits(UserError, Error);

module.exports = {
  NotFoundError,
  UserError,
  UnauthorizedError,
};
