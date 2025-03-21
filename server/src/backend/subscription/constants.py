PAY_AS_YOU_GO = "PAY_AS_YOU_GO"
PREPAID = "PREPAID"
ADVANCED_PREPAID = "ADVANCED_PREPAID"
PAY_AS_YOU_GO_PREPAID = "PAY_AS_YOU_GO_PREPAID"

DAY = "DAY"
WEEK = "WEEK"
MONTH = "MONTH"
YEAR = "YEAR"

ON_PURCHASE_DAY = "ON_PURCHASE_DAY"
SPECIFIC_DAY = "SPECIFIC_DAY"

PERCENTAGE = "PERCENTAGE"
FIXED = "FIXED"
ON_SALE = "ON_SALE"
ON_FULLFILLMENT = "ON_FULLFILLMENT"

ACTIVE = "ACTIVE"
INACTIVE = "INACTIVE"
ARCHIVED = "ARCHIVED"
DRAFT = "DRAFT"

FREQUENCY_TYPE_CHOICES = ON_PURCHASE_DAY, SPECIFIC_DAY
DISCOUNT_TYPE_CHOICES = PERCENTAGE,FIXED
INVENTORY_POLICY_RESERVE_CHOICES = ON_SALE, ON_FULLFILLMENT
FREQUENCY_INTERVAL_CHOICES = DAY, WEEK, MONTH, YEAR
PLAN_TYPE_CHOICES = PAY_AS_YOU_GO, PREPAID, ADVANCED_PREPAID, PAY_AS_YOU_GO_PREPAID
PLAN_STATUS_CHOICES = ACTIVE, INACTIVE, ARCHIVED, DRAFT
