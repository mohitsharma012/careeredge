from fastapi.responses import JSONResponse

class Ok(JSONResponse):
    """200 OK - Successful request with response body."""
    def __init__(self, content=None):
        super().__init__(status_code=200, content={"success": True, "data": content})


class Created(JSONResponse):
    """201 Created - Successful resource creation."""
    def __init__(self, content=None):
        super().__init__(status_code=201, content={"success": True, "data": content})


class Accepted(JSONResponse):
    """202 Accepted - Request accepted for processing (async)."""
    def __init__(self, content=None):
        super().__init__(status_code=202, content={"success": True, "message": content})


class NoContent(JSONResponse):
    """204 No Content - Request successful but no response body."""
    def __init__(self):
        super().__init__(status_code=204, content=None)


class BadRequest(JSONResponse):
    """400 Bad Request - Invalid request parameters."""
    def __init__(self, message="Bad request"):
        super().__init__(status_code=400, content={"success": False, "message": message})


class Unauthorized(JSONResponse):
    """401 Unauthorized - Invalid or missing authentication."""
    def __init__(self, message="Unauthorized"):
        super().__init__(status_code=401, content={"success": False, "message": message})


class Forbidden(JSONResponse):
    """403 Forbidden - User lacks necessary permissions."""
    def __init__(self, message="Forbidden"):
        super().__init__(status_code=403, content={"success": False, "message": message})


class NotFound(JSONResponse):
    """404 Not Found - Resource not found."""
    def __init__(self, message="Resource not found"):
        super().__init__(status_code=404, content={"success": False, "message": message})


class Conflict(JSONResponse):
    """409 Conflict - Conflict with current resource state."""
    def __init__(self, message="Conflict"):
        super().__init__(status_code=409, content={"success": False, "message": message})


class TooManyRequests(JSONResponse):
    """429 Too Many Requests - Rate limiting applied."""
    def __init__(self, message="Too many requests"):
        super().__init__(status_code=429, content={"success": False, "message": message})


class InternalServerError(JSONResponse):
    """500 Internal Server Error - Unexpected server issue."""
    def __init__(self, message="Internal server error"):
        super().__init__(status_code=500, content={"success": False, "message": message})
