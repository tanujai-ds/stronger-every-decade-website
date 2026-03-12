// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,  // huntersports@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Nodemailer configuration error:', error);
  } else {
    console.log('✅ Nodemailer is ready to send emails');
  }
});

// ── CONTACT FORM ENDPOINT ──
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, reason, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Auto-reply email to user
    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Thank You for Contacting Stronger Every Decade',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f172e 0%, #1a2a47 100%); padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Stronger Every Decade</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">Train for Function. Live with Discipline.</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 32px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin-bottom: 20px;">
              Hello <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 16px;">
              Thank you for reaching out to Stronger Every Decade.
            </p>
            
            <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 16px;">
              Your message has been received, and I'll review it shortly. 
            </p>
            
            <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 16px;">
              You can expect a response within the next 24 hours.
            </p>
            
            <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 16px;">
              If your message relates to coaching or training programmes, 
              I'll make sure to provide the most helpful information based 
              on your goals.
            </p>
            
            <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin-bottom: 24px;">
              In the meantime, you can explore more insights on strength, 
              mobility, and longevity on the website.
            </p>
            
            <div style="background: #f0f4f8; padding: 20px; border-left: 4px solid #2E5090; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #1f2937; line-height: 1.8; margin: 0;">
                <strong>Train for function.</strong><br>
                <strong>Live with discipline.</strong><br>
                <strong>Let aesthetics take care of themselves.</strong>
              </p>
            </div>
            
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6; margin-bottom: 8px;">
              Best regards,
            </p>
            
            <p style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0;">
              Shantanu
            </p>
            
            <p style="font-size: 14px; color: #9ca3af; margin: 0;">
              Stronger Every Decade
            </p>
          </div>
          
          <div style="background: #f8f9fb; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              © 2024 Stronger Every Decade. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! You will receive a confirmation email shortly.',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message,
    });
  }
});

// ── HEALTH CHECK ENDPOINT ──
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 HANDLER ──
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// ── ERROR HANDLER ──
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;