const { statusCode } = require('../constants');
const { errorMessages: { ROUTE_NOT_FOUND, UNKNOWN_ERROR } } = require('../errors');

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
    .status(err.status || statusCode.BAD_REQUEST)
    .json({
      message: err.message || UNKNOWN_ERROR.message,
      customCode: err.code || UNKNOWN_ERROR.code
    });
}

function _notFoundHandler(req, res, next) {
  next({
    status: statusCode.NOT_FOUND,
    message: ROUTE_NOT_FOUND.message,
    code: ROUTE_NOT_FOUND.code
  });
}

module.exports = {
  _handleErrors,
  _notFoundHandler
};
