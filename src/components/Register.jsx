import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "../styles/general.css"

const Register = ({ setUser, setShowModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
        alert('Both username and password are required');
        return;
      }
    
    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve users array or initialize
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      alert('User already registered. Please log in.');
      return;
    }

    const newUser = { username, password };
    users.push(newUser); // Add new user to the array
    localStorage.setItem('users', JSON.stringify(users)); // Store updated users array

    // Automatically log the user in after registration
    setUser(newUser);
    setShowModal(false);
  };

  return (
    <form onSubmit={handleRegister}>
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
        Register
      </Button>
    </form>
  );
};

export default Register;
