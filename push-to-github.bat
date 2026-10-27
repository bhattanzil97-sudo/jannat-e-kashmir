@echo off
set "GIT_CMD=C:\Users\LENOVO\AppData\Local\Programs\MinGit\cmd\git.exe"

echo =======================================================
echo  Pushing Bhat Tanzil Kashmir to GitHub
echo  Target: https://github.com/bhattanzil97-sudo/bhat-tanzil
echo =======================================================
echo.

"%GIT_CMD%" remote set-url origin https://github.com/bhattanzil97-sudo/bhat-tanzil.git
"%GIT_CMD%" branch -M main
"%GIT_CMD%" push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo  SUCCESS! Live on GitHub:
    echo  https://github.com/bhattanzil97-sudo/bhat-tanzil
    echo =======================================================
) else (
    echo.
    echo [Notice] If you haven't renamed your repo to 'bhat-tanzil' on GitHub yet,
    echo syncing to jannat-e-kashmir...
    "%GIT_CMD%" remote set-url origin https://github.com/bhattanzil97-sudo/jannat-e-kashmir.git
    "%GIT_CMD%" push -u origin main --force
)

pause
