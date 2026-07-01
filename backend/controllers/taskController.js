import Task from '../models/Task.js';

// GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    console.error('[getTasks] Failed to fetch tasks:', error.message);
    next(error);
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }
    console.error(`[getTaskById] Failed to fetch task ${req.params.id}:`, error.message);
    next(error);
  }
};

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({ title, description, status, priority, dueDate });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      console.error('[createTask] Validation error:', messages.join(', '));
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('[createTask] Failed to create task:', error.message);
    next(error);
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      console.error(`[updateTask] Validation error for ${req.params.id}:`, messages.join(', '));
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error(`[updateTask] Failed to update task ${req.params.id}:`, error.message);
    next(error);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }
    console.error(`[deleteTask] Failed to delete task ${req.params.id}:`, error.message);
    next(error);
  }
};
