const { UserModel } = require('../dataBase');

module.exports = {
  updateCurrentUser: async (userId, body) => {
    await UserModel.findByIdAndUpdate(userId, body, { runValidators: true, useFindAndModify: false });
  },

  updateCurrentUserFields: async (userId, body) => {
    await UserModel.findByIdAndUpdate(userId, body, { runValidators: true, useFindAndModify: false });
  }
};
