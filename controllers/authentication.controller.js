const { OAuthModel } = require('../dataBase');
const { authService } = require('../services');
const { success: { SUCCESS }, authConst: { AUTHORIZATION }, statusCode } = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id } = req.user;

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });

      res.status(statusCode.CREATED_UPDATED).json({ ...tokkenPair, user: req.user });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });

      res.status(statusCode.NO_CONTENT_DELETED).json(SUCCESS);
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { _id } = req.user;

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });

      res.status(statusCode.CREATED_UPDATED).json({ ...tokkenPair, user: req.user });
    } catch (err) {
      next(err);
    }
  }
};
