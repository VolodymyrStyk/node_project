const router = require('express').Router();

const { authController } = require('../controllers');
const { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require('../constants/auth.constants');
const { authMiddleware } = require('../middlewares');

router.post('/login', authMiddleware.checkAuthDataValid, authMiddleware.findByEmailPassword, authController.login);
router.post('/logout', authMiddleware.checkToken(ACCESS_TOKEN_TYPE), authController.logout);
router.post('/refresh', authMiddleware.checkToken(REFRESH_TOKEN_TYPE), authController.refresh);

module.exports = router;
