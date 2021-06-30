const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersMiddleware.checkIsUserExist, usersController.getUserById);

router.post('/', usersMiddleware.isUserInputCreateDataValid, usersMiddleware.isLoginExist, usersController.createUser);

router.put('/:userId', usersMiddleware.checkIsUserExist, usersMiddleware.isUserInputCreateDataValid, usersController.updateUser);

router.patch('/:userId', usersMiddleware.checkIsUserExist, usersController.updateSomeFieldUser);

router.delete('/:userId', usersMiddleware.checkIsUserExist, usersController.deleteUserById);

module.exports = router;
