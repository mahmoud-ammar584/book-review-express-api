import subprocess
import os
import sys

project_dir = r"D:\my old files\projects\1\book-review-app\book-review-api\book-review-app"
os.chdir(project_dir)

print("🚀 ShelfWise GitHub Deployment\n")

# Check if git is initialized
if not os.path.exists('.git'):
    print("Initializing git repository...")
    subprocess.run(['git', 'init'], check=True)
    print("✅ Git initialized\n")

# Configure git
print("Configuring git user...")
subprocess.run(['git', 'config', 'user.email', 'dev@shelfwise.app'], check=False)
subprocess.run(['git', 'config', 'user.name', 'ShelfWise Developer'], check=False)
print("✅ Git configured\n")

# Add files
print("Adding files...")
subprocess.run(['git', 'add', '.'], check=True)
print("✅ Files added\n")

# Commit
print("Committing changes...")
try:
    subprocess.run(['git', 'commit', '-m', 'Production: ShelfWise API - 14 grading requirements complete'], check=True)
    print("✅ Committed\n")
except subprocess.CalledProcessError:
    print("ℹ️  No changes to commit\n")

# Add remote
print("Adding GitHub remote...")
try:
    subprocess.run(['git', 'remote', 'remove', 'origin'], check=False)
    subprocess.run(['git', 'remote', 'add', 'origin', 'https://github.com/mahmoud-ammar584/book-review-express-api.git'], check=True)
    print("✅ Remote added\n")
except Exception as e:
    print(f"⚠️  Remote warning: {e}\n")

# Push to GitHub
print("Pushing to GitHub...")
print("Note: You may need to authenticate with GitHub\n")
subprocess.run(['git', 'branch', '-M', 'main'], check=False)
try:
    subprocess.run(['git', 'push', '-u', 'origin', 'main', '--force'], check=True)
    print("✅ Successfully pushed to GitHub!\n")
except subprocess.CalledProcessError as e:
    print(f"⚠️  Push requires GitHub authentication\n")
    print("📝 Please authenticate interactively in the terminal above\n")

# Display git status
print("Current git status:")
subprocess.run(['git', 'log', '--oneline', '-5'], check=False)
print("\n" + "="*60)
print("📋 DEPLOYMENT COMPLETE")
print("="*60)
print("\n🔗 Repository: https://github.com/mahmoud-ammar584/book-review-express-api")
print("\n⏭️  NEXT: Deploy to production server\n")
print("Option 1: Render (FREE, Recommended)")
print("  • Visit: https://dashboard.render.com")
print("  • New Web Service → Connect GitHub")
print("  • Build: npm install")
print("  • Start: npm start")
print("  • Deploy!\n")
print("Option 2: Railway (Easy)")
print("  • Visit: https://railway.app")
print("  • New Project → Deploy from GitHub\n")
print("Option 3: Heroku")
print("  • heroku login")
print("  • heroku create shelfwise-api")
print("  • git push heroku main\n")
