const { statusCode } = require('../constants');
const { UserModel } = require('../dataBase');
const { ErrorHandler, errorMessages: { WRONG_LOGIN_OR_PASS, VALIDATION_ERROR } } = require('../errors');
const { passwordHasher } = require('../helpers');
const { authValid: { authentValidator } } = require('../validators');

module.exports = {

  checkAuthDataValid: (req, res, next) => {
    try {
      const { error } = authentValidator.createValidAuth.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, VALIDATION_ERROR.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  findByEmailPassword: async (req, res, next) => {
    try {
      const { body: { email, password } } = req;
      const userByLogin = await UserModel.findOne({ email });

      if (!userByLogin) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
      }

      await passwordHasher.compare(userByLogin.password, password);

      req.user = userByLogin;

      next();
    } catch (err) {
      next(err);
    }
  },
};
