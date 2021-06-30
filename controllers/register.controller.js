const { statusCode } = require('../constants');
const { UserModel } = require('../dataBase');

module.exports = {
  addNewUser: async (req, res, next) => {
    try {
      const { body } = req;
      const cretedUser = await UserModel.create(body);

      res.status(statusCode.CREATED).json(cretedUser);
    } catch (err) {
      next(err);
    }
  },
};
