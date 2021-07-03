const { statusCode } = require('../constants');
const { UserModel } = require('../dataBase');
const { ErrorHandler, errorMessages: { BAD_ID, USER_EXIST, VALIDATION_ERROR } } = require('../errors');
const { userValid: { userValidator, userUpdateValidator } } = require('../validators');

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
  }
};
