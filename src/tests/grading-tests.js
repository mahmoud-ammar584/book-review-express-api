const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║  ShelfWise - Complete Grading Requirement Tests         ║');
console.log('║  Testing All 14 Tasks (30 Points)                      ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// ============================================================
// PUBLIC USERS ENDPOINTS (Tasks 1-7)
// ============================================================

console.log('📌 PUBLIC USERS SECTION (5+3+3 = 11 Points)\n');
console.log('─'.repeat(60));

// Task 1: Get list of available books (2 points)
async function task1_getAvailableBooks() {
  console.log('\n✏️  Task 1: Get list of available books - 2 Points');
  try {
    const response = await axios.get(`${BASE_URL}/api/books`);
    const bookCount = response.data.count;
    console.log(`   ✅ SUCCESS: Retrieved ${bookCount} books`);
    console.log(`   Data: ${JSON.stringify(response.data, null, 2).split('\n').slice(0, 3).join('...')}`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.message}`);
    return false;
  }
}

// Task 2: Get books by ISBN (2 points)
async function task2_getBookByISBN() {
  console.log('\n✏️  Task 2: Get book by ISBN - 2 Points');
  try {
    const response = await axios.get(`${BASE_URL}/api/books/isbn/9780451524935`);
    console.log(`   ✅ SUCCESS: Found "${response.data.data.title}" by ${response.data.data.author}`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.message}`);
    return false;
  }
}

// Task 3: Get all books by Author (2 points)
async function task3_getBooksByAuthor() {
  console.log('\n✏️  Task 3: Get all books by Author - 2 Points');
  try {
    const response = await axios.get(`${BASE_URL}/api/books/author/George Orwell`);
    const count = response.data.count;
    console.log(`   ✅ SUCCESS: Found ${count} book(s) by George Orwell`);
    console.log(`   ${response.data.data.map(b => b.title).join(', ')}`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.message}`);
    return false;
  }
}

// Task 4: Get all books by Title (2 points)
async function task4_getBooksByTitle() {
  console.log('\n✏️  Task 4: Get all books by Title - 2 Points');
  try {
    const response = await axios.get(`${BASE_URL}/api/books/title/Harry Potter`);
    const count = response.data.count;
    console.log(`   ✅ SUCCESS: Found ${count} book(s) matching "Harry Potter"`);
    console.log(`   ${response.data.data.map(b => b.title).join(', ')}`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.message}`);
    return false;
  }
}

// Task 5: Get book reviews (2 points)
async function task5_getBookReviews() {
  console.log('\n✏️  Task 5: Get book reviews - 2 Points');
  try {
    const response = await axios.get(`${BASE_URL}/api/books/reviews/9780451524935`);
    const reviewCount = Object.keys(response.data.data).length;
    console.log(`   ✅ SUCCESS: Retrieved ${reviewCount} review(s) for book`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.message}`);
    return false;
  }
}

// Task 6: Register new user (3 points)
async function task6_registerUser() {
  console.log('\n✏️  Task 6: Register new user - 3 Points');
  try {
    const testUsername = `user_${Date.now()}`;
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      username: testUsername,
      password: 'Password123456',
    });
    console.log(`   ✅ SUCCESS: User registered - "${testUsername}"`);
    return { success: true, username: testUsername, password: 'Password123456' };
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.response?.data?.message || error.message}`);
    return { success: false };
  }
}

// Task 7: Login user (3 points)
async function task7_loginUser(credentials) {
  console.log('\n✏️  Task 7: Login user - 3 Points');
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username: credentials.username,
      password: credentials.password,
    });
    console.log(`   ✅ SUCCESS: User logged in - Token received`);
    console.log(`   Token: ${response.data.token.substring(0, 30)}...`);
    return { success: true, token: response.data.token, username: credentials.username };
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.response?.data?.message || error.message}`);
    return { success: false };
  }
}

// ============================================================
// REGISTERED USERS ENDPOINTS (Tasks 8-9)
// ============================================================

async function task8_addReview(loginData) {
  console.log('\n✏️  Task 8: Add/Modify book review - 2 Points');
  try {
    if (!loginData.success) {
      throw new Error('User not logged in');
    }
    const response = await axios.put(
      `${BASE_URL}/api/reviews/review/9780451524935`,
      { review: 'This is an excellent dystopian novel with profound social commentary!' },
      { withCredentials: true }
    );
    console.log(`   ✅ SUCCESS: Review added/modified`);
    console.log(`   Message: ${response.data.message}`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function task9_deleteReview(loginData) {
  console.log('\n✏️  Task 9: Delete book review - 2 Points');
  try {
    if (!loginData.success) {
      throw new Error('User not logged in');
    }
    const response = await axios.delete(
      `${BASE_URL}/api/reviews/review/9780451524935`,
      { withCredentials: true }
    );
    console.log(`   ✅ SUCCESS: Review deleted`);
    console.log(`   Message: ${response.data.message}`);
    return true;
  } catch (error) {
    console.error(`   ❌ FAILED: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

// ============================================================
// NODE.JS ASYNC/PROMISE METHODS (Tasks 10-13)
// ============================================================

console.log('\n\n📌 NODE.JS ASYNC/PROMISE SECTION (2+2+2+2 = 8 Points)\n');
console.log('─'.repeat(60));

// Task 10: Get all books using async callback (2 points)
function task10_getAllBooksCallback() {
  console.log('\n✏️  Task 10: Get all books (Async Callback) - 2 Points');
  
  return new Promise((resolve) => {
    axios.get(`${BASE_URL}/api/books`)
      .then((response) => {
        // Demonstrate async callback pattern
        const callback = (error, data) => {
          if (error) {
            console.error(`   ❌ FAILED: ${error.message}`);
            resolve(false);
          } else {
            console.log(`   ✅ SUCCESS: Retrieved ${data.count} books via callback`);
            console.log(`   Books: ${Object.keys(data.data).length} items loaded`);
            resolve(true);
          }
        };
        
        // Simulate async callback execution
        setTimeout(() => callback(null, response.data), 100);
      })
      .catch((error) => {
        console.error(`   ❌ FAILED: ${error.message}`);
        resolve(false);
      });
  });
}

// Task 11: Search by ISBN using Promises (2 points)
function task11_searchByISBNPromise() {
  console.log('\n✏️  Task 11: Search by ISBN (Promises) - 2 Points');
  
  return axios.get(`${BASE_URL}/api/books/isbn/9780743273565`)
    .then((response) => {
      console.log(`   ✅ SUCCESS: Found "${response.data.data.title}"`);
      console.log(`   Author: ${response.data.data.author}`);
      return true;
    })
    .catch((error) => {
      console.error(`   ❌ FAILED: ${error.message}`);
      return false;
    });
}

// Task 12: Search by Author using Promises (2 points)
function task12_searchByAuthorPromise() {
  console.log('\n✏️  Task 12: Search by Author (Promises) - 2 Points');
  
  return axios.get(`${BASE_URL}/api/books/author/Jane Austen`)
    .then((response) => {
      console.log(`   ✅ SUCCESS: Found ${response.data.count} book(s)`);
      console.log(`   Books: ${response.data.data.map(b => b.title).join(', ')}`);
      return true;
    })
    .catch((error) => {
      console.error(`   ❌ FAILED: ${error.message}`);
      return false;
    });
}

// Task 13: Search by Title using Promises (2 points)
function task13_searchByTitlePromise() {
  console.log('\n✏️  Task 13: Search by Title (Promises) - 2 Points');
  
  return axios.get(`${BASE_URL}/api/books/title/Hobbit`)
    .then((response) => {
      console.log(`   ✅ SUCCESS: Found ${response.data.count} book(s)`);
      console.log(`   Books: ${response.data.data.map(b => b.title).join(', ')}`);
      return true;
    })
    .catch((error) => {
      console.error(`   ❌ FAILED: ${error.message}`);
      return false;
    });
}

// ============================================================
// MAIN TEST RUNNER
// ============================================================

async function runAllTests() {
  const results = {
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
    task6: { success: false },
    task7: { success: false },
    task8: false,
    task9: false,
    task10: false,
    task11: false,
    task12: false,
    task13: false,
  };

  try {
    // Run public user tasks (Tasks 1-5)
    console.log('\n🔓 PUBLIC ACCESS ENDPOINTS\n');
    console.log('─'.repeat(60));
    results.task1 = await task1_getAvailableBooks();
    results.task2 = await task2_getBookByISBN();
    results.task3 = await task3_getBooksByAuthor();
    results.task4 = await task4_getBooksByTitle();
    results.task5 = await task5_getBookReviews();

    // Register and login (Tasks 6-7)
    console.log('\n\n👤 AUTHENTICATION\n');
    console.log('─'.repeat(60));
    const registerResult = await task6_registerUser();
    results.task6 = registerResult.success;
    
    const loginResult = await task7_loginUser(registerResult);
    results.task7 = loginResult.success;

    // Registered user tasks (Tasks 8-9)
    console.log('\n\n🔒 REGISTERED USER ENDPOINTS\n');
    console.log('─'.repeat(60));
    results.task8 = await task8_addReview(loginResult);
    results.task9 = await task9_deleteReview(loginResult);

    // Node.js async/promise methods (Tasks 10-13)
    results.task10 = await task10_getAllBooksCallback();
    results.task11 = await task11_searchByISBNPromise();
    results.task12 = await task12_searchByAuthorPromise();
    results.task13 = await task13_searchByTitlePromise();

    // Print summary
    printSummary(results);

  } catch (error) {
    console.error('\n\n❌ Test suite error:', error.message);
    process.exit(1);
  }
}

function printSummary(results) {
  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log('║              GRADING SUMMARY - 30 POINTS                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const tasks = [
    { name: 'Task 1: Get Available Books', points: 2, result: results.task1 },
    { name: 'Task 2: Get by ISBN', points: 2, result: results.task2 },
    { name: 'Task 3: Get by Author', points: 2, result: results.task3 },
    { name: 'Task 4: Get by Title', points: 2, result: results.task4 },
    { name: 'Task 5: Get Reviews', points: 2, result: results.task5 },
    { name: 'Task 6: Register User', points: 3, result: results.task6 },
    { name: 'Task 7: Login User', points: 3, result: results.task7 },
    { name: 'Task 8: Add/Modify Review', points: 2, result: results.task8 },
    { name: 'Task 9: Delete Review', points: 2, result: results.task9 },
    { name: 'Task 10: Get All (Callback)', points: 2, result: results.task10 },
    { name: 'Task 11: Search ISBN (Promise)', points: 2, result: results.task11 },
    { name: 'Task 12: Search Author (Promise)', points: 2, result: results.task12 },
    { name: 'Task 13: Search Title (Promise)', points: 2, result: results.task13 },
    { name: 'Task 14: GitHub Link', points: 2, result: true }, // Manual
  ];

  let totalPoints = 0;
  console.log('TASK RESULTS:\n');
  
  tasks.forEach((task, index) => {
    const status = task.result ? '✅' : '❌';
    const points = task.result ? task.points : 0;
    totalPoints += points;
    
    console.log(`${status} ${task.name}`);
    console.log(`   Points: ${points}/${task.points}`);
  });

  console.log('\n' + '─'.repeat(60));
  console.log(`\n📊 TOTAL POINTS: ${totalPoints}/30`);
  console.log(`📈 PERCENTAGE: ${((totalPoints / 30) * 100).toFixed(1)}%\n`);

  if (totalPoints === 30) {
    console.log('🎉 PERFECT SCORE! All requirements met!\n');
  } else if (totalPoints >= 27) {
    console.log('⭐ EXCELLENT! Strong performance!\n');
  } else if (totalPoints >= 24) {
    console.log('👍 GOOD! Most requirements met!\n');
  } else {
    console.log('⚠️  Some requirements need attention.\n');
  }

  process.exit(0);
}

// Start tests
console.log('Starting all tasks...\n');
runAllTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
