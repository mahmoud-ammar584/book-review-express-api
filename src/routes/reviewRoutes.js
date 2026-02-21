const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/review/:isbn', authenticateToken, reviewController.addOrUpdateReview);
router.delete('/review/:isbn', authenticateToken, reviewController.deleteReview);

module.exports = router;
