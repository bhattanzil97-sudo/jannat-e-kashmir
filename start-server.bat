@echo off
set "NODE_CMD=C:\Users\LENOVO\AppData\Local\Programs\NodeJS\node.exe"

echo ===============================================================
echo  Jannat Safar Kashmir - Enterprise Tour & Travels Server
echo ===============================================================
echo.
echo Starting backend server on http://localhost:5000/ ...
echo.

start "" "http://localhost:5000/"

"%NODE_CMD%" server/server.js

pause
