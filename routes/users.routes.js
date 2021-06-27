const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersMiddleware.checkIsIdValid, usersController.getUserById);

router.post('/', usersMiddleware.isUserValid, usersController.createUser);

router.put('/:userId', usersMiddleware.checkIsIdValid, usersMiddleware.isUserValid, usersController.updateUser);

router.delete('/:userId', usersMiddleware.checkIsIdValid, usersController.deleteUserById);

module.exports = router;
