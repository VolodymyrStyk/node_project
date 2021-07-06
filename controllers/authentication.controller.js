const { OAuthModel } = require('../dataBase');
const { authService } = require('../services');
const { success: { AUTHORIZATION, SUCCESS } } = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id } = req.user;

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });

      res.json({ ...tokkenPair, user: req.user });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });

      res.json(SUCCESS);
    } catch (err) {
      next(err);
    }
  },

  refresh: (req, res, next) => {
    try {
      const { body } = req;

      res.json(body);
    } catch (err) {
      next(err);
    }
  }
};
