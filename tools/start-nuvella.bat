@echo off
REM ============================================================
REM  Nuvella — one-click start
REM  Double-click this file to run the site locally and get a
REM  public link you can send to anyone.
REM ============================================================
title Nuvella - Local Server

cd /d "%~dp0.."

echo.
echo  ============================================
echo   NUVELLA - starting the site
echo  ============================================
echo.

REM --- Check Node is installed -------------------------------------------
where node >nul 2>nul
if errorlevel 1 (
  echo  [ERROR] Node.js was not found.
  echo          Install it from https://nodejs.org then run this again.
  echo.
  pause
  exit /b 1
)

REM --- Install dependencies on first run ---------------------------------
if not exist "node_modules" (
  echo  First run - installing dependencies ^(about 40 seconds^)...
  echo.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo  [ERROR] npm install failed. Check your internet connection.
    pause
    exit /b 1
  )
  echo.
)

REM --- Start the dev server in its own window ----------------------------
echo  Starting the local server...
start "Nuvella server" cmd /k "cd /d "%~dp0.." && npx vite --port 5173 --strictPort --host"

REM --- Wait for it to come up --------------------------------------------
timeout /t 8 /nobreak >nul

echo  Local site:  http://localhost:5173
echo.
echo  Starting the public tunnel ^(takes about 20 seconds^)...
echo.

REM --- Start the tunnel in its own window --------------------------------
start "Nuvella tunnel" cmd /k ""%~dp0cloudflared.exe" tunnel --url http://localhost:5173 --no-autoupdate"

echo  ============================================
echo   Two windows are now open:
echo     "Nuvella server"  - keeps the site running
echo     "Nuvella tunnel"  - shows your public link
echo.
echo   Look in the TUNNEL window for the line:
echo     https://something-random.trycloudflare.com
echo   Copy that link and send it to anyone.
echo.
echo   Close both windows to stop everything.
echo  ============================================
echo.
echo  This window can be closed now.
pause
