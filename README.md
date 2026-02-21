# Book Review Application

A Node.js/Express application for managing book reviews with JWT-based authentication.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

3. Test async functions (in a separate terminal):
```bash
npm test
```

## API Endpoints

### Public Routes

#### Get All Books
```
GET /
```

#### Get Book by ISBN
```
GET /isbn/:isbn
```

#### Get Books by Author
```
GET /author/:author
```

#### Get Books by Title
```
GET /title/:title
```

#### Get Reviews for a Book
```
GET /review/:isbn
```

#### Register User
```
POST /register
Body: { "username": "user1", "password": "pass123" }
```

#### Login
```
POST /login
Body: { "username": "user1", "password": "pass123" }
```

### Authenticated Routes (Requires Login)

#### Add/Modify Review
```
PUT /customer/auth/review/:isbn
Body: { "review": "This is a great book!" }
```

#### Delete Review
```
DELETE /customer/auth/review/:isbn
```

## Testing with cURL

### Register a user:
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}' \
  -c cookies.txt
```

### Add a review (requires login):
```bash
curl -X PUT http://localhost:5000/customer/auth/review/9780140449136 \
  -H "Content-Type: application/json" \
  -d '{"review":"Amazing epic poem!"}' \
  -b cookies.txt
```

### Delete a review:
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/9780140449136 \
  -b cookies.txt
```

## Project Structure

```
book-review-app/
├── index.js              # Main server file
├── booksdb.js            # Books data store
├── router/
│   ├── general.js        # Public routes
│   └── auth_users.js     # Authenticated routes
├── test_async.js         # Async tests with Axios
├── package.json          # Dependencies
└── README.md             # Documentation
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. After login, a token is stored in the session and validated using middleware for protected routes.

## Async Tasks

The `test_async.js` file demonstrates:
- Task 10: Async-await with callback pattern for getting all books
- Task 11: Promise-based ISBN search
- Task 12: Promise-based author search
- Task 13: Promise-based title search
