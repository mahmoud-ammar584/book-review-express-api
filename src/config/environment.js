require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  sessionSecret: process.env.SESSION_SECRET || 'default-session-secret-change-in-production',
  jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
  jwtExpiry: process.env.JWT_EXPIRY || 3600,
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = config;
