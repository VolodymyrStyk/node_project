const { OAuthModel } = require('../dataBase');
const { authService, mailService } = require('../services');
const {
  success: { SUCCESS },
  authConst: { AUTHORIZATION },
  statusCode,
  emailActiosEnum: { WELCOME, PASSWORD_CHANGE }
} = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokenPair, user_id: _id });
      await mailService.sendMail(email, WELCOME, { userName: name });

      res.status(statusCode.CREATED_UPDATED).json({ ...tokenPair, user: req.user });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { email, name } = req.user;
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });
      await mailService.sendMail(email, PASSWORD_CHANGE, { userName: name });

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

      res.status(statusCode.CREATED_UPDATED).json({ ...tokkenPair, user: req.user });
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

      res.status(statusCode.CREATED_UPDATED).json({ ...tokkenPair, user: req.user });
    } catch (err) {
      next(err);
    }
  },
};
