#!/bin/bash

# SASA - GitHub Upload Script
# This script helps you upload SASA to GitHub quickly

echo "🤖 SASA - GitHub Upload Script"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Please install git first: https://git-scm.com/downloads"
    exit 1
fi

# Check if gh CLI is installed (optional but recommended)
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detected"
    USE_GH_CLI=true
else
    echo "ℹ️  GitHub CLI not found (optional)"
    echo "   You can install it from: https://cli.github.com/"
    USE_GH_CLI=false
fi

echo ""
echo "Please provide the following information:"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name (default: sasa)
read -p "Enter repository name [sasa]: " REPO_NAME
REPO_NAME=${REPO_NAME:-sasa}

# Get repository visibility
read -p "Make repository public? (y/n) [y]: " IS_PUBLIC
IS_PUBLIC=${IS_PUBLIC:-y}

echo ""
echo "Configuration:"
echo "  Username: $GITHUB_USERNAME"
echo "  Repository: $REPO_NAME"
echo "  Visibility: $([ "$IS_PUBLIC" = "y" ] && echo "Public" || echo "Private")"
echo ""

read -p "Continue? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "📦 Initializing Git repository..."

# Initialize git if not already done
if [ ! -d .git ]; then
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
*.log
EOF
fi

# Stage all files
echo ""
echo "📝 Staging files..."
git add .

# Commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial commit: SASA - Smart Autonomous System Agent

- Core agent with Claude API integration
- CLI interface with interactive mode
- Built-in tools for file operations, shell commands, HTTP requests
- Comprehensive documentation
- Examples and quick start guide"

# Rename branch to main if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo ""
    echo "🔄 Renaming branch to main..."
    git branch -M main
fi

echo ""
echo "🚀 Creating GitHub repository..."

if [ "$USE_GH_CLI" = true ]; then
    # Use GitHub CLI to create repository
    if [ "$IS_PUBLIC" = "y" ]; then
        gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
    else
        gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
    fi
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Success! Repository created and code pushed!"
        echo ""
        echo "🎉 Your repository is live at:"
        echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
        echo ""
        echo "Next steps:"
        echo "  1. Visit your repository on GitHub"
        echo "  2. Add topics/tags for discoverability"
        echo "  3. Update README with your specific info"
        echo "  4. Star the repository ⭐"
    else
        echo ""
        echo "❌ Error creating repository with GitHub CLI"
        echo "Please create the repository manually on GitHub"
    fi
else
    # Manual instructions
    echo ""
    echo "Please create a repository on GitHub:"
    echo ""
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Description: SASA - Smart Autonomous System Agent. AI-powered task automation using Claude API"
    echo "4. Visibility: $([ "$IS_PUBLIC" = "y" ] && echo "Public" || echo "Private")"
    echo "5. Do NOT initialize with README, .gitignore, or license"
    echo "6. Click 'Create repository'"
    echo ""
    read -p "Press Enter when repository is created..."
    
    # Add remote and push
    REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    
    echo ""
    echo "🔗 Adding remote origin..."
    git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
    
    echo ""
    echo "⬆️  Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Success! Code pushed to GitHub!"
        echo ""
        echo "🎉 Your repository is live at:"
        echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
        echo ""
        echo "Next steps:"
        echo "  1. Visit your repository on GitHub"
        echo "  2. Add topics/tags: ai, automation, claude, agent, cli"
        echo "  3. Update package.json with your info"
        echo "  4. Update README with your username"
        echo "  5. Star the repository ⭐"
        echo "  6. Share it with the community!"
    else
        echo ""
        echo "❌ Error pushing to GitHub"
        echo "Please check your credentials and try again"
    fi
fi

echo ""
echo "📚 Useful commands:"
echo "  sasa run \"your task\"     - Run a task"
echo "  sasa i                    - Interactive mode"
echo "  npm start examples        - View examples"
echo ""
echo "Happy automating! 🚀"
