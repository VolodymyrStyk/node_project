const { errorMessage, statusCode } = require('../constants');
const db = require('../dataBase/users.dataBase.json');

module.exports = {
  isInputDataValid: (req, res, next) => {
    const { body } = req;
    const { login, password } = body;

    if (!login) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.EMPTY_LOGIN);
    }

    if (!password) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.EMPTY_PASSWORD);
    }

    if (password.length <= 3) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.SHORT_PASS);
    }

    next();
  },

  findUser: (req, res, next) => {
    const { body } = req;
    const { login, password } = body;
    const findUser = db.find(({ login: existLog, password: existPass }) => existLog === login && existPass === password);

    if (findUser) {
      req.user = findUser;
      next();
    }

    if (!findUser) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.NOT_FOUND);
    }
  },

  isLoginExist: (req, res, next) => {
    const { body } = req;
    const { login } = body;
    const findUserByLogin = db.find(({ login: existLogin }) => existLogin === login);

    if (findUserByLogin) {
      res.status(statusCode.BAD_REQUEST).json(errorMessage.USER_EXIST);
    }

    if (!findUserByLogin) {
      next();
    }
  }
};
