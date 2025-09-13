import mongoose from 'mongoose';

// Define the schema for a single message
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // Add simple email validation using a regex
    match: [/.+@.+\..+/, 'Please enter a valid email address.'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // This automatically adds createdAt and updatedAt fields
});

// Create the model from the schema
const Message = mongoose.model('Message', messageSchema);

export default Message;
