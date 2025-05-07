import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Simple body validation
const validate = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  next();
};

// Register
router.post('/register', validate, async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (await User.findOne({ username })) return res.status(400).json({ message: 'Username exists' });
    const hashed = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashed, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', validate, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', user: user, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Current user
router.get('/current', validate, async (req, res) => {
  console.log('req:', req);
  try {
    const token = req.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Not authorized' });
  }
});

export default router;
