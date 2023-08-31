const BadRequestError = require('./bad-request-err');
const NotFoundError = require('./not-found-err');
const Unauthorized = require('./unauthorized-err');
const ConflictError = require('./conflict-err');
const ForbiddenError = require('./forbidden-err');

module.exports = {
  BadRequestError,
  NotFoundError,
  Unauthorized,
  ConflictError,
  ForbiddenError,
};