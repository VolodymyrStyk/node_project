module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'http://localhost',
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/NodeApp',
};
