"""
DeFang - AWS Lambda Serverless Handler (AWS SAM CLI & LocalStack Compatible)
Provides serverless entry point for FastAPI via Mangum ASGI adapter.
"""

from mangum import Mangum
from main import app

# Serverless entry point for AWS SAM CLI and AWS Lambda
handler = Mangum(app, lifespan="off")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
