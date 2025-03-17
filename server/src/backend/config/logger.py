import sys
import time
import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

# Log file path
LOG_FILE = Path("/opt/logs/billingsubs.log")

# Configure logger
logger = logging.getLogger("billing_subs")
logger.setLevel(logging.INFO)

# Log format
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

# Rotating file handler
try:
    file_handler = RotatingFileHandler(LOG_FILE, maxBytes=10*1024*1024, backupCount=5)  # 10 MB per file, keep 5 backups
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
except Exception as e:
    logger.error(f"Failed to create log file handler: {e}")

# Console handler (set to WARNING in production to reduce noise)
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.INFO)  # Change to WARNING in production
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

class StreamToLogger:
    def __init__(self, logger, log_level=logging.INFO):
        self.logger = logger
        self.log_level = log_level

    def write(self, message):
        if message.strip():
            self.logger.log(self.log_level, message.strip())

    def flush(self):
        pass  # Needed for compatibility with sys.stdout/sys.stderr

    def isatty(self):
        return False  # This ensures compatibility with Uvicorn


# Redirect stdout and stderr
sys.stdout = StreamToLogger(logger, logging.INFO)
sys.stderr = StreamToLogger(logger, logging.ERROR)


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware to log requests and responses"""

    async def dispatch(self, request: Request, call_next):
        start_time = time.time()

        headers = dict(request.headers)
        body = await request.body()
        body_text = body.decode()[:500] if body else "No Body"  # Limit body size for logging


        response = await call_next(request)
        process_time = time.time() - start_time

        # Read response body properly
        response_body = b""
        async for chunk in response.body_iterator:
            response_body += chunk

        # Define an async generator for the response body
        async def response_body_generator():
            yield response_body

        # Create a new response with the modified body
        new_response = Response(
            content=response_body,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.media_type,
        )

        line_break = "=" * 100

        bold = "\033[1m"
        reset = "\033[0m"

        response_body = response_body.decode()[:500] if response_body else "No Body"

        logger.info(
            f"\n {line_break} \n {bold} Request: {reset} {request.method} {request.url} \n {bold} Headers: {reset} {headers} \n {bold} Body: {reset} {body_text} \n {bold} Response Body: {reset} {response_body}"
        )        

        return new_response
