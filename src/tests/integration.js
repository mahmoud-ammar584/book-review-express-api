const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runIntegrationTests() {
  console.log('🧪 Starting ShelfWise Integration Tests\n');

  try {
    // Test 1: Health Check
    console.log('📋 Test 1: Health Check');
    const healthRes = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Service is healthy\n');

    // Test 2: Get All Books
    console.log('📚 Test 2: Getting all books');
    const booksRes = await axios.get(`${BASE_URL}/api/books`);
    console.log(`✅ Retrieved ${booksRes.data.count} books\n`);

    // Test 3: Search by ISBN
    console.log('🔍 Test 3: Searching book by ISBN');
    const isbnRes = await axios.get(`${BASE_URL}/api/books/isbn/9780451524935`);
    console.log(`✅ Found: ${isbnRes.data.data.title}\n`);

    // Test 4: Search by Author
    console.log('👤 Test 4: Searching books by author');
    const authorRes = await axios.get(`${BASE_URL}/api/books/author/George Orwell`);
    console.log(`✅ Found ${authorRes.data.count} book(s) by George Orwell\n`);

    // Test 5: Search by Title
    console.log('🏷️  Test 5: Searching books by title');
    const titleRes = await axios.get(`${BASE_URL}/api/books/title/Harry Potter`);
    console.log(`✅ Found ${titleRes.data.count} book(s) matching "Harry Potter"\n`);

    // Test 6: User Registration
    console.log('👤 Test 6: Registering user');
    const registerRes = await axios.post(`${BASE_URL}/api/auth/register`, {
      username: `testuser_${Date.now()}`,
      password: 'test123456',
    });
    console.log(`✅ ${registerRes.data.message}\n`);

    // Test 7: User Login
    console.log('🔐 Test 7: Logging in user');
    const testUsername = `testuser_${Date.now()}`;
    await axios.post(`${BASE_URL}/api/auth/register`, {
      username: testUsername,
      password: 'secure_password_123',
    });
    const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
      username: testUsername,
      password: 'secure_password_123',
    });
    console.log(`✅ ${loginRes.data.message}\n`);

    // Test 8: Get Reviews
    console.log('⭐ Test 8: Getting reviews for a book');
    const reviewsRes = await axios.get(`${BASE_URL}/api/books/reviews/9780451524935`);
    console.log(`✅ Retrieved ${Object.keys(reviewsRes.data.data).length} reviews\n`);

    console.log('🎉 All tests passed successfully!\n');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Main execution
runIntegrationTests().catch((error) => {
  console.error('Test suite error:', error);
  process.exit(1);
});
