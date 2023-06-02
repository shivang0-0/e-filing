import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Initialize with 'client'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Make an API call to the server to register the user
      const response = await axios.post('http://localhost:3001/api/register', {
        email,
        password,
        role,
      });

      // User registration successful
      console.log('User registered:', response.data);
      setSuccessMessage('Registration successful');

      // Get the JWT token from the response
      const token = response.data.token;

      // Store the JWT token in local storage for future use
      localStorage.setItem('token', token);
    } catch (error) {
      // Error occurred during registration
      console.error('Registration error:', error);
      setError('Failed to register user');
    }

    // Clear form inputs
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Sign Up</h2>
      {error && <p style={errorStyle}>{error}</p>}
      {successMessage && <p style={successStyle}>{successMessage}</p>}
      <div style={inputContainerStyle}>
        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Role:</label>
        <div>
          <label>
            <input
              type="radio"
              value="client"
              checked={role === 'client'}
              onChange={() => setRole('client')}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
        </div>
      </div>
      <button type="submit" style={buttonStyle}>Sign Up</button>
    </form>
  );
}

// Styles (copied from the LoginForm component)
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '300px',
  margin: '100px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const inputContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
};

const labelStyle: React.CSSProperties = {
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
  color: 'red',
  marginBottom: '10px',
};

const successStyle: React.CSSProperties = {
  color: 'green',
  marginBottom: '10px',
};

export default SignUpForm;
