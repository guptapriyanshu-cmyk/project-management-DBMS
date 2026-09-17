from flask import Flask, jsonify, request, render_template_string
import os
from database import get_db

app = Flask(__name__)

# Basic HTML template for UI
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fast MongoDB App</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 2rem; max-width: 800px; margin: auto; background: #f9fafb; color: #111827; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-bottom: 1rem; }
        h1 { color: #2563eb; }
        button { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
        button:hover { background: #1d4ed8; }
        input { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; margin-right: 0.5rem; }
    </style>
</head>
<body>
    <h1>Fast MongoDB Connection</h1>
    <div class="card">
        <h2>Users</h2>
        <div id="usersList">Loading...</div>
    </div>
    <div class="card">
        <h2>Add User</h2>
        <input type="email" id="emailInput" placeholder="Enter email address">
        <input type="text" id="nameInput" placeholder="Enter name">
        <button onclick="addUser()">Add User</button>
    </div>

    <script>
        async function fetchUsers() {
            const res = await fetch('/api/users');
            const data = await res.json();
            const list = document.getElementById('usersList');
            list.innerHTML = data.map(u => `<p><b>${u.name}</b> (${u.email})</p>`).join('');
            if (data.length === 0) list.innerHTML = '<p>No users found.</p>';
        }

        async function addUser() {
            const email = document.getElementById('emailInput').value;
            const name = document.getElementById('nameInput').value;
            if (!email || !name) return alert('Fill in all fields');
            
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name })
            });
            document.getElementById('emailInput').value = '';
            document.getElementById('nameInput').value = '';
            fetchUsers();
        }

        fetchUsers();
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/users', methods=['GET'])
def get_users():
    db = get_db()
    # Fetching limited data (Applying Fix #4: Always use .limit() and projections)
    # We limit to 50 users and only select name and email fields, ignoring the heavy '_id' if not needed
    users = list(db.users.find({}, {"_id": 0, "name": 1, "email": 1}).limit(50))
    return jsonify(users)

@app.route('/api/users', methods=['POST'])
def create_user():
    db = get_db()
    data = request.json
    
    if not data or not data.get('email'):
        return jsonify({"error": "Email is required"}), 400
        
    try:
        # Insert into DB
        db.users.insert_one({"name": data.get('name'), "email": data.get('email')})
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

