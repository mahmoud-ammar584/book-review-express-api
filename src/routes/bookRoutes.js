const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/isbn/:isbn', bookController.getBookByISBN);
router.get('/author/:author', bookController.getBooksByAuthor);
router.get('/title/:title', bookController.searchBooksByTitle);
router.get('/reviews/:isbn', bookController.getReviews);

module.exports = router;
