const router = require('express').Router();

const usersRouter = require('./users.routes');
const authenticationRouter = require('./authentication.routes');
const mainRouter = require('./main.routes');

router.use('/', mainRouter);
router.use('/users', usersRouter);
router.use('/authentication', authenticationRouter);

module.exports.userRoute = require('./users.routes');
module.exports.authenticationRouter = require('./authentication.routes');
module.exports.mainRoute = require('./main.routes');

module.exports = router;
