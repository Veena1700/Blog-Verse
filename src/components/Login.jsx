import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "../styles/general.css"

const Login = ({ setUser, setShowModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
        alert('Both username and password are required');
        return;
      }

    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve users array

    // Check if user exists and credentials are correct
    const loggedInUser = users.find(user => user.username === username && user.password === password);
    
    if (loggedInUser) {
      const token = 'fake-jwt-token'; // Simulate JWT token
      localStorage.setItem('token', token); // Store token in localStorage
      setUser(loggedInUser); // Set user state after successful login
      setShowModal(false); // Close modal after logging in
    } else {
      alert('Invalid credentials'); // Show error if login fails
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="register-login-buttons btn btn-primary w-100 mt-4">
        Login
      </Button>
    </form>
  );
};

export default Login;
