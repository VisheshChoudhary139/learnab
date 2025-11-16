@echo off
cd "C:\Users\KIIT\Desktop\learnab"

:: Set branch name to 'dev'
set BRANCH_NAME=dev

:: Checkout branch (create if doesn't exist)
git checkout -b %BRANCH_NAME% 2>NUL || git checkout %BRANCH_NAME%

git add .
git commit -m "Automated sync commit"

:: Check if branch exists on remote
git ls-remote --exit-code origin %BRANCH_NAME%
if %errorlevel% neq 0 (
    echo "Branch %BRANCH_NAME% does not exist on remote. Creating it..."
    git push --set-upstream origin %BRANCH_NAME%
) else (
    git pull origin %BRANCH_NAME% --no-edit
    if %errorlevel% neq 0 (
        echo "Merge conflict detected. Resolve conflicts and rerun the script."
        pause
        exit /b
    )
)

git push origin %BRANCH_NAME%
pause
