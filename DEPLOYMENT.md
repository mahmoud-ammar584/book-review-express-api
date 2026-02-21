# ShelfWise - Deployment Guide

## Production Deployment

### 1. Environment Variables

Set these variables in your production environment:

```env
NODE_ENV=production
PORT=5000
SESSION_SECRET=<Generate a strong random string>
JWT_SECRET=<Generate a strong random string>
JWT_EXPIRY=3600
LOG_LEVEL=info
```

To generate secrets:

```bash
# Linux/Mac
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Deployment Options

#### Option A: Render.com (Recommended)

1. Create account at https://render.com
2. Connect GitHub repository
3. Create new Web Service
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Add all from `.env`
5. Deploy

#### Option B: Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`
4. Set variables: `railway variables ...`

#### Option C: AWS EC2

1. Launch Ubuntu instance
2. SSH into instance
3. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Clone repository
5. Install PM2: `sudo npm install -g pm2`
6. Start app: `pm2 start server.js --name shelfwise`
7. Enable auto-startup: `pm2 startup`
8. Save: `pm2 save`

#### Option D: Heroku

1. Create `Procfile`:
   ```
   web: node server.js
   ```
2. Initialize git and heroku:
   ```bash
   heroku login
   heroku create shelfwise
   ```
3. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   # ... more variables
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

### 3. Production Checklist

- [ ] NODE_ENV set to `production`
- [ ] Strong SESSION_SECRET configured
- [ ] Strong JWT_SECRET configured
- [ ] LOG_LEVEL set appropriately
- [ ] Database connection configured (if using DB)
- [ ] CORS configured for frontend
- [ ] HTTPS enabled (production servers)
- [ ] Error monitoring set up
- [ ] Health check endpoint tested
- [ ] All tests passing

### 4. Monitoring & Maintenance

#### Logging

Monitor application logs for errors and user activity:

```bash
# PM2
pm2 logs shelfwise

# Heroku
heroku logs --tail

# Render
Check in dashboard
```

#### Backups

If using database, set up regular backups

#### Updates

Keep dependencies updated:

```bash
npm outdated
npm update
```

### 5. Performance Optimization

- Enable compression: `npm install compression`
- Use caching headers
- Consider CDN for static assets
- Monitor database query performance
- Profile application memory usage

### 6. Security Hardening

- Keep dependencies updated
- Use HTTPS in production
- Implement rate limiting
- Add helmet for security headers
- Set proper CORS policies
- Rotate secrets regularly

## Scaling Guide

### Single Server

- Current setup supports ~100-500 concurrent users
- Monitor CPU and memory usage

### Horizontal Scaling

1. Use load balancer (Nginx, AWS ELB)
2. Deploy multiple instances
3. Use session store (Redis) instead of in-memory
4. May require database for user data

### Database Migration

When moving from in-memory to database:

1. Choose: MongoDB, PostgreSQL, MySQL
2. Update BookService and UserService
3. Implement connection pooling
4. Add database migrations

## Troubleshooting

### Application won't start

Check logs:

```bash
npm start 2>&1 | tee debug.log
```

### High memory usage

- Check for memory leaks
- Review session data
- Monitor book data size

### Slow responses

- Monitor database queries (if using DB)
- Check network latency
- Profile application

### Authentication issues

- Verify SESSION_SECRET is set consistently
- Check JWT_SECRET configuration
- Review token expiry time

## Contact & Support

For deployment issues, check:

- Application logs
- Environment variables
- Node version compatibility
- Port availability
