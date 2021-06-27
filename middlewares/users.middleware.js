const { errorMessage, statusCode } = require('../constants');

module.exports = {
  checkIsIdValid: (req, res, next) => {
    const userId = +req.params.userId;

    if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.BAD_ID);
    }

    next();
  },

  isUserValid: (req, res, next) => {
    const { login, password } = req.body;

    if (!login) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.EMPTY_LOGIN);
    }

    if (!password) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.EMPTY_PASSWORD);
    }

    if (password.length <= 3) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.SHORT_PASS);
    }

    next();
  }
};
