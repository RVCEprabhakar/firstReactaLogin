import React, { useState } from "react";
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [message, setMessage] = useState("");  // State to hold the response message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!/^[A-Za-z]+$/.test(username)) {
      alert("Username must contain only letters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usermail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation: at least 8 characters and at least 1 special character
    if (userpassword.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(userpassword)) {
      alert("Password must be at least 8 characters long and contain at least one special character.");
      return;
    }
    console.log(username,usermail,userpassword);
    // Sending data to the Flask backend
    try {
      const response = await fetch("http://127.0.0.1:5000/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, usermail, userpassword }),
      });
      
      const result = await response.json();

      // Check the response status and display appropriate message
      if (response.ok) {
        setMessage(result.message); // Display success message
      } else {
        setMessage(result.message); // Display error message
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login Page</h1>

        {/* Username Field */}
        <div className="input">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="input">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={usermail}
            onChange={(e) => setUsermail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Login</button>
      </form>

      {/* Display response message */}
      <div className="response-message">
        {message && <p>{message}</p>} {/* Display the message */}
      </div>
    </div>
  );
};

export default Login;
