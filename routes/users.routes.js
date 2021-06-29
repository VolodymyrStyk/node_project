const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersMiddleware.checkIsIdValid, usersController.getUserById);

router.post('/', usersMiddleware.isUserInputDataValid, usersMiddleware.isLoginExist, usersController.createUser);

router.put('/:userId', usersMiddleware.checkIsIdValid, usersMiddleware.isUserInputDataValid, usersController.updateUser);

router.patch('/:userId', usersMiddleware.checkIsIdValid, usersController.updateSomeFieldUser);

router.delete('/:userId', usersMiddleware.checkIsIdValid, usersController.deleteUserById);

module.exports = router;
