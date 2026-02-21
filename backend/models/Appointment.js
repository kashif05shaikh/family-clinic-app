import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: 1,
      max: 120,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    symptoms: {
      type: String,
      required: [true, 'Symptoms/Reason is required'],
      trim: true,
    },
    appointmentType: {
      type: String,
      required: true,
      enum: ['Normal', 'Emergency'],
      default: 'Normal',
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required'],
    },
    status: {
      type: String,
      enum: ['Waiting', 'In Progress', 'Completed'],
      default: 'Waiting',
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Set priority before save: Emergency = 1, Normal = 0
appointmentSchema.pre('save', function (next) {
  this.priority = this.appointmentType === 'Emergency' ? 1 : 0;
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
