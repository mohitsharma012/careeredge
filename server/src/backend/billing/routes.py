import os
import shopify
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from datetime import timedelta, date
from sqlalchemy.orm import Session

from ..config.db import get_db
from ..config.config import Config
from .models import SubscriptionPlan, Feature
from .schemas import SuscriptionPlanCreateModel, SubscriptionPlanFeatureCreateModel, SubscriptionPlanResponseModel, SubscriptionPlanUpdateModel


plan_router = APIRouter()  


@plan_router.get("/", status_code=status.HTTP_200_OK, response_model=list[SubscriptionPlanResponseModel])
async def get_plans_with_features(db: Session = Depends(get_db)):
    try:
        plans = db.query(SubscriptionPlan).all()
        return plans
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

@plan_router.get("/{plan_id}", status_code=status.HTTP_200_OK, response_model=SubscriptionPlanResponseModel)
async def get_plan_with_features(plan_id: int, db: Session = Depends(get_db)):
    try:
        plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == plan_id).first()
        if not plan:
            return JSONResponse(content={"error": "Plan not found"}, status_code=status.HTTP_404_NOT_FOUND)
        return plan
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)
    
@plan_router.post("/", status_code=status.HTTP_201_CREATED, response_model=SuscriptionPlanCreateModel)
async def create_plan(requested_data: SuscriptionPlanCreateModel, db: Session = Depends(get_db)):
    try:
        db_plan = SubscriptionPlan(**requested_data.model_dump())
        db.add(db_plan)
        db.commit()
        db.refresh(db_plan)
        return db_plan
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

@plan_router.put("/{plan_id}", status_code=status.HTTP_200_OK, response_model=SubscriptionPlanResponseModel)
async def update_plan(plan_id: int, requested_data: SubscriptionPlanUpdateModel, db: Session = Depends(get_db)):
    try:
        db_plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == plan_id).first()
        if not db_plan:
            return JSONResponse(content={"error": "Plan not found"}, status_code=status.HTTP_404_NOT_FOUND)
        
        update_data = requested_data.model_dump()
        for key, value in update_data.items():
            if value is not None:
                setattr(db_plan, key, value)
        db.commit()
        db.refresh(db_plan)
        return db_plan
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

@plan_router.delete("/{plan_id}", status_code=status.HTTP_200_OK)
async def delete_plan(plan_id: int, db: Session = Depends(get_db)):
    try:
        db_plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == plan_id).first()
        if not db_plan:
            return JSONResponse(content={"error": "Plan not found"}, status_code=status.HTTP_404_NOT_FOUND)
        db.delete(db_plan)
        db.commit()
        return JSONResponse(content={"message": "Plan deleted successfully"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

@plan_router.post("/features/", status_code=status.HTTP_200_OK, response_model=SubscriptionPlanFeatureCreateModel)
async def features(requested_data: SubscriptionPlanFeatureCreateModel, db: Session = Depends(get_db)):
    try:
        db_feature = Feature(**requested_data.model_dump())
        db.add(db_feature)
        db.commit()
        db.refresh(db_feature)
        return db_feature
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)
    
@plan_router.get("/features/", status_code=status.HTTP_200_OK)
async def get_features(db: Session = Depends(get_db)):
    features = db.query(Feature).all()
    return features

@plan_router.delete("/features/{feature_id}", status_code=status.HTTP_200_OK)
async def delete_feature(feature_id: int, db: Session = Depends(get_db)):
    try:
        db_feature = db.query(Feature).filter(Feature.id == feature_id).first()
        if not db_feature:
            return JSONResponse(content={"error": "Feature not found"}, status_code=status.HTTP_404_NOT_FOUND)
        db.delete(db_feature)
        db.commit()
        return JSONResponse(content={"message": "Feature deleted successfully"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

@plan_router.post("/{plan_id}/feature/{feature_id}", status_code=status.HTTP_200_OK)
async def add_feature_to_plan(plan_id: int, feature_id: int, db: Session = Depends(get_db)):
    try:
        plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == plan_id).first()
        feature = db.query(Feature).filter(Feature.id == feature_id).first()
        plan.features.append(feature)
        db.commit()
        return JSONResponse(content={"message": "Feature added to plan successfully"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)
    
@plan_router.delete("/{plan_id}/feature/{feature_id}", status_code=status.HTTP_200_OK)
async def remove_feature_from_plan(plan_id: int, feature_id: int, db: Session = Depends(get_db)):
    try:
        plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == plan_id).first()
        feature = db.query(Feature).filter(Feature.id == feature_id).first()
        plan.features.remove(feature)
        db.commit()
        return JSONResponse(content={"message": "Feature removed from plan successfully"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)



