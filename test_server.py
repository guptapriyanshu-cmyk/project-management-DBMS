from api.index import app
import json

with app.test_client() as client:
    res = client.get('/api/products')
    print("GET status:", res.status_code)
    print("GET data:", res.data)
