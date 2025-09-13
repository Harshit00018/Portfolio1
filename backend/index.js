
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

app.use(express.json()); 

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running!');
});


import contactRoutes from './routes/contactRoutes.js';
app.use('/api', contactRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
