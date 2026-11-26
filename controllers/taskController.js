const Task = require('../models/Task');

// READ: Get ONLY tasks belonging to the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE: Save a new task stamped with the logged-in user's ID
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      userId: req.user.userId,
      title: req.body.title
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE: Update a task ONLY if it belongs to the logged-in user
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { returnDocument: 'after' }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: Delete a task ONLY if it belongs to the logged-in user
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }
    res.json({ message: 'Task deleted', task: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};