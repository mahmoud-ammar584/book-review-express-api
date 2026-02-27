const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('../booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    return validUsers.length > 0;
};

regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: username
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        };
        return res.status(200).json({
            message: "User successfully logged in",
            accessToken,
            username
        });
    } else {
        return res.status(401).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    // Attempt to get username from token payload (set by middleware) or session
    let username = null;
    if (req.user && req.user.data) {
        username = req.user.data;
    } else if (req.session.authorization && req.session.authorization.username) {
        username = req.session.authorization.username;
    }

    console.log(`[REVIEW-SYSTEM] Attempting Save: User=${username}, ISBN=${isbn}`);

    if (!username) {
        console.error("[REVIEW-SYSTEM] ERROR: Identity missing. JWT payload may be malformed.");
        return res.status(403).json({ message: "User identity not found in request" });
    }

    if (!books[isbn]) {
        console.error(`[REVIEW-SYSTEM] ERROR: ISBN ${isbn} not found in database keys:`, Object.keys(books).slice(0, 5));
        return res.status(404).json({ message: "Book not found" });
    }

    if (!review) {
        return res.status(400).json({ message: "Review content is required" });
    }

    // Initialize reviews object if it somehow doesn't exist
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    // Save the review
    books[isbn].reviews[username] = review;

    console.log(`[REVIEW-SYSTEM] SUCCESS: Saved review for ${isbn}.`);

    return res.status(200).json({
        message: "Review successfully added/updated",
        reviewer: username,
        review: review,
        updatedBook: books[isbn]
    });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user?.data || req.session?.authorization?.username;

    if (!username) {
        return res.status(403).json({ message: "User not identified" });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({
            message: "Review successfully deleted",
            updatedBook: books[isbn]
        });
    } else {
        return res.status(404).json({ message: "Review not found for this user" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
