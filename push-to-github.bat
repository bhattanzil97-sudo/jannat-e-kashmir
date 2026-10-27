@echo off
set "GIT_CMD=C:\Users\LENOVO\AppData\Local\Programs\MinGit\cmd\git.exe"

echo =======================================================
echo  Pushing Jannat Safar Kashmir to GitHub
echo =======================================================
echo.

"%GIT_CMD%" branch -M main
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo  Successfully pushed to GitHub!
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo  Push failed. Make sure:
    echo  1. The repository exists on https://github.com/new
    echo  2. You enter your GitHub username and Personal Access Token (PAT)
    echo =======================================================
)

pause
