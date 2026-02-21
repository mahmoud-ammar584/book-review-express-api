# ShelfWise - Professional Book Review Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18+-blue.svg)](https://expressjs.com/)

A professionally-built book review platform developed as a full-stack JavaScript graduation project. Features secure JWT authentication, RESTful API design, clean architecture, and production-ready deployment patterns.

## 🎯 Quick Start

```bash
# Clone repository
git clone https://github.com/[your-username]/shelfwise.git
cd shelfwise

# Setup (Linux/Mac)
bash setup.sh

# Setup (Windows)
setup.bat

# Start server
npm start

# Test endpoints
npm test
```

Server runs on: `http://localhost:5000`

## ✨ Features

- **Secure Authentication** - JWT-based with automatic token expiry
- **RESTful API** - Well-designed endpoints with consistent responses
- **Book Catalog** - Search by ISBN, author, or title
- **User Reviews** - Create, update, and manage book reviews
- **Clean Architecture** - Services, controllers, middleware separation
- **Production Ready** - Error handling, logging, environment config
- **Comprehensive Testing** - Integration test suite included
- **Full Documentation** - API reference, deployment guides, examples

## 📋 Documentation

- **[API.md](API.md)** - Complete API reference with examples
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide (Render, Railway, Heroku, AWS)
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Detailed refactoring notes
- **README.md** - This file

## 🏗️ Project Structure

```
src/
├── app.js                 # Express configuration
├── config/env.js         # Environment management
├── controllers/          # Request handlers
├── services/            # Business logic
├── routes/              # Route definitions
├── middleware/          # Auth, error handling
├── data/                # Book database
└── tests/               # Integration tests
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Books (Public)

- `GET /api/books` - All books
- `GET /api/books/isbn/:isbn` - Book by ISBN
- `GET /api/books/author/:author` - Books by author
- `GET /api/books/title/:title` - Search by title
- `GET /api/books/reviews/:isbn` - Reviews for book

### Reviews (Protected)

- `PUT /api/reviews/review/:isbn` - Add/update review
- `DELETE /api/reviews/review/:isbn` - Delete review

## 🚀 Example Usage

### Register & Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

### Get Books

```bash
curl http://localhost:5000/api/books
curl http://localhost:5000/api/books/author/George%20Orwell
curl http://localhost:5000/api/books/title/1984
```

### Add Review

```bash
curl -X PUT http://localhost:5000/api/reviews/review/9780451524935 \
  -H "Content-Type: application/json" \
  -d '{"review":"Amazing book!"}'
```

See [API.md](API.md) for complete API documentation.

## ⚙️ Configuration

Create `.env` file:

```env
NODE_ENV=development
PORT=5000
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=3600
LOG_LEVEL=info
```

Use `.env.example` as template: `cp .env.example .env`

## 🧪 Testing

```bash
# Run integration tests
npm test

# Tests verify:
✓ Server health
✓ Book retrieval
✓ Search functionality
✓ User registration
✓ Authentication
✓ Review operations
```

## 🚢 Deployment

### Render (Recommended)

1. Connect GitHub repository to Render
2. Set environment variables
3. Auto-deploys on git push

### Railway

```bash
npm install -g @railway/cli
railway login
railway up
```

### Heroku

```bash
heroku create shelfwise
git push heroku main
```

### AWS/Custom

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step guides.

## 🔒 Security Features

- Environment-based secrets (no hardcoding)
- JWT token expiration
- Input validation on all endpoints
- Centralized error handling
- Secure session management
- HTTP-only cookies in production

## 👨‍💼 Professional Standards

✅ Clean code architecture  
✅ Service-oriented design  
✅ Comprehensive error handling  
✅ Structured logging  
✅ RESTful API principles  
✅ Input validation  
✅ Professional documentation  
✅ Production-ready patterns

## 📦 Dependencies

- **express** ^4.18.2 - Web framework
- **jsonwebtoken** ^9.0.2 - JWT authentication
- **express-session** ^1.17.3 - Session management
- **dotenv** ^16.3.1 - Environment configuration
- **axios** ^1.6.0 - HTTP client (testing)

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 👨‍🎓 Graduation Project

**Course:** Full-Stack Web Development Capstone  
**Status:** Production Ready  
**Quality:** Enterprise Grade

Demonstrates proficiency in:

- Full-stack JavaScript development
- REST API design and implementation
- JWT authentication patterns
- Clean code architecture
- Production deployment
- Error handling and logging
- Git workflow and version control

## 🤝 Contributing

Contributions welcome! Issues and pull requests are appreciated.

## 📞 Support

For issues or questions:

1. Check [API.md](API.md) for endpoint documentation
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) for setup help
3. See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture details

---

**Built with professionalism. Ready for production. Developed with best practices.**
