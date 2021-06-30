const { usersService } = require('../services');
const { success, statusCode } = require('../constants');
const { UserModel } = require('../dataBase');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({});

      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const cretedUser = await UserModel.create(req.body);

      res.status(statusCode.CREATED_UPDATED).json(cretedUser);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body } = req;

      await usersService.updateCurrentUser(userId, body);

      res.status(statusCode.CREATED_UPDATED).json(success.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await UserModel.findByIdAndDelete(userId);

      res.status(statusCode.NO_CONTENT_DELETED).json(success.DELETED_SUCCESS);
    } catch (err) {
      next(err);
    }
  },
  updateSomeFieldUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body } = req;

      await usersService.updateCurrentUser(userId, body);

      res.status(statusCode.CREATED_UPDATED).json(success.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  }
};
