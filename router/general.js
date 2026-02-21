const express = require('express');
const books = require('./booksdb.js');
const public_users = express.Router();

let users = [];

// Check if user exists
const doesExist = (username) => {
  return users.some(user => user.username === username);
};

// Register new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Login user
public_users.post("/login", (req, res) => {
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
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Check if user is authenticated
const authenticatedUser = (username, password) => {
  let validUsers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  return validUsers.length > 0;
};

// Get all books
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn]);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

// Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let booksByAuthor = [];
  
  for (let isbn in books) {
    if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
      booksByAuthor.push(books[isbn]);
    }
  }
  
  if (booksByAuthor.length > 0) {
    res.send(booksByAuthor);
  } else {
    res.status(404).json({message: "No books found by this author"});
  }
});

// Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let booksByTitle = [];
  
  for (let isbn in books) {
    if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
      booksByTitle.push(books[isbn]);
    }
  }
  
  if (booksByTitle.length > 0) {
    res.send(booksByTitle);
  } else {
    res.status(404).json({message: "No books found with this title"});
  }
});

// Get book reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn].reviews);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

const jwt = require('jsonwebtoken');

module.exports.general = public_users;
