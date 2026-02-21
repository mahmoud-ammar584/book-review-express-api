const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const userService = require('../services/userService');
const Logger = require('../utils/logger');

const register = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const result = userService.registerUser(username, password);

    if (!result.success) {
      return res.status(409).json({
        success: false,
        message: result.message,
      });
    }

    Logger.info('User registered successfully', { username });
    res.status(201).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    Logger.error('Registration error', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
};

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    if (!userService.authenticateUser(username, password)) {
      Logger.warn('Failed login attempt', { username });
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const accessToken = jwt.sign(
      { username },
      config.jwtSecret,
      { expiresIn: config.jwtExpiry }
    );

    req.session.authorization = {
      accessToken,
      username,
    };

    Logger.info('User logged in successfully', { username });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: accessToken,
    });
  } catch (error) {
    Logger.error('Login error', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
};

module.exports = { register, login };
