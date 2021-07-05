const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);

router.post('/',
  usersMiddleware.checkAllDataValid,
  usersMiddleware.checkEmailExist,
  usersController.createUser);

router.use('/:userId', usersMiddleware.checkIsUserExist);

router.get('/:userId',
  usersController.getUserById);

router.put('/:userId',
  usersMiddleware.checkAllDataValid,
  usersMiddleware.checkEmailExist,
  usersController.updateUser);

router.patch('/:userId',
  usersMiddleware.checkSomeDataValid,
  usersMiddleware.checkEmailExist,
  usersController.updateSomeField);

router.delete('/:userId',
  usersController.deleteUserById);

module.exports = router;
