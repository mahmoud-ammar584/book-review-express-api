const bookService = require('../services/bookService');
const Logger = require('../utils/logger');

const getAllBooks = (req, res) => {
  try {
    const books = bookService.getAllBooks();
    res.status(200).json({
      success: true,
      data: books,
      count: Object.keys(books).length,
    });
  } catch (error) {
    Logger.error('Error fetching books', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
    });
  }
};

const getBookByISBN = (req, res) => {
  try {
    const { isbn } = req.params;

    const book = bookService.getBookByISBN(isbn);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    Logger.error('Error fetching book by ISBN', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book',
    });
  }
};

const getBooksByAuthor = (req, res) => {
  try {
    const { author } = req.params;

    if (!author) {
      return res.status(400).json({
        success: false,
        message: 'Author name is required',
      });
    }

    const books = bookService.getBooksByAuthor(author);
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No books found by this author',
      });
    }

    res.status(200).json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    Logger.error('Error fetching books by author', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
    });
  }
};

const searchBooksByTitle = (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const books = bookService.searchBooksByTitle(title);
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No books found with this title',
      });
    }

    res.status(200).json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    Logger.error('Error searching books by title', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search books',
    });
  }
};

const getReviews = (req, res) => {
  try {
    const { isbn } = req.params;

    const reviews = bookService.getBookReviews(isbn);
    if (reviews === null) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    Logger.error('Error fetching reviews', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
    });
  }
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  searchBooksByTitle,
  getReviews,
};
