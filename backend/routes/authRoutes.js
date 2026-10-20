import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User, { userSchema } from '../models/User.js';

const router = express.Router();

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', userSchema, 'doctors');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password',
      });
    }

    // Try finding in User (users collection), fallback to Doctor (doctors collection)
    let user = await User.findOne({ email }).select('+password');
    if (!user) {
      user = await Doctor.findOne({ email }).select('+password');
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role || 'doctor',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
