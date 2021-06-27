const router = require('express').Router();

const usersRouter = require('./users.routes');
const loginRouter = require('./login.routes');
const registerRouter = require('./register.routes');
const mainRouter = require('./mainRouter');

router.use('/', mainRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);

module.exports = router;
