const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db'); // Import the database connection
const User = require('./user'); // Import the User model

const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Request body:', req.body);

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Please provide all the required fields' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Check password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password should be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Create a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      console.log('Response data:', error.response.data);
      console.log('Status code:', error.response.status);
      console.log('Status text:', error.response.statusText);
    }
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Request body:', req.body);

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Please provide all the required fields' });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify the user's role
    if (user.role !== role) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Generate JWT token
    const token = jwt.sign({ email, role }, 'secretKey', { expiresIn: '1h' });
    console.log(token);

    // Login successful
    res.json({ success: true, user: { email: user.email, role: user.role }, token });
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.log('Response data:', error.response.data);
      console.log('Status code:', error.response.status);
      console.log('Status text:', error.response.statusText);
    }
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Generate and return JWT token
app.get('/api/getToken', (req, res) => {
  try {
    // Retrieve the user's email and role from the request headers or body, as per your implementation
    const { email, role } = req.headers;

    // Basic validation
    if (!email || !role) {
      return res.status(400).json({ error: 'Please provide email and role' });
    }

    // Generate JWT token
    const token = jwt.sign({ email, role }, 'secretKey', { expiresIn: '1h' });
    console.log('Token:', token);

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
