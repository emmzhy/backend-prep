require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Task Schema & Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// READ: Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// CREATE: Add a new task
app.post('/api/tasks', async (req, res) => {
  const newTask = await Task.create({ title: req.body.title });
  res.status(201).json(newTask);
});

// UPDATE: Update a task in MongoDB using its _id
app.put('/api/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
  );
  if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
  res.json(updatedTask);
});

// DELETE: Remove a task by _id
app.delete('/api/tasks/:id', async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task deleted', task: deleted });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});