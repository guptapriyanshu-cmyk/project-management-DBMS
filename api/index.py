from flask import Flask, jsonify, request
import os
from api.database import get_db
from bson import ObjectId

app = Flask(__name__)

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

@app.route('/api/customers', methods=['GET'])
def get_customers():
    db = get_db()
    customers = list(db.customers.find({}))
    return jsonify([serialize_doc(c) for c in customers])

@app.route('/api/customers', methods=['POST'])
def add_customer():
    db = get_db()
    data = request.json
    result = db.customers.insert_one(data)
    data['_id'] = str(result.inserted_id)
    return jsonify(data), 201

@app.route('/api/customers/<id>', methods=['DELETE'])
def delete_customer(id):
    db = get_db()
    db.customers.delete_one({'_id': ObjectId(id)})
    return jsonify({"success": True})

@app.route('/api/products', methods=['GET'])
def get_products():
    db = get_db()
    products = list(db.products.find({}))
    return jsonify([serialize_doc(p) for p in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    db = get_db()
    data = request.json
    result = db.products.insert_one(data)
    data['_id'] = str(result.inserted_id)
    return jsonify(data), 201

@app.route('/api/products/<id>', methods=['DELETE'])
def delete_product(id):
    db = get_db()
    db.products.delete_one({'_id': ObjectId(id)})
    return jsonify({"success": True})

@app.route('/api/sales', methods=['GET'])
def get_sales():
    db = get_db()
    sales = list(db.sales.find({}))
    return jsonify([serialize_doc(s) for s in sales])

@app.route('/api/sales', methods=['POST'])
def add_sale():
    db = get_db()
    data = request.json
    result = db.sales.insert_one(data)
    data['_id'] = str(result.inserted_id)
    return jsonify(data), 201

@app.route('/api/sales/<id>', methods=['DELETE'])
def delete_sale(id):
    db = get_db()
    db.sales.delete_one({'_id': ObjectId(id)})
    return jsonify({"success": True})

@app.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    db = get_db()
    suppliers = list(db.suppliers.find({}))
    return jsonify([serialize_doc(s) for s in suppliers])

@app.route('/api/suppliers', methods=['POST'])
def add_supplier():
    db = get_db()
    data = request.json
    result = db.suppliers.insert_one(data)
    data['_id'] = str(result.inserted_id)
    return jsonify(data), 201

@app.route('/api/suppliers/<id>', methods=['DELETE'])
def delete_supplier(id):
    db = get_db()
    db.suppliers.delete_one({'_id': ObjectId(id)})
    return jsonify({"success": True})

# Keep the old users route just in case
@app.route('/api/users', methods=['GET'])
def get_users():
    db = get_db()
    users = list(db.users.find({}, {"_id": 0, "name": 1, "email": 1}).limit(50))
    return jsonify(users)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
