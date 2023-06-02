import React, { useState, ChangeEvent, FormEvent } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import app from './firebaseConfig'; // Import your firebaseConfig
import axios from 'axios';

// Initialize Firebase
firebase.initializeApp(app);

function WelcomePage(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async (file: File, token: string): Promise<void> => {
    const storageRef = firebase.storage().ref();

    try {
      // Generate a unique filename using a timestamp or any other desired method
      const filename = `${Date.now()}_${file.name}`;

      // Set the request headers with the JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Upload the file to Firebase Storage
      const fileRef = storageRef.child(filename);
      await fileRef.put(file, { customMetadata: { jwtAuthorization: token }, headers });

      // File upload successful
      console.log('File uploaded:', filename);
      setSuccessMessage('File uploaded successfully');
    } catch (error) {
      // Error occurred during file upload
      console.error('File upload error:', error);
      setError('Failed to upload file');
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      // Retrieve the JWT token from the server
      const response = await axios.get('http://localhost:3001/api/getToken');
      const token = response.data.token;

      if (token) {
        handleFileUpload(file, token);
      } else {
        setError('Failed to retrieve JWT token');
      }
    } catch (error) {
      console.error('Token retrieval error:', error);
      setError('Failed to retrieve JWT token');
    }

    // Clear file input
    setFile(null);
  };

  return (
    <div>
      <h2>Welcome to the App</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default WelcomePage;
