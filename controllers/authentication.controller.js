const { OAuthModel } = require('../dataBase');
const { authService, mailService } = require('../services');
const {
  success: { SUCCESS },
  authConst: { AUTHORIZATION },
  statusCode,
  emailActiosEnum: { WELCOME, LOG_OUT }
} = require('../constants');
const { userHelpers } = require('../helpers');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokenPair, user_id: _id });
      await mailService.sendMail(email, WELCOME, { userName: name });

      const normalizeUser = userHelpers.userNormalizator(req.user.toJSON());

      res.status(statusCode.CREATED_UPDATED).json({ ...tokenPair, user: normalizeUser });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { email, name } = req.user;
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });
      await mailService.sendMail(email, LOG_OUT, { userName: name });

      res.status(statusCode.NO_CONTENT_DELETED).json(SUCCESS);
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ refreshToken: token });

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });

      const normalizeUser = userHelpers.userNormalizator(req.user.toJSON());

      res.status(statusCode.CREATED_UPDATED).json({ ...tokkenPair, user: normalizeUser });
    } catch (err) {
      next(err);
    }
  },

  activate: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });
      await mailService.sendMail(email, WELCOME, { userName: name });

      const normalizeUser = userHelpers.userNormalizator(req.user.toJSON());

      res.status(statusCode.CREATED_UPDATED).json({ ...tokkenPair, user: normalizeUser });
    } catch (err) {
      next(err);
    }
  },
};
