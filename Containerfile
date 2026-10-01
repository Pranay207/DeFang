# ==============================================================================
# DeFang (Bharat Edition) - Multi-Stage OCI Containerfile
# Designed for AWS Finch Container Engine & Docker / Podman
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Modern React 19 + TypeScript Frontend
# ------------------------------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Python 3.11 + Rust Cedar Engine + OpenSearch Backend
# ------------------------------------------------------------------------------
FROM python:3.11-slim AS runtime

LABEL maintainer="DeFang Security Team <team@defang.in>"
LABEL description="DeFang (Bharat Edition) - Deterministic Legal Clause Auditor powered by AWS Cedar & OpenSearch"

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000 \
    HOST=0.0.0.0

# Install runtime dependencies and curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install backend Python dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy backend source code and cedar policies
COPY backend/ ./backend/

# Copy built frontend static assets into backend static folder
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

WORKDIR /app/backend

# Expose default API and Web port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Launch production Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
