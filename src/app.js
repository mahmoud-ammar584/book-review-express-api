const express = require('express');
const session = require('express-session');
const config = require('./config/environment');
const Logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: config.environment === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Protected routes
app.use('/api/reviews', reviewRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = () => {
  app.listen(config.port, () => {
    Logger.info('ShelfWise API started successfully', {
      port: config.port,
      environment: config.environment,
    });
  });
};

module.exports = { app, startServer };
