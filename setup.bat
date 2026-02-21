@echo off
REM ShelfWise Quick Setup Script for Windows
REM Run this after cloning to quickly set up the project

echo.
echo 🚀 ShelfWise - Quick Setup
echo =========================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 14+
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo.
echo ✅ npm version:
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Create .env if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ✅ .env file created
    echo ⚠️  Please edit .env with your secrets!
) else (
    echo ✅ .env file already exists
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Edit .env file with your configuration
echo 2. Run: npm start
echo 3. Test at: http://localhost:5000/health
echo 4. Run tests: npm test
echo.
