@echo off
set "GIT_CMD=C:\Users\LENOVO\AppData\Local\Programs\MinGit\cmd\git.exe"

echo =======================================================
echo  Pushing Jannat Safar Kashmir to GitHub
echo  Repository: bhattanzil97-sudo/jannat-e-kashmir
echo =======================================================
echo.

"%GIT_CMD%" remote set-url origin https://github.com/bhattanzil97-sudo/jannat-e-kashmir.git
"%GIT_CMD%" branch -M main
"%GIT_CMD%" push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo  SUCCESS! Website is now live on GitHub:
    echo  https://github.com/bhattanzil97-sudo/jannat-e-kashmir
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo  Push failed. Please check the error above.
    echo =======================================================
)

pause
