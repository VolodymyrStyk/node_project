const router = require('express').Router();

const { registerController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.post('/', usersMiddleware.isUserInputCreateDataValid,
  usersMiddleware.isLoginExist,
  registerController.addNewUser);

module.exports = router;
