import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const seedDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = process.env.DOCTOR_EMAIL || 'drfalakkhaleelahmed@gmail.com';
    const password = process.env.DOCTOR_PASSWORD || 'Doctor@123';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Doctor user already exists.');
      process.exit(0);
      return;
    }

    await User.create({ email, password, role: 'doctor' });
    console.log('Doctor user created. Login with:', email);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDoctor();
