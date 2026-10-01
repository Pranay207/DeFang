#!/usr/bin/env bash
# ==============================================================================
# DeFang (Bharat Edition) - AWS Finch Container Build & Run Script
# ==============================================================================

set -euo pipefail

echo "========================================================"
echo "  DeFang - AWS Finch Container Runner (BUILD IT Track)   "
echo "========================================================"

IMAGE_NAME="defang:bharat-v1"
CONTAINER_NAME="defang-container"

# Check if AWS Finch is installed
if ! command -v finch &> /dev/null; then
    echo "⚠️  AWS Finch CLI not found on PATH."
    echo "👉 Install Finch via AWS: https://runfinch.com/ or brew install finch / winget install finch"
    echo "💡 Falling back to standard container engine (docker/nerdctl)..."
    DOCKER_BIN=$(command -v docker || command -v nerdctl || echo "")
    if [ -z "$DOCKER_BIN" ]; then
        echo "❌ Neither Finch nor Docker found. Please install Finch from runfinch.com."
        exit 1
    fi
    ENGINE="$DOCKER_BIN"
else
    ENGINE="finch"
fi

echo "🚀 Using container engine: $ENGINE"

# Stop existing container if running
if $ENGINE ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🔄 Stopping existing container..."
    $ENGINE rm -f "$CONTAINER_NAME"
fi

# Build image using Containerfile
echo "📦 Building OCI container image using Finch..."
$ENGINE build -t "$IMAGE_NAME" -f Containerfile .

# Run container exposing port 8000
echo "🏃 Running DeFang container on http://localhost:8000 ..."
$ENGINE run -d \
    --name "$CONTAINER_NAME" \
    -p 8000:8000 \
    -e ENVIRONMENT=production \
    "$IMAGE_NAME"

echo ""
echo "✅ DeFang is live and running!"
echo "🌐 Web Application & Cedar API: http://localhost:8000"
echo "🩺 Health Check: http://localhost:8000/api/health"
echo "📋 Logs: $ENGINE logs -f $CONTAINER_NAME"
