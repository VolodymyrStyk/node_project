const { success, statusCode } = require('../constants');
const { UserModel } = require('../dataBase');
const { passwordHasher } = require('../helpers');

const { mailService, authService } = require('../services');
const { emailActiosEnum: { CREATE_NEW_USER, DELETE_USER, UPDATE_USER } } = require('../constants');

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
      const { password, email, name } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const tokenPair = authService.generateTokenPair();
      req.body.mailToken = tokenPair.accessToken;

      const cretedUser = await UserModel.create({ ...req.body, password: hashedPassword });
      const { mailToken } = cretedUser;

      await mailService.sendMail(email, CREATE_NEW_USER, { userName: name, mailToken, userMail: email });

      res.status(statusCode.CREATED_UPDATED).json(cretedUser);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body } = req;
      const { password, name, email } = body;

      const hashedPassword = await passwordHasher.hash(password);

      const userData = { ...req.body, password: hashedPassword };

      await UserModel.findByIdAndUpdate(userId, userData, { runValidators: true, useFindAndModify: false });
      await mailService.sendMail(email, UPDATE_USER, { userName: name });

      res.status(statusCode.CREATED_UPDATED).json(success.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { email, name } = req.user;

      await UserModel.findByIdAndDelete(userId);
      await mailService.sendMail(email, DELETE_USER, { userName: name });

      res.status(statusCode.NO_CONTENT_DELETED).json(success.DELETED_SUCCESS);
    } catch (err) {
      next(err);
    }
  },

  updateSomeField: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body, user: { email } } = req;
      const { password, name } = body;

      if (password) {
        const hashedPassword = await passwordHasher.hash(password);

        const userData = { ...req.body, password: hashedPassword };

        await UserModel.findByIdAndUpdate(userId, userData, { runValidators: true, useFindAndModify: false });
      }

      if (!password) {
        await UserModel.findByIdAndUpdate(userId, body, { runValidators: true, useFindAndModify: false });
      }

      await mailService.sendMail(email, UPDATE_USER, { userName: name });

      res.status(statusCode.CREATED_UPDATED).json(success.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  }
};
