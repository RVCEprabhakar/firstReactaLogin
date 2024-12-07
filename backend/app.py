from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for your frontend (React) running on http://localhost:3000
CORS(app, origins=["http://localhost:3000"])

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    usermail = data.get('usermail')
    userpassword = data.get('userpassword')
    
    # Your logic for handling the login (this is just a placeholder example)
    if username == "admin" and usermail == "admin@example.com" and userpassword == "password@123":
        print(username,usermail,userpassword)
        return jsonify({"message": "Login successful!"}), 200
        
    else:
        return jsonify({"message": "Invalid credentials!"}), 401

if __name__ == "__main__":
    app.run(debug=True)
