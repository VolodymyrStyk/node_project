const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.checkAuthDataValid, authMiddleware.findByEmailPassword, authController.showUser);

module.exports = router;
