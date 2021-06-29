const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const apiRouter = require('./routes');
const { server, statusCode } = require('./constants');
const { errorMessages: { ROUTE_NOT_FOUND } } = require('./errors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);
app.use(_handleErrors);
app.use('*', _notFoundHandler);

app.listen(server.PORT, () => {
  console.log(`App works: ${server.HOST}:${server.PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  console.log(err);
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(req, res) {
  res.status(statusCode.NOT_FOUND)
    .json({
      message: ROUTE_NOT_FOUND.message,
      customCode: ROUTE_NOT_FOUND.code
    });
}

// eslint-disable-next-line no-unused-vars
function _mogooseConnector() {
  mongoose.connect('mongodb://localhost:27017/myNodeApp', { useNewUrlParser: true });
}
