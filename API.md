# ShelfWise - API Documentation

## Complete API Reference

Base URL: `http://localhost:5000` or your deployment URL

### Response Format

All responses follow this format:

```json
{
  "success": true|false,
  "message": "Status message or error description",
  "data": {},
  "error": {} // Only in error responses
}
```

## Authentication Endpoints

### POST /api/auth/register

Register a new user account.

**Request:**

```json
{
  "username": "john_doe",
  "password": "secure_password_123"
}
```

**Validation Rules:**

- Username: 3-50 characters, alphanumeric
- Password: 6+ characters

**Response (201):**

```json
{
  "success": true,
  "message": "User successfully registered"
}
```

**Response (400/409):**

```json
{
  "success": false,
  "message": "Username already exists" | "Invalid input"
}
```

---

### POST /api/auth/login

Authenticate user and receive JWT token.

**Request:**

```json
{
  "username": "john_doe",
  "password": "secure_password_123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

## Book Endpoints (Public)

### GET /api/books

Get complete list of all books.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "9780140449136": {
      "isbn": "9780140449136",
      "author": "Homer",
      "title": "The Odyssey",
      "reviews": {}
    }
  },
  "count": 10
}
```

---

### GET /api/books/isbn/:isbn

Retrieve specific book by ISBN.

**Parameters:**

- `isbn` (string, required): ISBN number

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isbn": "9780451524935",
    "author": "George Orwell",
    "title": "1984",
    "reviews": {}
  }
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### GET /api/books/author/:author

Search books by author name.

**Parameters:**

- `author` (string, required): Author name (case-insensitive)

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "isbn": "9780451524935",
      "author": "George Orwell",
      "title": "1984",
      "reviews": {}
    }
  ],
  "count": 1
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "No books found by this author"
}
```

---

### GET /api/books/title/:title

Search books by partial title match.

**Parameters:**

- `title` (string, required): Search term (case-insensitive)

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "isbn": "9780747532699",
      "author": "J.K. Rowling",
      "title": "Harry Potter and the Philosopher's Stone",
      "reviews": {}
    }
  ],
  "count": 1
}
```

---

### GET /api/books/reviews/:isbn

Get all reviews for specific book.

**Parameters:**

- `isbn` (string, required): ISBN number

**Response (200):**

```json
{
  "success": true,
  "data": {
    "john_doe": {
      "content": "Excellent book!",
      "timestamp": "2026-02-21T10:30:00Z"
    },
    "jane_smith": {
      "content": "Highly recommended",
      "timestamp": "2026-02-21T11:45:00Z"
    }
  }
}
```

---

## Review Endpoints (Protected)

**Authentication Required:** Include JWT token in headers or session

### PUT /api/reviews/review/:isbn

Add new review or update existing review.

**Parameters:**

- `isbn` (string, required): ISBN number

**Request:**

```json
{
  "review": "This is my honest review of the book."
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Review successfully added/updated"
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "Unauthorized: No token provided"
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### DELETE /api/reviews/review/:isbn

Delete user's review for a book.

**Parameters:**

- `isbn` (string, required): ISBN number

**Response (200):**

```json
{
  "success": true,
  "message": "Review successfully deleted"
}
```

**Response (403):**

```json
{
  "success": false,
  "message": "Forbidden: Invalid or expired token"
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "Review not found"
}
```

---

## System Endpoints

### GET /health

Check if API is running and healthy.

**Response (200):**

```json
{
  "success": true,
  "message": "Service is healthy",
  "timestamp": "2026-02-21T12:00:00Z"
}
```

---

## Error Codes Reference

| Status | Code         | Meaning                           |
| ------ | ------------ | --------------------------------- |
| 200    | OK           | Successful request                |
| 201    | Created      | Resource created successfully     |
| 400    | Bad Request  | Invalid input or parameters       |
| 401    | Unauthorized | Missing or invalid authentication |
| 403    | Forbidden    | Authenticated but not authorized  |
| 404    | Not Found    | Resource not found                |
| 409    | Conflict     | Resource already exists           |
| 500    | Server Error | Internal server error             |

---

## Rate Limiting Considerations

Currently no rate limiting implemented. For production:

- Consider implementing rate limiting per IP/user
- Suggested: 100 requests per minute per IP
- Use package: `express-rate-limit`

---

## CORS Configuration

For frontend integration, CORS is configured by default.

To customize:

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: "https://yourdomain.com",
    credentials: true,
  }),
);
```

---

## Pagination (Future Enhancement)

Current API returns all results. For large datasets, consider:

```javascript
GET /api/books?page=1&limit=20
```

---

## Codebase Examples

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}' \
  -c cookies.txt

# Get Books
curl http://localhost:5000/api/books

# Add Review (with cookies)
curl -X PUT http://localhost:5000/api/reviews/review/9780451524935 \
  -H "Content-Type: application/json" \
  -d '{"review":"Great book!"}' \
  -b cookies.txt
```

### Using Axios (JavaScript)

```javascript
const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Login
const Response = await api.post("/api/auth/login", {
  username: "user1",
  password: "password123",
});

// Get Books
const books = await api.get("/api/books");

// Add Review
await api.put("/api/reviews/review/9780451524935", {
  review: "Excellent read!",
});
```

### Using Fetch (Browser)

```javascript
// Login
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "user1", password: "password123" }),
  credentials: "include",
});

// Get Books
const books = await fetch("http://localhost:5000/api/books");
const data = await books.json();
```

---

## Support

For API issues, check:

- Server is running
- Correct base URL
- Valid authentication token
- Request body format
- Environment variables configured
