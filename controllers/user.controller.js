const { success, statusCode } = require('../constants');
const { UserModel } = require('../dataBase');
const { passwordHasher } = require('../helpers');

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
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const cretedUser = await UserModel.create({ ...req.body, password: hashedPassword });

      res.status(statusCode.CREATED_UPDATED).json(cretedUser);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body } = req;
      const { password } = body;

      const hashedPassword = await passwordHasher.hash(password);

      const userData = { ...req.body, password: hashedPassword };

      await UserModel.findByIdAndUpdate(userId, userData, { runValidators: true, useFindAndModify: false });

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

  updateSomeField: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body } = req;
      const { password } = body;

      if (password) {
        const hashedPassword = await passwordHasher.hash(password);

        const userData = { ...req.body, password: hashedPassword };

        await UserModel.findByIdAndUpdate(userId, userData, { runValidators: true, useFindAndModify: false });
      }

      if (!password) {
        await UserModel.findByIdAndUpdate(userId, body, { runValidators: true, useFindAndModify: false });
      }

      res.status(statusCode.CREATED_UPDATED).json(success.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  }
};
