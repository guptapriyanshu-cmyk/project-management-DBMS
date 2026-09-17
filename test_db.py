from api.database import get_db
import certifi
import os

db = get_db()
print("Products:", list(db.products.find({})))
print("Customers:", list(db.customers.find({})))
