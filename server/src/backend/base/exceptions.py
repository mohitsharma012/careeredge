from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import traceback

async def global_exception_handler(request: Request, exc: Exception):
    """Handles all unexpected errors and returns a proper response."""

    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"success": False, "message": exc.detail},
        )

    print("Unhandled Error:", traceback.format_exc())

    return JSONResponse(
        status_code=400,
        content={"success": False, "message": "Something went wrong"},
    )