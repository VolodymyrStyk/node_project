const { statusCode } = require('../constants');
const { UserModel } = require('../dataBase');
const {
  ErrorHandler, errorMessages: {
    BAD_ID,
    USER_EXIST,
    VALIDATION_ERROR,
    WRONG_ID_FORMAT,
    FORBIDDEN_ACCES
  }
} = require('../errors');
const { userValid: { userValidator, userUpdateValidator, userIdValidator } } = require('../validators');

module.exports = {
  checkIsUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const isIdValid = userIdValidator(userId);

      if (!isIdValid) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_ID_FORMAT.message, WRONG_ID_FORMAT.code);
      }

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

  checkAllDataValid: (req, res, next) => {
    try {
      const { error } = userValidator.createValidUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, VALIDATION_ERROR.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  checkSomeDataValid: (req, res, next) => {
    try {
      const { error } = userUpdateValidator.createValidUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, VALIDATION_ERROR.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  checkEmailExist: async (req, res, next) => {
    try {
      const { body } = req;
      const { email } = body;
      const findUserByEmail = await UserModel.findOne({ email });

      if (findUserByEmail) {
        throw new ErrorHandler(statusCode.CONFLICT, USER_EXIST.message, USER_EXIST.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  checkUserRole: (rolesArr = []) => (req, res, next) => {
    try {
      if (!rolesArr || !rolesArr.length) {
        return next();
      }

      const { role } = req.user;

      if (!rolesArr.includes(role)) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN_ACCES.message, FORBIDDEN_ACCES.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  }
};
