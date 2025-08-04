// ✅ Dummy user data (in-memory)
const users = [
  {
    fullName: 'Harshad Chaudhary',
    email: 'harshad@gmail.com',
    password: '123456',
    role: 'User'
  },
  {
    fullName: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'Admin'
  }
];

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// ✅ Serve login.html on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password && u.role.toLowerCase() === role.toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email, password, or role' });
  }

  res.json({ message: 'Login successful', role: user.role });
});

// ✅ Register route (in-memory)
app.post('/register', (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  users.push({ fullName, email, password, role });
  console.log('✅ New user registered:', email);
  res.status(201).json({ message: 'Registration successful' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
