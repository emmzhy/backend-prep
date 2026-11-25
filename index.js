const express = require('express');
const app = express();

app.use(express.json());

// Temporary in-memory data (resets when server restarts)
let tasks = [
  { id: 1, title: 'Learn Node.js basics', completed: true },
  { id: 2, title: 'Build a CRUD API', completed: false }
];

// 1. READ: Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// 2. CREATE: Add a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. UPDATE: Edit an existing task by ID
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;
  res.json(task);
});

// 4. DELETE: Remove a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deleted = tasks.splice(index, 1);
  res.json({ message: 'Task deleted', task: deleted[0] });
});

app.listen(3000, () => {
  console.log('CRUD server running at http://localhost:3000/');
});