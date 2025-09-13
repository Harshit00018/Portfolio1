// Load environment variables from the .env file
import dotenv from 'dotenv';
dotenv.config();

// Import necessary packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Create the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Enable CORS for all origins to allow your frontend (on Netlify) to access this backend
app.use(cors()); 
// Parse incoming JSON payloads from requests
app.use(express.json()); 

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple test route
app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running!');
});

// Import and use your contact form routes
// The path 'contactRoutes' refers to the file we will create next
import contactRoutes from './routes/contactRoutes.js';
app.use('/api', contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
