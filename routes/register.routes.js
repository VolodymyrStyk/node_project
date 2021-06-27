const router = require('express').Router();

const { registerController } = require('../controllers');
const { loginPasswordValidationMiddleware } = require('../middlewares');

router.post('/', loginPasswordValidationMiddleware.isInputDataValid,
  loginPasswordValidationMiddleware.isLoginExist,
  registerController.addNewUser);

module.exports = router;
