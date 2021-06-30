const router = require('express').Router();

const usersRouter = require('./users.routes');
const loginRouter = require('./login.routes');
const mainRouter = require('./main.routes');

router.use('/', mainRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);

module.exports.userRoute = require('./users.routes');
module.exports.loginRoute = require('./login.routes');
module.exports.mainRoute = require('./main.routes');

module.exports = router;
