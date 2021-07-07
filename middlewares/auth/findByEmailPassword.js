const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { WRONG_LOGIN_OR_PASS } } = require('../../errors');
const { passwordHasher } = require('../../helpers');
const { UserModel } = require('../../dataBase');

module.exports = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const userByLogin = await UserModel.findOne({ email });

    if (!userByLogin) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
    }

    await passwordHasher.compare(userByLogin.password, password);

    req.user = userByLogin;

    next();
  } catch (err) {
    next(err);
  }
};
