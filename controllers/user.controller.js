const path = require('path');
const {
  success, statusCode, emailTemp, itemType, fileType
} = require('../constants');
const { emailActiosEnum: { CREATE_NEW_USER, DELETE_USER, UPDATE_USER } } = require('../constants');
const { config: { SERVICE_EMAIL_ACTIVATE } } = require('../config');
const { UserModel } = require('../dataBase');
const {
  passwordHasher,
  userHelpers,
  fileDirBuider: { fileDirBuilder },
  getSortedDirFiles: { getSortedFiles }
} = require('../helpers');
const { mailService, authService } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({}).lean();

      users.map((user) => userHelpers.userNormalizator(user));

      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;
      const normalizeUser = userHelpers.userNormalizator(user.toJSON());

      res.json(normalizeUser);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const {
        avatar,
        body: { password, email, name }
      } = req;

      const hashedPassword = await passwordHasher.hash(password);
      const tokenPair = authService.generateTokenPair();
      req.body.mailToken = tokenPair.accessToken;

      const cretedUser = await UserModel.create({ ...req.body, password: hashedPassword });
      const { mailToken, _id } = cretedUser;
      const activateUrl = SERVICE_EMAIL_ACTIVATE + mailToken;

      await mailService.sendMail(email, CREATE_NEW_USER, {
        userName: name,
        activateUrl,
        userMail: email
      }, emailTemp.SUBJ_CREATE);

      if (avatar) {
        const { finalPath, filePath } = await fileDirBuilder(avatar.name, _id, itemType.USERS, fileType.PHOTOS);
        await avatar.mv(finalPath);
        await UserModel.updateOne({ _id }, { avatar: filePath });
      }

      const normalizedUser = userHelpers.userNormalizator(cretedUser.toJSON());

      res.status(statusCode.CREATED_UPDATED).json(normalizedUser);
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
      await mailService.sendMail(email, UPDATE_USER, { userName: name }, emailTemp.SUBJ_UPDATE);

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
      await mailService.sendMail(email, DELETE_USER, { userName: name }, emailTemp.SUBJ_DELETE);

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

      await mailService.sendMail(email, UPDATE_USER, { userName: name }, emailTemp.SUBJ_UPDATE);

      res.status(statusCode.CREATED_UPDATED).json(success.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  },

  addAvatar: async (req, res, next) => {
    try {
      const [avatar] = req.photos;
      const { userId } = req.params;

      if (avatar) {
        const { finalPath, filePath, fileNameExt } = await fileDirBuilder(avatar.name, userId, itemType.USERS, fileType.PHOTOS);
        await avatar.mv(finalPath);
        await UserModel.updateOne({ _id: userId }, { avatar: filePath });

        res.status(statusCode.CREATED_UPDATED).json(fileNameExt);
      }
    } catch (err) {
      next(err);
    }
  },

  getAvatars: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const dirPath = path.join(process.cwd(), 'static', itemType.USERS, userId, fileType.PHOTOS);

      const files = await getSortedFiles(dirPath);

      res.json(files);
    } catch (e) {
      next(e);
    }
  },

  addDocuments: async (req, res, next) => {
    try {
      const [document] = req.documents;
      const { userId } = req.params;

      if (document) {
        const {
          finalPath,
          uploadPath,
          fileNameExt
        } = await fileDirBuilder(document.name, userId, itemType.USERS, fileType.DOCUMENTS);
        await document.mv(finalPath);
        await UserModel.updateOne({ _id: userId }, { documents: uploadPath });

        res.status(statusCode.CREATED_UPDATED).json(fileNameExt);
      }
    } catch (err) {
      next(err);
    }
  },

  getDocuments: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const dirPath = path.join(process.cwd(), 'static', itemType.USERS, userId, fileType.DOCUMENTS);

      const files = await getSortedFiles(dirPath);

      res.json(files);
    } catch (e) {
      next(e);
    }
  },
};
