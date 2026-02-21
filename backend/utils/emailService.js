import nodemailer from 'nodemailer';

const CLINIC_EMAIL = 'drfalakkhaleelahmed@gmail.com';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendAppointmentEmail = async (appointment) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured. Skipping email.');
    return;
  }

  const isEmergency = appointment.appointmentType === 'Emergency';
  const subject = isEmergency
    ? `🚨 EMERGENCY Appointment - ${appointment.name}`
    : `New Appointment - ${appointment.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${isEmergency ? '#dc2626' : '#2563eb'};">
        ${isEmergency ? '🚨 EMERGENCY APPOINTMENT' : 'New Appointment Request'}
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Patient Name</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Age</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.age}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Gender</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.gender}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Type</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb; color: ${isEmergency ? '#dc2626' : 'inherit'}; font-weight: bold;">${appointment.appointmentType}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Preferred Date</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${new Date(appointment.preferredDate).toLocaleString()}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Symptoms / Reason</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.symptoms}</td></tr>
      </table>
      <p style="margin-top: 20px; color: #6b7280;">Falak Family Clinic - Appointment System</p>
    </div>
  `;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: CLINIC_EMAIL,
    subject,
    html,
  });
};
