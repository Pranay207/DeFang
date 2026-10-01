#!/usr/bin/env bash
# ==============================================================================
# DeFang - AWS SAM CLI Local API Runner (Serverless Track)
# ==============================================================================

set -euo pipefail

echo "========================================================"
echo "  DeFang - AWS SAM CLI Local Serverless Runner           "
echo "========================================================"

if ! command -v sam &> /dev/null; then
    echo "⚠️  AWS SAM CLI not detected on system PATH."
    echo "👉 Install SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    echo "💡 Falling back to direct FastAPI development server..."
    cd backend
    python3 -m uvicorn main:app --reload --port 8000
    exit 0
fi

echo "📦 Building SAM application..."
sam build

echo "🏃 Starting AWS SAM Local API on http://127.0.0.1:8000 ..."
sam local start-api --port 8000 --host 127.0.0.1
