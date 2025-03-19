from ..config.config import Config

# Shopify API Credentials
API_KEY = "sdaf"
API_SECRET = "Config.SHOPIFY_API_SECRET"
REDIRECT_URI = f"{Config.BACKEND_URL}/api/v1/shop/callback"
SCOPES = 'read_products,write_products,read_orders,write_orders,read_customers,write_selling_planss,write_customers,unauthenticated_read_product_listings,read_own_subscription_contracts,write_own_subscription_contracts,own_subscription_contracts'
API_VERSION = '2024-01'


ACCESS_TOKEN_EXPIRE_MINUTES=300  # In minutes
REFRESH_TOKEN_EXPIRE_DAYS = 7  # In days
