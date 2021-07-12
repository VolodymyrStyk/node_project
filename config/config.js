module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'http://localhost',
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/NodeApp',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ACC_Secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'REF_Secret',
  SERVICE_EMAIL: process.env.SERVICE_EMAIL || 'No Email service',
  SERVICE_EMAIL_LOGIN: process.env.SERVICE_EMAIL_LOGIN || 'No Email',
  SERVICE_EMAIL_PASS: process.env.SERVICE_EMAIL_PASS || 'No Pass',
  SERVICE_EMAIL_ACTIVATE: process.env.SERVICE_EMAIL_ACTIVATE || 'No url',
  STATIC: process.env.STATIC || 'static'
};
