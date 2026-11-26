require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // NEW: import authRoutes

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // NEW: connect /api/auth URLs

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});