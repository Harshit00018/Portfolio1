import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// POST route to handle contact form submissions
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    // Create a new message document using the Message model
    const newMessage = new Message({
      name,
      email,
      message,
    });

    // Save the new message to the database
    await newMessage.save();

    //  success response for frontend
    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    // Handle validation errors or other server errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
  }
});

export default router;
