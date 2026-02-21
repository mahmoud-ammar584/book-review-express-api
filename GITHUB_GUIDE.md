# GitHub Deployment Guide for ShelfWise

## Pre-Deployment Checklist

- [ ] All code is tested and working
- [ ] No node_modules or .env committed
- [ ] .gitignore is properly configured
- [ ] README.md is professional and complete
- [ ] All documentation files are created
- [ ] Project runs locally successfully

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `shelfwise`
3. Description: "A professional book review platform built with Express.js, JWT authentication, and clean architecture. Graduation project demonstrating modern API design and production-ready code practices."
4. Choose Public or Private (Private recommended for academic work)
5. DO NOT initialize with README (we have one)
6. Click "Create repository"

## Step 2: Initialize Git Locally

```bash
# Navigate to project directory
cd shelfwise

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ShelfWise production-ready codebase

- Clean architecture with MVC pattern
- JWT authentication and session management
- Comprehensive error handling and logging
- Complete test suite for grading requirements
- Production deployment ready
- Professional documentation"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/shelfwise.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Configure Repository Settings

On GitHub:

1. **Go to Settings → Branches**
   - Set main as default branch
   - Enable branch protection rules

2. **Go to Settings → Code and automation → Pages**
   - Deploy from: main branch
   - Folder: / (root)
   - Save

3. **Go to About section**
   - Add description
   - Add website (if available)
   - Add topics: `express`, `jwt`, `api`, `nodejs`, `graduation-project`

## Step 4: Create GitHub Pages (Optional)

```bash
# Create docs branch
git checkout -b docs

# Create index.html in docs folder
mkdir docs
echo "<h1>ShelfWise Documentation</h1>" > docs/index.html

# Push docs
git add docs/
git commit -m "Add GitHub Pages"
git push -u origin docs
```

## Step 5: Verify Repository

- [ ] All files are visible on GitHub
- [ ] README.md displays properly
- [ ] No node_modules folder
- [ ] .env not visible
- [ ] GRADING.md is accessible
- [ ] API.md is accessible
- [ ] DEPLOYMENT.md is accessible

## Step 6: Get Repository Link

Your public repository link:

```
https://github.com/YOUR_USERNAME/shelfwise
```

## Making Updates to GitHub

When you make changes:

```bash
# Make your changes
git add .

# Commit with clear message
git commit -m "Describe your changes"

# Push to GitHub
git push origin main
```

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View remote URL
git remote -v

# Update from GitHub
git pull origin main

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name

# Merge branch
git merge branch-name
```

## Clean Commit Messages

Good commit messages:

```
Initial commit: ShelfWise project setup
Add authentication endpoints
Implement book search functionality
Fix JWT token verification
Add comprehensive test suite
Update README with deployment instructions
```

Bad commit messages:

```
Fixed stuff
Updated code
Changes
WIP
```

## Sharing Link for Grading

Once deployed, provide your instructor with:

**GitHub Repository:** https://github.com/YOUR_USERNAME/shelfwise  
**Live API (if deployed):** https://shelfwise-api.render.com (or similar)

Include in email:

- Link to repository
- Instructions to run locally
- Link to live deployment
- Summary of implementation
- Any special notes

## Troubleshooting

### `fatal: not a git repository`

```bash
git init
```

### `permission denied (publickey)`

- Generate SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-keypair-and-adding-it-to-the-ssh-agent
- Or use HTTPS instead of SSH

### Cannot push (authentication error)

```bash
# Create personal access token at GitHub settings
# Then use token as password or configure credentials
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### Forgot to add files before commit

```bash
git add forgotten-file.js
git commit --amend --no-edit
git push --force (use with caution!)
```

## Best Practices

✅ Commit often with meaningful messages  
✅ Push daily/regularly  
✅ Keep .env and node_modules in .gitignore  
✅ Use clear branch names  
✅ Document major changes  
✅ Keep README updated

---

**Ready to share your project? Let's go!** 🚀
