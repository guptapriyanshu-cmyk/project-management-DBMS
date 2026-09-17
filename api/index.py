from flask import Flask, jsonify, request
import os
from database import get_db
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

# Keep the old users route just in case
@app.route('/api/users', methods=['GET'])
def get_users():
    db = get_db()
    users = list(db.users.find({}, {"_id": 0, "name": 1, "email": 1}).limit(50))
    return jsonify(users)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
