from fastapi import HTTPException, status
from .models import SubscriptionPlanProduct, SubscriptionPlanProductVariant


def add_products_and_variants_to_plan(plan_id, products_dict, db):
    """Add products and their variants to a subscription plan."""
    try:
        for product in products_dict:
            db_product = db.query(SubscriptionPlanProduct).filter(
                SubscriptionPlanProduct.subscription_plan_id == plan_id,
                SubscriptionPlanProduct.product_id == product.product_id
            ).first()

            if not db_product:
                db_product = SubscriptionPlanProduct(subscription_plan_id=plan_id, product_id=product.product_id)
                db.add(db_product)
                db.flush()
            
            if product.variants:
                db_variants = db.query(SubscriptionPlanProductVariant).filter(
                    SubscriptionPlanProductVariant.subscription_plan_product_id == db_product.id,
                    SubscriptionPlanProductVariant.variant_id.in_(product.variants)
                ).all()
                existing_variant_ids = {variant.variant_id for variant in db_variants}
                new_variants = [
                    SubscriptionPlanProductVariant(subscription_plan_product_id=db_product.id, variant_id=variant)
                    for variant in product.variants if variant not in existing_variant_ids
                ]
                db.add_all(new_variants)
                db.flush()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

def delete_products_and_variants_from_plan(plan_id, delete_products, db):
    """Delete products and their variants from a subscription plan."""
    try:       
        if delete_products.product_ids:
                # Delete all the variants of the products
                db.query(SubscriptionPlanProductVariant).filter(
                    SubscriptionPlanProductVariant.subscription_plan_product_id.in_(
                        db.query(SubscriptionPlanProduct.id).filter(
                            SubscriptionPlanProduct.subscription_plan_id == plan_id,
                            SubscriptionPlanProduct.product_id.in_(delete_products.product_ids)
                        )
                    )
                ).delete(synchronize_session=False)
                # Delete the products
                db.query(SubscriptionPlanProduct).filter(
                    SubscriptionPlanProduct.subscription_plan_id == plan_id,
                    SubscriptionPlanProduct.product_id.in_(delete_products.product_ids)
                ).delete()
            
        if delete_products.variants_ids:  
            db.query(SubscriptionPlanProductVariant).filter(
                SubscriptionPlanProductVariant.subscription_plan_product_id.in_(
                    db.query(SubscriptionPlanProduct.id).filter(
                        SubscriptionPlanProduct.subscription_plan_id == plan_id
                    )
                ),
                SubscriptionPlanProductVariant.variant_id.in_(delete_products.variants_ids)
            ).delete()

            # Check if the product has no variants left, then delete the product
            db.query(SubscriptionPlanProduct).filter(
                SubscriptionPlanProduct.subscription_plan_id == plan_id,
                SubscriptionPlanProduct.id.notin_(
                    db.query(SubscriptionPlanProductVariant.subscription_plan_product_id).distinct()
                )
            ).delete()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))