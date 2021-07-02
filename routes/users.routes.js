const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersMiddleware.checkIsUserExist, usersController.getUserById);

router.post('/', usersMiddleware.checkAllDataValid, usersMiddleware.checkEmailExist, usersController.createUser);

router.put('/:userId', usersMiddleware.checkIsUserExist, usersMiddleware.checkAllDataValid, usersController.updateUser);

router.patch('/:userId', usersMiddleware.checkIsUserExist, usersMiddleware.checkSomeDataValid, usersController.updateSomeField);

router.delete('/:userId', usersMiddleware.checkIsUserExist, usersController.deleteUserById);

module.exports = router;
