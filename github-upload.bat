@echo off
REM SASA - GitHub Upload Script (Windows)
REM This script helps you upload SASA to GitHub quickly

echo.
echo ================================
echo SASA - GitHub Upload Script
echo ================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Git is not installed
    echo Please install git first: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo Please provide the following information:
echo.

REM Get GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username: "

REM Get repository name
set /p REPO_NAME="Enter repository name [sasa]: "
if "%REPO_NAME%"=="" set REPO_NAME=sasa

REM Get repository visibility
set /p IS_PUBLIC="Make repository public? (y/n) [y]: "
if "%IS_PUBLIC%"=="" set IS_PUBLIC=y

echo.
echo Configuration:
echo   Username: %GITHUB_USERNAME%
echo   Repository: %REPO_NAME%
if "%IS_PUBLIC%"=="y" (
    echo   Visibility: Public
) else (
    echo   Visibility: Private
)
echo.

set /p CONFIRM="Continue? (y/n): "
if not "%CONFIRM%"=="y" (
    echo Aborted.
    pause
    exit /b 0
)

echo.
echo Initializing Git repository...

REM Initialize git if not already done
if not exist .git (
    git init
    echo Git initialized
) else (
    echo Git already initialized
)

REM Stage all files
echo.
echo Staging files...
git add .

REM Commit
echo.
echo Creating initial commit...
git commit -m "Initial commit: SASA - Smart Autonomous System Agent"

REM Rename branch to main
echo.
echo Renaming branch to main...
git branch -M main

echo.
echo ========================================
echo Please create a repository on GitHub:
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: %REPO_NAME%
echo 3. Description: SASA - Smart Autonomous System Agent. AI-powered task automation using Claude API
if "%IS_PUBLIC%"=="y" (
    echo 4. Visibility: Public
) else (
    echo 4. Visibility: Private
)
echo 5. Do NOT initialize with README, .gitignore, or license
echo 6. Click 'Create repository'
echo.
echo ========================================
echo.
pause

REM Add remote and push
set REPO_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo Adding remote origin...
git remote add origin %REPO_URL% 2>nul
if %errorlevel% neq 0 (
    git remote set-url origin %REPO_URL%
)

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Success! Code pushed to GitHub!
    echo.
    echo Your repository is live at:
    echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
    echo.
    echo Next steps:
    echo   1. Visit your repository on GitHub
    echo   2. Add topics/tags: ai, automation, claude, agent, cli
    echo   3. Update package.json with your info
    echo   4. Update README with your username
    echo   5. Star the repository
    echo   6. Share it with the community!
    echo ========================================
) else (
    echo.
    echo Error pushing to GitHub
    echo Please check your credentials and try again
)

echo.
echo Useful commands:
echo   sasa run "your task"     - Run a task
echo   sasa i                   - Interactive mode
echo   npm start examples       - View examples
echo.
echo Happy automating!
echo.
pause
