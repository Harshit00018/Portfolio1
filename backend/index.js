
// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json()); 

// // Connect to MongoDB
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.error('MongoDB connection error:', err));


// app.get('/', (req, res) => {
//     res.send('Portfolio Backend API is running!');
// });


// import contactRoutes from './routes/contactRoutes.js';
// app.use('/api', contactRoutes);


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// cors used globally 
app.use(cors());

app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Message model (schema)
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// Root route
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running!");
});

// Contact POST route (save message)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Provide name, email, and message." });
    }

    const newMsg = new Message({ name, email, message });
    await newMsg.save();

    res.status(200).json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error("Error on /api/contact:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Admin GET route to fetch all messages
// You might later protect this route (auth etc.), but for now simple read-only.
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // newest first
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error("Error on /api/messages:", err);
    res.status(500).json({ success: false, message: "Failed to fetch messages." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
