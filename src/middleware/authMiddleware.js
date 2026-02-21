const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const Logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {
  try {
    if (!req.session.authorization) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
    }

    const token = req.session.authorization.accessToken;

    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        Logger.warn('Token verification failed', { error: err.message });
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Invalid or expired token',
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    Logger.error('Authentication middleware error', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { authenticateToken };
