const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/login', authMiddleware.checkAuthDataValid, authMiddleware.findByEmailPassword, authController.showUser);
router.post('/logout', authMiddleware.checkAuthDataValid, authMiddleware.findByEmailPassword, authController.showUser);

module.exports = router;
