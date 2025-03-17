from typing import TypeVar, List, Dict, Any, Optional
from fastapi import Query
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

class PaginationAndSortingOptions(BaseModel):
    limit: int = Query(10, ge=1)
    offset: int = Query(0, ge=0)
    sort_by: Optional[str] = Query(None, description="Field to sort by")
    sort_order: str = Query("asc", regex="^(asc|desc)$", description="Sort order (asc or desc)")


def queryset_pagination(
   queryset: List[T], options: PaginationAndSortingOptions
) -> Dict[str, Any]:
    """Returns a structured paginated response, ensuring data is JSON serializable."""
    limit = options.limit
    offset = options.offset
    total_count = len(queryset)
    data = queryset[offset : offset + limit]
    return {
        "total_count": total_count,
        "data": [item.model_dump() if isinstance(item, BaseModel) else item for item in data],
        "limit": limit,
        "offset": offset
    }


def filter_queryset(data: List[T], filters: BaseModel) -> List[T]:
    """Filters data based on provided query parameters."""
    filters = filters.dict(exclude_none=True)
    for key, value in filters.items():
        if value is not None:
            data = [item for item in data if getattr(item, key, None) == value]
    return data


def sort_queryset(data: List[T], options: PaginationAndSortingOptions) -> List[T]:
    """Sorts data based on a given field in ascending or descending order."""
    sort_order = options.sort_order if options.sort_order in ["asc", "desc"] else "asc"
    if options.sort_by and hasattr(data[0], options.sort_by):  # Ensure the field exists
        reverse = sort_order.lower() == "desc"
        return sorted(data, key=lambda item: getattr(item, options.sort_by, None), reverse=reverse)
    return data


