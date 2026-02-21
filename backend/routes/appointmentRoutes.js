import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect } from '../middleware/auth.js';
import { sendAppointmentEmail } from '../utils/emailService.js';

const router = express.Router();

// POST /api/appointments - Create new appointment (public)
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send email notification to doctor
    try {
      await sendAppointmentEmail(appointment);
    } catch (emailError) {
      console.error('Email send failed:', emailError);
    }

    const io = req.app.get('io');
    if (io) io.emit('appointment:new', appointment);

    res.status(201).json(appointment);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join('. ') });
    }
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/appointments - Get all appointments (protected, sorted by priority then createdAt)
router.get('/', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ priority: -1, createdAt: 1 })
      .lean();
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/appointments/:id/status - Update appointment status (protected)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Waiting', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const io = req.app.get('io');
    if (io) io.emit('appointment:updated', appointment);

    res.json(appointment);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
