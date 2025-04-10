@echo off
cd "C:\Users\KIIT\Desktop\learnab"

set BRANCH_NAME=testing-Deepseek

:: Check if branch exists locally
git rev-parse --verify %BRANCH_NAME% >NUL 2>&1
if %errorlevel% neq 0 (
    git checkout -b %BRANCH_NAME%
) else (
    git checkout %BRANCH_NAME%
)

git add .
git commit -m "Automated sync commit"

:: Check if branch exists on remote
git ls-remote --exit-code origin %BRANCH_NAME% >NUL 2>&1
if %errorlevel% neq 0 (
    echo Branch %BRANCH_NAME% does not exist on remote. Creating it...
    git push --set-upstream origin %BRANCH_NAME%
) else (
    git pull origin %BRANCH_NAME% --no-rebase --commit --no-edit
    if %errorlevel% neq 0 (
        echo Merge conflict detected. Resolve conflicts and rerun the script.
        pause
        exit /b
    )
)

git push origin %BRANCH_NAME%
pause
