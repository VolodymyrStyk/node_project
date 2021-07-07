const router = require('express').Router();

const { usersController } = require('../controllers');
const { ACCESS_TOKEN_TYPE } = require('../constants/auth.constants');
const { userMiddleware, authMiddleware } = require('../middlewares');
const { userValid: { userUpdateValidator, userValidator } } = require('../validators');

router.get('/', usersController.getAllUsers);

router.post('/',
  userMiddleware.checkAllDataValid,
  userMiddleware.checkEmailExist,
  usersController.createUser);

router.use('/:userId',
  userMiddleware.checkUserRole(),
  userMiddleware.checkIsUserExist,
  authMiddleware.checkToken(ACCESS_TOKEN_TYPE));

router.get('/:userId',
  usersController.getUserById);

router.patch('/:userId',
  userMiddleware.checkDataValid(userUpdateValidator),
  userMiddleware.checkEmailExist,
  usersController.updateSomeField);

router.put('/:userId',
  userMiddleware.checkDataValid(userValidator),
  userMiddleware.checkEmailExist,
  usersController.updateUser);

router.delete('/:userId',
  usersController.deleteUserById);

module.exports = router;
