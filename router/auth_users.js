const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('../booksdb.js');
const regd_users = express.Router();

let users = [];

// Check if username is valid
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Check if user is authenticated
const authenticatedUser = (username, password) => {
  let validUsers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  return validUsers.length > 0;
};

// Login endpoint
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }

  if (!review) {
    return res.status(400).json({message: "Review content is required"});
  }

  books[isbn].reviews[username] = review;
  return res.status(200).json({message: "Review successfully added/updated"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({message: "Review successfully deleted"});
  } else {
    return res.status(404).json({message: "Review not found for this user"});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
