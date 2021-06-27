const { registerService } = require('../services');

module.exports = {
  addNewUser: (req, res) => {
    const { body } = req;
    registerService.registerNewUser(body);

    res.json('Success. You register new user');
  },
};
