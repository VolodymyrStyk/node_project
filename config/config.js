module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'http://localhost',
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/NodeApp',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ACC_Secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'REF_Secret'
};
