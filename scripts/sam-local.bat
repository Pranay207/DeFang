@echo off
REM ==============================================================================
REM DeFang - AWS SAM CLI Local API Runner (Serverless Track)
REM ==============================================================================

echo ========================================================
echo   DeFang - AWS SAM CLI Local Serverless Runner           
echo ========================================================

where sam >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] AWS SAM CLI not detected on system PATH.
    echo [*] To install SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
    echo [*] Or use Finch container runtime directly: scripts\finch-build.bat
    echo [*] Falling back to direct FastAPI development server...
    cd backend
    ..\.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
    exit /b 0
)

echo [*] Building SAM Serverless application...
sam build

echo [*] Launching AWS SAM Local API on port 8000...
sam local start-api --port 8000 --host 127.0.0.1
