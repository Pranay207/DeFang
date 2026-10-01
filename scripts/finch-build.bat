@echo off
REM ==============================================================================
REM DeFang (Bharat Edition) - AWS Finch Container Build & Run Script (Windows)
REM ==============================================================================

echo ========================================================
echo   DeFang - AWS Finch Container Runner (BUILD IT Track)   
echo ========================================================

set IMAGE_NAME=defang:bharat-v1
set CONTAINER_NAME=defang-container

where finch >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] AWS Finch CLI not found on PATH.
    echo [*] Checking for Docker CLI fallback...
    where docker >nul 2>nul
    if %errorlevel% neq 0 (
        echo [X] Neither Finch nor Docker found on PATH.
        echo [*] Install Finch: https://runfinch.com/ or winget install finch
        exit /b 1
    ) else (
        set ENGINE=docker
    )
) else (
    set ENGINE=finch
)

echo [*] Using engine: %ENGINE%
echo [*] Cleaning previous container if exists...
%ENGINE% rm -f %CONTAINER_NAME% >nul 2>nul

echo [*] Building container image with Finch...
%ENGINE% build -t %IMAGE_NAME% -f Containerfile .
if %errorlevel% neq 0 (
    echo [X] Container build failed.
    exit /b %errorlevel%
)

echo [*] Running container on port 8000...
%ENGINE% run -d --name %CONTAINER_NAME% -p 8000:8000 -e ENVIRONMENT=production %IMAGE_NAME%

echo.
echo [V] DeFang is successfully running!
echo [>] Web UI + Cedar Engine: http://localhost:8000
echo [>] API Health: http://localhost:8000/api/health
echo [>] Precedents API: http://localhost:8000/api/precedents
echo.
