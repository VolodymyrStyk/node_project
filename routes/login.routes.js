const router = require('express').Router();

const { loginController } = require('../controllers');
const { loginPasswordValidationMiddleware } = require('../middlewares');

router.post('/', loginPasswordValidationMiddleware.isInputDataValid,
  loginPasswordValidationMiddleware.findUser,
  loginController.findUserByLoginPassword);

module.exports = router;
