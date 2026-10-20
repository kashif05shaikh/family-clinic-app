import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User, { userSchema } from '../models/User.js';

const router = express.Router();

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', userSchema, 'doctors');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'FalakClinic@2026SecureKey', {
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

    const cleanEmail = email.toLowerCase().trim();
    const emailFilter = { email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } };

    // Try finding in User (users collection), fallback to Doctor (doctors collection)
    let user = await User.findOne(emailFilter).select('+password');
    if (!user) {
      user = await Doctor.findOne(emailFilter).select('+password');
    }

    const defaultDoctorEmail = (
      process.env.DOCTOR_EMAIL || 'drfalakkhaleelahmed@gmail.com'
    )
      .toLowerCase()
      .trim();
    const defaultDoctorPassword = process.env.DOCTOR_PASSWORD || 'Doctor@123';

    // If account doesn't exist yet in the database, automatically provision it
    if (!user && cleanEmail === defaultDoctorEmail) {
      user = await User.create({
        email: cleanEmail,
        password: defaultDoctorPassword,
        role: 'doctor',
      });
      console.log('Doctor account provisioned on first login attempt:', cleanEmail);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    let isMatch = await user.comparePassword(password);

    // If password mismatch, check if it matches the default doctor password and reset it
    if (!isMatch && cleanEmail === defaultDoctorEmail && password === defaultDoctorPassword) {
      user.password = defaultDoctorPassword;
      await user.save();
      isMatch = true;
      console.log('Doctor password reset to default on valid attempt');
    }

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
