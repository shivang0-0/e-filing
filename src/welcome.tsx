import { useState, ChangeEvent, FormEvent } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from './firebaseConfig';
import axios from 'axios';


function WelcomePage(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async (file: File, token: string): Promise<void> => {
    const storage = getStorage(app);

    try {
      // Generate a unique filename using a timestamp or any other desired method
      const filename = `${Date.now()}_${file.name}`;

      // Upload the file to Firebase Storage
      const storageRef = ref(storage);
      const fileRef = ref(storageRef, filename);
      await uploadBytes(fileRef, file, { customMetadata: { jwtAuthorization: token }, contentType: file.type, cacheControl: 'public, max-age=31536000', contentDisposition: `attachment; filename="${file.name}"`, contentEncoding: 'gzip', contentLanguage: 'en' });

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
      <h2>Welcome to Client Section</h2>
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
