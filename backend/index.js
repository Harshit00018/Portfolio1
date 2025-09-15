
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
// backend/api/index.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(cors());

app.use(express.json());

// ✅ DB connection (connect once)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
}

// ✅ Schema & Model
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: "All fields are required" });

    await Message.create({ name, email, message });
    res.json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Export as serverless function
export default app;
