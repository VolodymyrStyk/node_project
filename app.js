const express = require('express');
const path = require('path');

const app = express();

const apiRouter = require('./routes');
const { server } = require('./constants');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);

app.listen(server.PORT, () => {
  console.log(`App works: ${server.HOST}:${server.PORT}`);
});
