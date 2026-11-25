const Task = require('../models/Task');

// READ: Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE: Add a new task
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({ title: req.body.title });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE: Edit a task by _id
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: Remove a task by _id
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted', task: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};