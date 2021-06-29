const router = require('express').Router();

const { loginController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.post('/', usersMiddleware.isUserInputDataValid,
  usersMiddleware.findUser,
  loginController.findUserByLoginPassword);

module.exports = router;
