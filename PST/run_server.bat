@echo off
echo Checking for Node.js...

:: Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed! Please install it from https://nodejs.org/
    pause
    exit /b
)

echo Installing dependencies...
npm install express cors body-parser
if errorlevel 1 (
    echo Failed to install dependencies. Please check your npm setup.
    pause
    exit /b
)

echo Starting the server...
:: Start node server in a new command window; empty title ("") ensures proper parsing
start "" cmd /k "node server.js"

echo Waiting for server to start...
timeout /t 3 >nul

set "URL=http://127.0.0.1:3000/index.html"
echo Attempting to open the form URL in the default browser...
start "" "%URL%"
if errorlevel 1 (
    echo The start command failed. Trying PowerShell...
    powershell -NoProfile -Command "Start-Process '%URL%'"
)

echo.
echo If nothing opened, please manually navigate to:
echo %URL%
pause
