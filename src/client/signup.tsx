import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig'; // Adjust the import path accordingly
import { collection, doc, setDoc } from 'firebase/firestore';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Initialize with 'client'
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Sign up the user using Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Store additional user information in Firestore
      const user = userCredential.user;
      await setDoc(doc(collection(firestore, 'users'), user.uid), {
        email: user.email,
        role: role,
      });

      // User registration successful
      console.log('User registered:', user);
    } catch (error) {
      // Error occurred during registration
      console.error('Registration error:', error);
      setError('Failed to register user');
    }

    // Clear form inputs and error message
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Sign Up</h2>
      {error && <p style={errorStyle}>{error}</p>}
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

// Styles
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

export default SignUpForm;