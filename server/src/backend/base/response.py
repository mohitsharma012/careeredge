from fastapi import HTTPException
from fastapi.responses import JSONResponse
from typing import Optional, Union


class BaseResponse(JSONResponse):
    """Base class for returnable JSON responses."""
    def __init__(self, status_code: int, data: Optional[dict] = None, headers: Optional[dict] = None):
        content = data or {"success": True}
        super().__init__(status_code=status_code, content=content, headers=headers)


class BaseException(HTTPException):
    """Base class for exceptions that can be raised."""
    def __init__(self, status_code: int, message: str):
        super().__init__(status_code=status_code, detail={"success": False, "message": message})


class Ok(BaseResponse):
    """200 OK - Successful request with response body."""
    def __init__(self, message: Optional[str] = None, data: Optional[dict] = None):
        response_data = {"success": True, "message": message}
        
        if data is not None:  # Only add "data" if it's not None
            response_data["data"] = data
        
        super().__init__(status_code=200, data=response_data)


class Created(BaseResponse):
    """201 Created - Successful resource creation."""
    def __init__(self, data=None):        
        super().__init__(status_code=201, data={"success": True, "data": data})


class Accepted(BaseResponse):
    """202 Accepted - Request accepted for processing."""
    def __init__(self, message="Accepted"):
        super().__init__(status_code=202, data={"success": True, "message": message})


class NoContent(BaseResponse):
    """204 No Content - Request successful but no response body."""
    def __init__(self):
        super().__init__(status_code=204, data="", headers={"Content-Length": "0"})


class BadRequest(BaseException):
    """400 Bad Request - Invalid request format or parameters."""
    def __init__(self, message="Bad request"):
        super().__init__(status_code=400, message=message)


class Unauthorized(BaseException):
    """401 Unauthorized - Invalid or missing authentication."""
    def __init__(self, message="Unauthorized"):
        super().__init__(status_code=401, message=message)


class Forbidden(BaseException):
    """403 Forbidden - User lacks necessary permissions."""
    def __init__(self, message="Forbidden"):
        super().__init__(status_code=403, message=message)


class NotFound(BaseException):
    """404 Not Found - Resource not found."""
    def __init__(self, message="Resource not found"):
        super().__init__(status_code=404, message=message)


class Conflict(BaseException):
    """409 Conflict - Conflict with current resource state."""
    def __init__(self, message="Conflict"):
        super().__init__(status_code=409, message=message)


class TooManyRequests(BaseException):
    """429 Too Many Requests - Rate limiting applied."""
    def __init__(self, message="Too many requests"):
        super().__init__(status_code=429, message=message)


class InternalServerError(BaseException):
    """500 Internal Server Error - Unexpected server issue."""
    def __init__(self, message="Internal server error"):
        super().__init__(status_code=500, message=message)