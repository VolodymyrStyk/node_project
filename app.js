require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { config: { HOST, PORT, DB_CONNECTION_URI } } = require('./config');
const { errorsHandler: { _notFoundHandler, _handleErrors } } = require('./helpers');
const apiRouter = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(PORT, () => {
  console.log(`App works on: ${HOST}:${PORT}`);
});

function _mongooseConnector() {
  mongoose.connect(DB_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}
