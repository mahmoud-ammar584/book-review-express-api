const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books using async-await with callback pattern
async function getAllBooks(callback) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    callback(null, response.data);
  } catch (error) {
    callback(error, null);
  }
}

// Task 11: Search by ISBN using Promises
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log('\n--- Book Details by ISBN ---');
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching book by ISBN:', error.message);
      throw error;
    });
}

// Task 12: Search by Author using Promises
function getBooksByAuthor(author) {
  return axios.get(`${BASE_URL}/author/${author}`)
    .then(response => {
      console.log('\n--- Books by Author ---');
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching books by author:', error.message);
      throw error;
    });
}

// Task 13: Search by Title using Promises
function getBooksByTitle(title) {
  return axios.get(`${BASE_URL}/title/${title}`)
    .then(response => {
      console.log('\n--- Books by Title ---');
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching books by title:', error.message);
      throw error;
    });
}

// Execute all tests
async function runTests() {
  console.log('Starting async tests...\n');

  // Test Task 10: Get all books with callback
  console.log('=== Task 10: Get All Books (Async-Await with Callback) ===');
  getAllBooks((error, data) => {
    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('Successfully fetched all books');
      console.log('Total books:', Object.keys(data).length);
    }
  });

  // Wait a bit before running promise-based tests
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test Task 11: Get book by ISBN
  console.log('\n=== Task 11: Get Book by ISBN (Promises) ===');
  await getBookByISBN('9780140449136')
    .catch(err => console.error('Failed:', err.message));

  // Test Task 12: Get books by author
  console.log('\n=== Task 12: Get Books by Author (Promises) ===');
  await getBooksByAuthor('George Orwell')
    .catch(err => console.error('Failed:', err.message));

  // Test Task 13: Get books by title
  console.log('\n=== Task 13: Get Books by Title (Promises) ===');
  await getBooksByTitle('Harry Potter')
    .catch(err => console.error('Failed:', err.message));

  console.log('\n=== All tests completed ===');
}

// Run tests
runTests();
