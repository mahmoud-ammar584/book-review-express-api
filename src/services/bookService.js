const books = require('../data/books');

class BookService {
  getAllBooks() {
    return books;
  }

  getBookByISBN(isbn) {
    return books[isbn] || null;
  }

  getBooksByAuthor(author) {
    return Object.values(books).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );
  }

  searchBooksByTitle(title) {
    return Object.values(books).filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  getBookReviews(isbn) {
    const book = books[isbn];
    return book ? book.reviews : null;
  }

  addOrUpdateReview(isbn, username, review) {
    const book = books[isbn];
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    if (!review || review.trim().length === 0) {
      return { success: false, message: 'Review content cannot be empty' };
    }

    book.reviews[username] = {
      content: review,
      timestamp: new Date(),
    };

    return { success: true, message: 'Review successfully added/updated' };
  }

  deleteReview(isbn, username) {
    const book = books[isbn];
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    if (!book.reviews[username]) {
      return { success: false, message: 'Review not found' };
    }

    delete book.reviews[username];
    return { success: true, message: 'Review successfully deleted' };
  }
}

module.exports = new BookService();
