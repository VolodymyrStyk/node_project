const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

_mogooseConnector();

const apiRouter = require('./routes');
const { server } = require('./constants');
const { errorsHandler: { _notFoundHandler, _handleErrors } } = require('./helpers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(server.PORT, () => {
  console.log(`App works on: ${server.HOST}:${server.PORT}`);
});

function _mogooseConnector() {
  mongoose.connect('mongodb://localhost:27017/NodeApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
