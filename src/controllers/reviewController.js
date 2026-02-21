const bookService = require('../services/bookService');
const Logger = require('../utils/logger');

const addOrUpdateReview = (req, res) => {
  try {
    const { isbn } = req.params;
    const { review } = req.body;
    const username = req.session.authorization.username;

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'Review content is required',
      });
    }

    const result = bookService.addOrUpdateReview(isbn, username, review);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    Logger.info('Review added/updated', { isbn, username });
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    Logger.error('Error adding/updating review', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process review',
    });
  }
};

const deleteReview = (req, res) => {
  try {
    const { isbn } = req.params;
    const username = req.session.authorization.username;

    const result = bookService.deleteReview(isbn, username);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    Logger.info('Review deleted', { isbn, username });
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    Logger.error('Error deleting review', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
    });
  }
};

module.exports = { addOrUpdateReview, deleteReview };
