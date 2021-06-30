const { statusCode } = require('../constants');
const { UserModel } = require('../dataBase');
const {
  ErrorHandler, errorMessages: {
    BAD_ID, EMPTY_LOGIN, EMPTY_PASSWORD, SHORT_PASS, USER_EXIST, WRONG_LOGIN_OR_PASS, EMPTY_EMAIL, EMPTY_NAME
  }
} = require('../errors');

module.exports = {
  checkIsUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userById = await UserModel.findById(userId);

      if (!userById) {
        throw new ErrorHandler(statusCode.NOT_FOUND, BAD_ID.message, BAD_ID.code);
      }

      req.user = userById;

      next();
    } catch (err) {
      next(err);
    }
  },

  isUserInputCreateDataValid: (req, res, next) => {
    try {
      const {
        login, password, name, email
      } = req.body;

      if (!login) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_LOGIN.message, EMPTY_LOGIN.code);
      }

      if (!password) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_PASSWORD.message, EMPTY_PASSWORD.code);
      }

      if (password.length < 3) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, SHORT_PASS.message, SHORT_PASS.code);
      }

      if (!name) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_NAME.message, EMPTY_NAME.code);
      }

      if (!email) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_EMAIL.message, EMPTY_EMAIL.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  isUserInputLoginDataValid: (req, res, next) => {
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

  isLoginExist: async (req, res, next) => {
    try {
      const { body } = req;
      const { login } = body;
      const [findUserByLogin] = await UserModel.find({ login });

      if (findUserByLogin) {
        throw new ErrorHandler(statusCode.CONFLICT, USER_EXIST.message, USER_EXIST.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  findUser: async (req, res, next) => {
    try {
      const { body } = req;
      const { login, password } = body;
      const [findUser] = await UserModel.find({ login, password });

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
