const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/user');  // Import model User

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sbdbkpsdm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CRUD Routes
app.get('/api/users', async (req, res) => {
  const users = await User.find({ deleted_at: null });
  res.send(users);
});

app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

app.post('/api/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  res.send(user);
});

app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(user);
});

app.delete('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    deleted_at: Date.now(),
  });
  res.send(user);
});

// Endpoint login
app.post('/api/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  console.log('Received login request:', emailOrUsername, password);
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log('Login successful:', user);
        return res.status(200).json({ message: 'Login successful', user });
      } else {
        console.log('Invalid credentials');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log('Server error', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
