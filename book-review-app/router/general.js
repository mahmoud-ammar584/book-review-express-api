const express = require('express');
const books = require('../booksdb.js');
const public_users = express.Router();
const axios = require('axios');
const auth_users = require('./auth_users.js');

let users = auth_users.users;

// Fetch books from Google API and populate local DB
const enrichBooks = async () => {
    try {
        console.log('Enriching existing books with covers and descriptions...');
        const bookKeys = Object.keys(books);

        for (const key of bookKeys) {
            if (!books[key].cover || books[key].cover.includes('placeholder')) {
                const isbn = books[key].isbn;
                let retries = 0;
                const maxRetries = 3;
                let success = false;

                while (retries < maxRetries && !success) {
                    try {
                        const delay = 1000 * Math.pow(2, retries);
                        await new Promise(resolve => setTimeout(resolve, delay));

                        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);

                        if (response.data.items && response.data.items.length > 0) {
                            const info = response.data.items[0].volumeInfo;
                            let coverUrl = info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail) : null;

                            if (coverUrl && coverUrl.startsWith('http:')) {
                                coverUrl = coverUrl.replace('http:', 'https:');
                            }

                            books[key].cover = coverUrl || `https://via.placeholder.com/300x450?text=${encodeURIComponent(books[key].title)}`;
                            books[key].description = info.description || 'No description available for this classic title.';
                            if (!books[key].rating && info.averageRating) {
                                books[key].rating = info.averageRating;
                            }
                            console.log(`Updated metadata for ISBN: ${isbn} (${books[key].title})`);
                        } else {
                            console.log(`No data found for ISBN: ${isbn}. Using fallback.`);
                            books[key].cover = `https://via.placeholder.com/300x450?text=${encodeURIComponent(books[key].title)}`;
                            books[key].description = 'No description available for this classic title.';
                        }
                        success = true;
                    } catch (err) {
                        if (err.response && err.response.status === 429) {
                            console.warn(`Rate limit hit for ISBN ${isbn}. Retrying...`);
                            retries++;
                        } else {
                            console.error(`Failed to fetch data for ISBN ${isbn}: ${err.message}. Using fallback.`);
                            books[key].cover = `https://via.placeholder.com/300x450?text=${encodeURIComponent(books[key].title)}`;
                            books[key].description = 'No description available for this classic title.';
                            break;
                        }
                    }
                }
            }
        }

        console.log('Fetching additional books from Google API...');
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=30&langRestrict=en');
        const googleBooks = response.data.items || [];

        googleBooks.forEach(item => {
            const info = item.volumeInfo;
            const isbnObj = info.industryIdentifiers ? info.industryIdentifiers.find(id => id.type === 'ISBN_13') || info.industryIdentifiers[0] : null;

            if (isbnObj && info.title && info.authors) {
                const isbn = isbnObj.identifier;
                if (!books[isbn]) {
                    let coverUrl = info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail) : null;

                    if (coverUrl && coverUrl.startsWith('http:')) {
                        coverUrl = coverUrl.replace('http:', 'https:');
                    }

                    books[isbn] = {
                        isbn: isbn,
                        title: info.title,
                        author: info.authors ? info.authors[0] : 'Anonymous / Unknown',
                        reviews: {},
                        cover: coverUrl || `https://via.placeholder.com/300x450?text=${encodeURIComponent(info.title)}`,
                        description: info.description || 'No description available.',
                        rating: info.averageRating || null
                    };
                }
            }
        });
        console.log(`Books database updated. Total books: ${Object.keys(books).length}`);
    } catch (error) {
        console.error('Error in enrichBooks:', error.message);
    }
};

enrichBooks();

const doesExist = (username) => {
    return users.some(user => user.username === username);
};

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

public_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).json({
            message: "User successfully logged in",
            accessToken,
            username
        });
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

const authenticatedUser = (username, password) => {
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    return validUsers.length > 0;
};

public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(books[isbn]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

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
        res.status(404).json({ message: "No books found by this author" });
    }
});

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
        res.status(404).json({ message: "No books found with this title" });
    }
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        console.log(`[REVIEWS] Sending reviews for ISBN ${isbn}:`, JSON.stringify(books[isbn].reviews));
        res.json(books[isbn].reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

const jwt = require('jsonwebtoken');
module.exports.general = public_users;
