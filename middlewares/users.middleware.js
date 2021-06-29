const { statusCode } = require('../constants');
const {
  ErrorHandler, errorMessages: {
    BAD_ID, EMPTY_LOGIN, EMPTY_PASSWORD, SHORT_PASS, USER_EXIST, WRONG_LOGIN_OR_PASS
  }
} = require('../errors');
const db = require('../dataBase/users.dataBase.json');

module.exports = {
  checkIsIdValid: (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const userById = db[userId];

      if (!userById) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, BAD_ID.message, BAD_ID.code);
      }

      req.user = userById;

      next();
    } catch (err) {
      next(err);
    }
  },

  isUserInputDataValid: (req, res, next) => {
    try {
      const { login, password } = req.body;

      if (!login) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_LOGIN.message, EMPTY_LOGIN.code);
      }

      if (!password) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_PASSWORD.message, EMPTY_PASSWORD.code);
      }

      if (password.length < 3) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, SHORT_PASS.message, SHORT_PASS.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  isLoginExist: (req, res, next) => {
    try {
      const { body } = req;
      const { login } = body;
      const findUserByLogin = db.find(({ login: existLogin }) => existLogin === login);

      if (findUserByLogin) {
        throw new ErrorHandler(statusCode.CONFLICT, USER_EXIST.message, USER_EXIST.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },
  findUser: (req, res, next) => {
    try {
      const { body } = req;
      const { login, password } = body;
      const findUser = db.find(({ login: existLog, password: existPass }) => existLog === login && existPass === password);

      if (!findUser) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
      }

      req.user = findUser;

      next();
    } catch (err) {
      next(err);
    }
  },
};
