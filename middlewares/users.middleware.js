const { errorMessage, statusCode } = require('../constants');
const db = require('../dataBase/users.dataBase.json');

module.exports = {
  checkIsIdValid: (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const userById = db[userId];

      if (!userById) {
        throw new Error(errorMessage.BAD_ID);
      }

      req.user = userById;

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isUserInputDataValid: (req, res, next) => {
    try {
      const { login, password } = req.body;

      if (!login) {
        throw new Error(errorMessage.EMPTY_LOGIN);
      }

      if (!password) {
        throw new Error(errorMessage.EMPTY_PASSWORD);
      }

      if (password.length < 3) {
        throw new Error(errorMessage.SHORT_PASS);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isLoginExist: (req, res, next) => {
    try {
      const { body } = req;
      const { login } = body;
      const findUserByLogin = db.find(({ login: existLogin }) => existLogin === login);

      if (findUserByLogin) {
        throw new Error(errorMessage.USER_EXIST);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  findUser: (req, res, next) => {
    try {
      const { body } = req;
      const { login, password } = body;
      const findUser = db.find(({ login: existLog, password: existPass }) => existLog === login && existPass === password);

      if (!findUser) {
        throw new Error(errorMessage.WRONG_LOGIN_OR_PASS);
      }

      req.user = findUser;

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
};
