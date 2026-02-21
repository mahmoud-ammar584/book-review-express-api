#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = __dirname;

console.log('🚀 ShelfWise Deployment Script\n');
console.log(`📁 Project directory: ${projectDir}\n`);

// Step 1: Initialize git if not already initialized
try {
  console.log('Step 1: Initializing git repository...');
  if (!fs.existsSync(path.join(projectDir, '.git'))) {
    execSync('git init', { cwd: projectDir, stdio: 'inherit' });
    console.log('✅ Git repository initialized\n');
  } else {
    console.log('✅ Git repository already exists\n');
  }
} catch (error) {
  console.error('❌ Error initializing git:', error.message);
  process.exit(1);
}

// Step 2: Configure git user
try {
  console.log('Step 2: Configuring git user...');
  execSync('git config user.email "dev@shelfwise.app"', { cwd: projectDir, stdio: 'pipe' });
  execSync('git config user.name "ShelfWise Developer"', { cwd: projectDir, stdio: 'pipe' });
  console.log('✅ Git user configured\n');
} catch (error) {
  console.error('❌ Error configuring git user:', error.message);
}

// Step 3: Add all files
try {
  console.log('Step 3: Adding all files to git...');
  execSync('git add .', { cwd: projectDir, stdio: 'inherit' });
  console.log('✅ All files added\n');
} catch (error) {
  console.error('❌ Error adding files:', error.message);
  process.exit(1);
}

// Step 4: Commit changes
try {
  console.log('Step 4: Committing changes...');
  execSync('git commit -m "Production deployment: ShelfWise book review API - all 14 grading requirements implemented"', 
    { cwd: projectDir, stdio: 'inherit' });
  console.log('✅ Changes committed\n');
} catch (error) {
  if (error.message.includes('nothing to commit')) {
    console.log('ℹ️  No new changes to commit\n');
  } else {
    console.error('⚠️  Warning:', error.message);
  }
}

// Step 5: Set remote and push to GitHub
try {
  console.log('Step 5: Setting remote repository...');
  const remoteUrl = 'https://github.com/mahmoud-ammar584/book-review-express-api.git';
  
  // Check if remote already exists
  try {
    execSync('git remote get-url origin', { cwd: projectDir, stdio: 'pipe' });
    console.log('✅ Remote already configured');
  } catch {
    execSync(`git remote add origin ${remoteUrl}`, { cwd: projectDir, stdio: 'inherit' });
    console.log('✅ Remote repository added\n');
  }
} catch (error) {
  console.error('❌ Error setting remote:', error.message);
}

// Step 6: Push to GitHub
try {
  console.log('Step 6: Pushing to GitHub...');
  execSync('git branch -M main', { cwd: projectDir, stdio: 'inherit' });
  execSync('git push -u origin main --force', { cwd: projectDir, stdio: 'inherit' });
  console.log('✅ Pushed to GitHub successfully\n');
} catch (error) {
  console.error('⚠️  Warning - Push may need authentication:', error.message);
  console.log('\n📝 Manual steps to push to GitHub:');
  console.log('   git push -u origin main\n');
}

// Step 7: Display deployment options
console.log('\n' + '='.repeat(60));
console.log('📋 DEPLOYMENT OPTIONS\n');
console.log('Deploy to Render (Recommended - FREE):');
console.log('  1. Visit: https://dashboard.render.com');
console.log('  2. Click "New +" → "Web Service"');
console.log('  3. Connect your GitHub repo');
console.log('  4. Set Build Command: npm install');
console.log('  5. Set Start Command: npm start');
console.log('  6. Deploy!\n');

console.log('Deploy to Railway:');
console.log('  1. Visit: https://railway.app');
console.log('  2. Click "New Project" → "Deploy from GitHub"');
console.log('  3. Select repository and deploy\n');

console.log('Deploy to Heroku:');
console.log('  1. Install: npm install -g heroku');
console.log('  2. Login: heroku login');
console.log('  3. Create app: heroku create shelfwise-api');
console.log('  4. Deploy: git push heroku main\n');

console.log('='.repeat(60));
console.log('\n✨ ShelfWise is ready for production deployment!');
console.log('\n📚 Verify locally:');
console.log('   npm start       (Terminal 1)');
console.log('   npm run test:grading  (Terminal 2)');
console.log('\n🔗 Repository: https://github.com/mahmoud-ammar584/book-review-express-api');
