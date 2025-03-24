from pydantic import BaseModel
from typing import Optional, List
from fastapi import HTTPException
from pydantic import root_validator
from ..base.validators import is_valid_email



class UserRegisterSerializer(BaseModel):
    name: str 
    email: str
    password: str
    referral_code: Optional[str] = None

    @root_validator(pre=True)
    def validations(cls, values):
        if not is_valid_email(values.get("email")):
            raise HTTPException(status_code=400, detail="Invalid email")
        return values
    

    
    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "John Doe",
                "email": "test@gmail.com",
                "password": "password"
            }
        }
    }
                 

class UserLoginSerializer(BaseModel):
    email: str
    password: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "test@gmail.com",
                "password": "password"
            }
        }
    }

    @root_validator(pre=True)
    def validations(cls, values):
        if not is_valid_email(values.get("email")):
            raise HTTPException(status_code=400, detail="Invalid email")
        return values
    
class UserAccountVerifySerializer(BaseModel):
    email: str
    code: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "test@gmail.com",
                "code": "xcvbnmdsf"
            }
        }
    }

class UserEmailSerializer(BaseModel):
    email: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "test@gamil.com"
            }
        }
    }
    
class UserRestPasswordSerializer(BaseModel):
    email: str
    code: str
    password: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "test@gmail.com",
                "code": "xcvbnmdsf",
                "password": "password"
            }
        }
    }



class ProductVariantSerializer(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    product_id: Optional[int] = None
    price: Optional[str] = None

class ImageSerializer(BaseModel):
    id: Optional[int] = None
    src: Optional[str] = None

class CollectionSerializer(BaseModel):
    id: Optional[int] = None

class ProductSerializer(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    body_html: Optional[str] = None
    vendor: Optional[str] = None
    product_type: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    collections : Optional[List[CollectionSerializer]] = None
    variants: Optional[List[ProductVariantSerializer]] = None
    status: Optional[str] = None
    image: Optional[ImageSerializer] = None
    
    class Config:
        from_attributes = True

class ProductResponseSerializer(BaseModel):
    products_list: Optional[List[ProductSerializer]] = None
    total_products: Optional[int] = None
    hm: Optional[bool] = None
