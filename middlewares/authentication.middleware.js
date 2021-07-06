const { statusCode, success: { AUTHORIZATION } } = require('../constants');
const { UserModel, OAuthModel } = require('../dataBase');
const { ErrorHandler, errorMessages: { WRONG_LOGIN_OR_PASS, VALIDATION_ERROR, UNAUTHORIZED } } = require('../errors');
const { passwordHasher } = require('../helpers');
const { authValid: { authentValidator } } = require('../validators');
const { authService } = require('../services');

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

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, UNAUTHORIZED.message, UNAUTHORIZED.code);
      }

      await authService.verifyToken(token);

      const tokenObject = await OAuthModel.findOne({ accessToken: token });

      if (!tokenObject) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, UNAUTHORIZED.message, UNAUTHORIZED.code);
      }

      req.user = tokenObject.user_id;

      next();
    } catch (err) {
      next(err);
    }
  },
};
