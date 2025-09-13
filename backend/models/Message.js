import mongoose from 'mongoose';


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
    
    match: [/.+@.+\..+/, 'Please enter a valid email address.'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, 
});


const Message = mongoose.model('Message', messageSchema);

export default Message;
