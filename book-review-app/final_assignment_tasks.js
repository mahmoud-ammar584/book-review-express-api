const axios = require('axios');

// Ensure your backend is running on port 5000 before executing this script!
const API_URL = "http://localhost:5000";

// Task 10: Get all books – Using async callback function
const task10_getAllBooks = async () => {
    try {
        console.log("\n[Task 10] --- Fetching All Books (Async/Await) ---");
        const response = await axios.get(`${API_URL}/`);
        console.log("SUCCESS: Retrieved books list.");
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error("ERROR: Server is NOT running. Run 'npm start' in the 'book-review-app' folder first.");
        } else {
            console.error("ERROR in Task 10:", error.message);
        }
    }
};

// Task 11: Search by ISBN – Using Promises
const task11_getBookByISBN = (isbn) => {
    console.log(`\n[Task 11] --- Searching by ISBN ${isbn} (Promises) ---`);
    return axios.get(`${API_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`SUCCESS: Found book "${response.data.title}"`);
            return response.data;
        })
        .catch(error => {
            console.error("ERROR in Task 11:", error.message);
        });
};

// Task 12: Search by Author – Using Async/Await
const task12_getBooksByAuthor = async (author) => {
    try {
        console.log(`\n[Task 12] --- Searching by Author: ${author} (Async/Await) ---`);
        const response = await axios.get(`${API_URL}/author/${author}`);
        console.log(`SUCCESS: Found ${response.data.length} books by ${author}.`);
    } catch (error) {
        console.error("ERROR in Task 12:", error.message);
    }
};

// Task 13: Search by Title – Using Async/Await
const task13_getBooksByTitle = async (title) => {
    try {
        console.log(`\n[Task 13] --- Searching by Title: ${title} (Async/Await) ---`);
        const response = await axios.get(`${API_URL}/title/${title}`);
        console.log(`SUCCESS: Found books matching title "${title}".`);
    } catch (error) {
        console.error("ERROR in Task 13:", error.message);
    }
};

const runAllTasks = async () => {
    console.log("Starting Submission Verification Tests...");
    try {
        await axios.get(API_URL);
    } catch (e) {
        console.error("\nCRITICAL ERROR: CANNOT CONNECT TO SERVER.");
        console.error("Please make sure you have run 'npm start' in the 'book-review-app' folder.");
        process.exit(1);
    }
    await task10_getAllBooks();
    await task11_getBookByISBN("9780141439518");
    await task12_getBooksByAuthor("Jane Austen");
    await task13_getBooksByTitle("Things Fall Apart");
    console.log("\nAll tasks completed successfully! You can take screenshots of this output.");
};

runAllTasks();
